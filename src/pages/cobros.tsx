import React, { FormEvent } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonItemGroup, IonButton, IonIcon, IonText, IonRow, IonCol, IonGrid, IonToast } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { iPago, iProfesor } from '../interfaces';
import BD from '../BD';

const usuarioActual: iProfesor = { /* solo para probar */
    _id: "1234",
    nombre: "Usuario Actual",
    dni: "1234",
    email: "usuario@dale.com",
    pass: "dale"
}

const pagoPorDefecto: iPago = {
    _id: "0",
    fecha: "2020-10-01",
    dniProfesor: "0",
    monto: 0,
    dniJugador: "0"
}

interface iState {
    ocultarBotonComprobante: boolean,
    toastParams: {
        mostrar: boolean,
        mensaje: string
    }
    pagoActual: iPago
}

class Cobros extends React.Component {

    state: iState;

    constructor(props: Readonly<{}>) {

        super(props);
        this.state = {
            ocultarBotonComprobante: true,
            toastParams: {
                mostrar: false,
                mensaje: ""
            },
            pagoActual: pagoPorDefecto
        };
    }

    registrarPago = async (event: FormEvent) => {

        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);
        const dni = String(data.get("dni"));
        const monto = parseFloat(String(data.get("monto")));

        try {
            await BD.getJugadoresDB().get(dni); /* busca dni en DB */

            let fechaActual = new Date().toISOString().split('T')[0];

            const pago: iPago = {
                _id: dni + "/" + fechaActual + "/" + usuarioActual.dni,
                fecha: fechaActual,
                dniProfesor: usuarioActual.dni,
                monto: monto,
                dniJugador: dni
            };

            await BD.getPagosDB().put(pago);

            (document.getElementById("dni") as HTMLInputElement).value = "";      /* limpia campos */
            (document.getElementById("monto") as HTMLInputElement).value = "";

            this.setState({ ocultarBotonComprobante: false, pagoActual: pago });
        }
        catch (error) {
            if (error.status === 404)
                this.setState({ toastParams: { mostrar: true, mensaje: "DNI no registrado." } });
            else
                this.setState({ toastParams: { mostrar: true, mensaje: "Error al intentar registrar el pago." } });
        }
    }

    generarComprobante = () => {
        console.log(this.state.pagoActual);
        this.setState({ ocultarBotonComprobante: true });
    }

    render() {

        return (
            <IonPage>
                <IonContent class="Cobro">
                    <IonToast
                        isOpen={this.state.toastParams.mostrar}
                        onDidDismiss={() => this.setState({ toastParams: { mostrar: false } })}
                        message={this.state.toastParams.mensaje}
                        color="danger"
                        showCloseButton={true}
                        closeButtonText="CERRAR"
                    />
                    <form onSubmit={this.registrarPago}>
                        <IonItem>
                            <IonLabel>Cobros</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonInput id="dni" name="dni" placeholder="DNI Jugador/a" inputMode="text" type="text"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput id="monto" name="monto" placeholder="Monto" inputMode="decimal" step="0.01" type="number" ></IonInput>
                        </IonItem>
                        <IonGrid>
                            <IonRow align-content-center>
                                <IonCol>
                                    <IonButton type="submit" fill="outline" color="success">Registrar Pago</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>
                    <IonGrid hidden={this.state.ocultarBotonComprobante}>
                        <IonRow align-content-center>
                            <IonCol>
                                <IonButton fill="outline" onClick={this.generarComprobante}>Generar Comprobante</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItemGroup>
                        <IonItem>
                            <IonLabel>Balance</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonText>
                                <h4>$1500,0</h4>
                            </IonText>
                            <IonButton fill="outline" slot="end" size="default" color="success">
                                <IonIcon icon={checkmarkCircle} />
                            </IonButton>
                        </IonItem>
                        <IonGrid>
                            <IonRow align-content-center>
                                <IonCol>
                                    <IonButton fill="outline" href="/historial">
                                        Historial de Cobros
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItemGroup>
                </IonContent>
            </IonPage>
        );
    }
};

export default Cobros;

/*

 - ver como generar comprobante
 - validacion de datos
 - cargar/cancelar balance

 */
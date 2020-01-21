import React, { FormEvent } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonItemGroup, IonButton, IonIcon, IonText, IonRow, IonCol, IonGrid, IonToast } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import { iPago, iProfesor, iBalance } from '../interfaces';
import BD from '../BD';

const usuarioActual: iProfesor = { /* solo para probar */
    _id: "5678",
    nombre: "Usuario Actual",
    dni: "5678",
    email: "usuario@dale.com",
    pass: "dale"
}

const pagoPorDefecto: iPago = {
    _id: "0",
    fecha: "",
    dniProfesor: "0",
    monto: 0,
    dniJugador: "0"
}

const balancePorDefecto: iBalance = {
    _id: "0",
    fechaCancelacion: "",
    total: -1 
}

interface iState {
    ocultarBotonComprobante: boolean,
    toastParams: {
        mostrar: boolean,
        mensaje: string,
        esError: boolean,
    },
    pagoActual: iPago,
    balance: iBalance
}

class Cobros extends React.Component {

    state: iState;

    constructor(props: Readonly<{}>) {

        super(props);
        this.state = {
            ocultarBotonComprobante: true,
            toastParams: {
                mostrar: false,
                mensaje: "",
                esError: false
            },
            pagoActual: pagoPorDefecto,
            balance: balancePorDefecto,
        };
    }

    componentDidMount = () => {

        BD.getBalancesDB().get(usuarioActual.dni)
            .then((doc) => { this.setState({ balance: doc }) })
            .catch(() => {
                this.setState({
                    toastParams: {
                        mostrar: true,
                        mensaje: "No se pudo cargar el balance actual.",
                        esError: true
                    }
                })
            })
    }

    registrarPago = async (event: FormEvent) => {

        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);
        const dni = String(data.get("dni"));
        const monto = parseFloat(String(data.get("monto")));

        if (dni.length !== 0)
            try {
                await BD.getJugadoresDB().get(dni); /* busca dni en DB */

                const fechaActual = new Date(); 
                fechaActual.setHours(fechaActual.getHours() - 3)
                const fechaString = fechaActual.toISOString();

                const pago: iPago = {
                    _id: dni + "/" + fechaString.split('T')[0] + "/" + usuarioActual.dni,
                    fecha: fechaString,
                    dniProfesor: usuarioActual.dni,
                    monto: monto,
                    dniJugador: dni
                };
                await BD.getPagosDB().put(pago);

                const balance: iBalance = {         /* actualizacion del balance */
                    "_id": this.state.balance._id,
                    fechaCancelacion: "",
                    total: this.state.balance.total + monto
                }
                await BD.getBalancesDB().upsert(balance._id, () => balance);

                (document.getElementById("dni") as HTMLInputElement).value = "";      /* limpia campos */
                (document.getElementById("monto") as HTMLInputElement).value = "";

                this.setState({
                    ocultarBotonComprobante: false,
                    pagoActual: pago,
                    balance: balance,
                    toastParams: {
                        mostrar: true,
                        mensaje: "Pago registrado exitosamente.",
                        esError: false
                    }
                });
            }
            catch (error) {
                if (error.status === 404)
                    this.setState({ toastParams: { mostrar: true, mensaje: "DNI no registrado.", esError: true } });
                else
                    this.setState({
                        toastParams: {
                            mostrar: true,
                            mensaje: "Error al intentar registrar el pago.",
                            esError: true
                        }
                    });
            }
        else
            this.setState({ toastParams: { mostrar: true, mensaje: "DNI no registrado.", esError: true } });
    }

    generarComprobante = () => {
        console.log(this.state.pagoActual);
        this.setState({ ocultarBotonComprobante: true });
    }

    cancelarBalance = () => {

        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 3)
 
        const balance: iBalance = {         
            "_id": this.state.balance._id,
            fechaCancelacion: fechaActual.toISOString(),
            total: 0
        }

        BD.getBalancesDB().upsert(balance._id, () => balance)
            .then(() => {
                this.setState({
                    toastParams: {
                        mostrar: true,
                        mensaje: "Balance cancelado.",
                        esError: false
                    },
                    balance: balance
                })
            })
            .catch(() => {
                this.setState({
                    toastParams: {
                        mostrar: true,
                        mensaje: "No se pudo cancelar el balance actual.",
                        esError: true
                    }
                })
            })
    }

    render() {

        return (
            <IonPage>
                <IonContent hidden={this.state.balance._id === balancePorDefecto._id} class="Cobro">
                    <IonToast
                        isOpen={this.state.toastParams.mostrar}
                        onDidDismiss={() => this.setState({ toastParams: { mostrar: false, esError: false } })}
                        message={this.state.toastParams.mensaje}
                        color={(this.state.toastParams.esError)? "danger" : "success"}
                        showCloseButton={this.state.toastParams.esError}
                        duration={(this.state.toastParams.esError) ? 0 : 1000}
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
                            <IonInput id="monto" name="monto" placeholder="Monto" inputMode="decimal" step="0.01" type="number" min="0.01" ></IonInput>
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
                                <h4>{'$' + this.state.balance.total.toLocaleString('es-AR')}</h4>
                            </IonText>
                            <IonButton fill="outline" slot="end" size="default" color="success" onClick={this.cancelarBalance}>
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

 */
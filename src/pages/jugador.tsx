import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonRow, IonGrid, IonCol, IonInput, IonDatetime, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { call } from 'ionicons/icons';
import '../theme/jugador.css';
import { iJugador, DEPORTES, NOMBRE_CAT_FUTBOL, NOMBRE_DEPORTES, regNombre } from '../interfaces';
import BD from '../BD';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const PREFIJO_MOVIL: string = '+549';
const TIPO_MOVIL: string = 'movil';
const TIPO_FIJO: string = 'fijo';

type tipoProps = RouteComponentProps<{ dni: string }>;

interface iState {

    jugador: iJugador,
    jugadorTemp: iJugador,
    isReadOnly: boolean,
    showAlert: boolean,
    tipoTelefono: string,
    toastParams: {
        mostrar: boolean,
        esError: boolean,
        volverCuandoCancela: boolean,
        mensaje: string
    }
};

const jugadorPorDefecto: iJugador = {              /* valores por defecto para inicializar vista */
    '_id': '0',
    nombre: ' ',
    dni: '0',
    categoria: 0,
    deportes: [],
    telResponsable: '0',
    fechaNacimiento: '2013-09-19T17:00:00.000',
    planillaMedica: ' '
};

class Jugador extends React.Component<tipoProps> {

    state: iState;

    constructor(props: tipoProps) {

        super(props);
        this.state = {

            jugador: jugadorPorDefecto,
            jugadorTemp: jugadorPorDefecto,
            isReadOnly: true,
            showAlert: false,
            tipoTelefono: TIPO_MOVIL,
            toastParams: {
                mostrar: false,
                esError: false,
                volverCuandoCancela: false,
                mensaje: ""
            }
        }
    }

    componentDidMount = () => {

        BD.getJugadoresDB().get(this.props.match.params.dni)
            .then((doc) => {
                const docToJugador = (doc: any): iJugador => doc;
                const tipoTelefono = (docToJugador(doc).telResponsable.indexOf(PREFIJO_MOVIL) > -1) ? TIPO_MOVIL : TIPO_FIJO;
                this.setState({ jugador: doc, jugadorTemp: doc, tipoTelefono: tipoTelefono })
            })
            .catch(() => {
                this.setState({
                    toastParams: {
                        mostrar: true,
                        esError: true,
                        volverCuandoCancela: true,
                        mensaje: "No se pudo cargar el perfil del jugador."
                    }
                })
            });
    }

    renderDeportes = (): string => {

        let respuesta = '';
        const deportes = this.state.jugador.deportes;

        for (let i = 0; i < (deportes.length - 1); i++)
            respuesta = respuesta + NOMBRE_DEPORTES[deportes[i]] + ', ';

        respuesta += NOMBRE_DEPORTES[deportes[deportes.length - 1]]; /* ultimo deporte no lleva coma al final */

        return respuesta;
    }

    renderCategoria = () => {

        let respuesta = null;

        if (this.state.jugador.deportes.includes(DEPORTES.futbol))
            respuesta = (
                <IonItem>
                    <IonLabel>Categoría Fútbol</IonLabel>
                    <h4>{NOMBRE_CAT_FUTBOL[this.state.jugador.categoria]}</h4>
                </IonItem>
            );

        return respuesta;
    }

    guardarNuevoNombre = (event: any) => {

        this.setState((prevState: iState) => ({
            jugadorTemp: {
                ...prevState.jugadorTemp,
                nombre: event.target.value
            }
        }));
    }

    guardarNuevoTelefono = (telefono: string) => {

        this.setState((prevState: iState) => ({
            jugadorTemp: {
                ...prevState.jugadorTemp,
                telResponsable: telefono
            }
        }));
    }

    guardarFechaNacimiento = (event: any) => {

        this.setState((prevState: iState) => ({
            jugadorTemp: {
                ...prevState.jugadorTemp,
                fechaNacimiento: event.target.value.split('T')[0]
            }
        }));
    }

    guardarDeportes = (event: any) => {

        const categoria = event.target.value.includes(DEPORTES.futbol) ? 2 : 0;

        this.setState((prevState: iState) => ({
            jugadorTemp: {
                ...prevState.jugadorTemp,
                deportes: event.target.value,
                categoria: categoria
            }
        }));
    }

    eliminarJugador = () => {

        BD.getJugadoresDB().get(this.state.jugador.dni)
            .then((doc) => BD.getJugadoresDB().remove(doc))
            .then(() => {
                this.setState({ toastParams: { mostrar: true, mensaje: "Perfil eliminado." } });
                this.props.history.push('/listado');
            })
            .catch(() => { this.setState({ toastParams: { mostrar: true, esError: true, mensaje: "No se pudo eliminar el perfil del jugador." } }) });
    }

    actualizarJugador = () => {

        const jugador: iJugador = { ...this.state.jugadorTemp };

        if (!jugador.telResponsable)
            this.setState({ toastParams: { mostrar: true, esError: true, mensaje: "El teléfono debe tener al menos un carácter." } });
        else if (jugador.deportes.length < 1)
            this.setState({ toastParams: { mostrar: true, esError: true, mensaje: "Debe seleccionar al menos un deporte." } })
        else if (!regNombre.test(jugador.nombre))
            this.setState({ toastParams: { mostrar: true, esError: true, mensaje: "El nombre debe tener al menos un carácter, sólo se permiten letras, y espacios (no contiguos)." } })
        else {  /* Si es movil, debe ir 9 luego de +54 */
            if ((this.state.tipoTelefono.localeCompare(TIPO_MOVIL) === 0) && (jugador.telResponsable.indexOf(PREFIJO_MOVIL) === -1)) {
                    const telefono = Array.from(jugador.telResponsable);
                    telefono.splice(3, 0, '9');
                    jugador.telResponsable = telefono.join('');
                };
                BD.getJugadoresDB().upsert(jugador._id, () => jugador)
                    .then(() => {
                        this.setState({
                            jugador: jugador,
                            jugadorTemp: jugador,
                            isReadOnly: true,
                            toastParams: {
                                mostrar: true,
                                mensaje: "Perfil actualizado."
                            }
                        });
                    })
                    .catch(() => { this.setState({ toastParams: { mostrar: true, esError: false, mensaje: "No se pudo actualizar el perfil del jugador." } }) });
             }   
    }

    renderSelectDeportes = () => {

        const deportes = [
            { nombre: NOMBRE_DEPORTES[DEPORTES.basket], valor: DEPORTES.basket },
            { nombre: NOMBRE_DEPORTES[DEPORTES.futbol], valor: DEPORTES.futbol },
        ];

        return (
            deportes.map((opcion) => (
                <IonSelectOption value={opcion.valor} key={opcion.valor}>{opcion.nombre}</IonSelectOption>
            )));
    }

    render() {
        return (
            <IonPage>
                <IonContent hidden={this.state.jugador.dni === jugadorPorDefecto.dni} className="vistaJugador">
                    <IonToast
                        isOpen={this.state.toastParams.mostrar}
                        onDidDismiss={() => this.setState({ toastParams: { mostrar: false, esError: false, volverCuandoCancela: false } })}
                        message={this.state.toastParams.mensaje}
                        color={(this.state.toastParams.esError) ? "danger" : "success"}
                        duration={(this.state.toastParams.esError) ? 0 : 1000}
                        buttons={(this.state.toastParams.esError) ?
                            [{ text: 'CERRAR', handler: () => { if (this.state.toastParams.volverCuandoCancela) this.props.history.push("/listado") } }]
                            :
                            []
                        }
                    />
                    <IonItem>
                        <IonLabel>Nombre</IonLabel>
                        <IonInput
                            type="text" value={(this.state.isReadOnly) ? this.state.jugador.nombre : this.state.jugadorTemp.nombre}
                            readonly={this.state.isReadOnly}
                            clearInput={true}
                            minlength={1}
                            inputMode="text"
                            onIonInput={this.guardarNuevoNombre}
                            id="inputNombre"
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>DNI</IonLabel>
                        <h4>{this.state.jugador.dni}</h4>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Fecha de Nacimiento</IonLabel>
                        <IonDatetime
                            displayFormat="DD/MM/YYYY"
                            pickerFormat="DD/MMM/YYYY"
                            monthShortNames={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}
                            max={new Date().toISOString().split('T')[0]}
                            value={(this.state.isReadOnly) ? this.state.jugador.fechaNacimiento : this.state.jugadorTemp.fechaNacimiento}
                            readonly={this.state.isReadOnly}
                            cancelText="Cancelar"
                            doneText="OK"
                            onIonChange={this.guardarFechaNacimiento}
                        />
                    </IonItem>
                    {
                        (this.state.isReadOnly) ?
                            <IonItem>
                                <IonLabel>{(this.state.jugador.deportes.length === 1) ? 'Deporte' : 'Deportes'}</IonLabel>
                                <h4>{this.renderDeportes()}</h4>
                            </IonItem>
                            :
                            <IonItem>
                                <IonLabel>Deportes</IonLabel>
                                <IonSelect multiple={true} cancelText="Cancelar" onIonChange={this.guardarDeportes}>
                                    {this.renderSelectDeportes()}
                                </IonSelect>
                            </IonItem>
                    }
                    {this.renderCategoria()}
                    <IonItem>
                        <IonLabel>Teléfono del Responsable</IonLabel>
                        <IonButton
                            hidden={!this.state.isReadOnly}
                            size="default"
                            color="success"
                            fill="outline"
                            href={`tel:${this.state.jugador.telResponsable}`}
                        >
                            <IonIcon icon={call} />
                        </IonButton>
                        <IonSelect
                            hidden={this.state.isReadOnly}
                            interface='popover'
                            cancelText="Cancelar"
                            placeholder='Tipo'
                            value={this.state.tipoTelefono}
                            onIonChange={(event: any) => { this.setState({tipoTelefono: event.target.value }) }}
                        >
                            <IonSelectOption value={TIPO_FIJO} key={TIPO_FIJO} >Fijo</IonSelectOption>
                            <IonSelectOption value={TIPO_MOVIL} key={TIPO_MOVIL}>Móvil</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        {
                            (this.state.isReadOnly) ?
                                <h4>{this.state.jugador.telResponsable}</h4>
                            :
                                <PhoneInput
                                    defaultCountry="AR"
                                    countries={["AR"]}
                                    placeholder="ej. 223 5555555"
                                    value={this.state.jugadorTemp.telResponsable}
                                    onChange={this.guardarNuevoTelefono}
                                />
                        }
                    </IonItem>
                    <IonGrid hidden={this.state.jugador._id.localeCompare(jugadorPorDefecto._id) === 0}>
                        <IonRow hidden={!this.state.isReadOnly}>
                            <IonCol size='6'>
                                <IonButton href={`/planillaMedica/${this.state.jugador.dni}`} className="botonJugador" fill="outline">Planilla Médica</IonButton>
                            </IonCol>
                            <IonCol size='6'>
                                <IonButton
                                    className="botonJugador"
                                    fill="outline"
                                    href={`/pagosJugador/${this.state.jugador.dni}`}
                                >Pagos</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='6'>
                                {
                                    (this.state.isReadOnly) ?
                                        <IonButton
                                            className="botonJugador"
                                            fill="outline"
                                            onClick={() => this.setState({ isReadOnly: false })}
                                        >Editar</IonButton>
                                        :
                                        <IonButton
                                            className="botonJugador"
                                            fill="outline"
                                            onClick={this.actualizarJugador}
                                        >Guardar</IonButton>
                                }
                            </IonCol>
                            <IonCol hidden={this.state.isReadOnly} size='6'>
                                <IonButton
                                    className="botonJugador"
                                    fill="outline"
                                    onClick={() => {
                                        this.setState({
                                            jugadorTemp: this.state.jugador,
                                            tipoTelefono: (this.state.jugador.telResponsable.indexOf(PREFIJO_MOVIL) > -1)? TIPO_MOVIL: TIPO_FIJO,
                                            isReadOnly: true
                                        })
                                    }}
                                >Cancelar</IonButton>
                            </IonCol>
                            <IonCol hidden={!this.state.isReadOnly} size='6'>
                                <IonButton className="botonJugador" fill="outline" color="danger" onClick={() => { this.setState({ showAlert: true }) }}>
                                    Eliminar
                                </IonButton>
                                <IonAlert
                                    isOpen={this.state.showAlert}
                                    onDidDismiss={() => { this.setState({ showAlert: false }) }}
                                    header={'¿Estás seguro que quieres eliminar este jugador?'}
                                    subHeader={'Esta acción no puede deshacerse.'}
                                    buttons={[{ text: 'Cancelar' }, { text: 'Eliminar', handler: this.eliminarJugador }]}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}

export default Jugador;


/*
 - PLANILLA MEDICA


 - VARIOS TELEFONOS?
 - DNI EDITABLE?
 - BORRO PAGOS SI ELIMINO A UN JUGADOR?
 */
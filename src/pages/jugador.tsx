import React from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonRow, IonGrid, IonCol, IonInput, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import { RouteComponentProps} from 'react-router';
import { call } from 'ionicons/icons';
import '../theme/jugador.css';
import { iJugador, DEPORTES, NOMBRE_CAT_FUTBOL, NOMBRE_DEPORTES } from '../interfaces';
import BD from '../BD';

interface jugadorProps extends RouteComponentProps<{
    dni: string,
}> { };

interface iState {

    jugador: iJugador,
    jugadorTemp: iJugador,
    isReadOnly: boolean,
    showAlert: boolean,
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

class Jugador extends React.Component<jugadorProps> {

    state: iState; 

    constructor(props: jugadorProps) {

        super(props);
        this.state = {

            jugador: jugadorPorDefecto,
            jugadorTemp: jugadorPorDefecto,
            isReadOnly: true,
            showAlert: false
        }
    }

    componentDidMount = () => {

        BD.getJugadoresDB().get(this.props.match.params.dni)
            .then((doc) => { this.setState({ jugador: doc, jugadorTemp: doc }) })
            .catch(console.log);
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

        let jugador: iJugador = {
            '_id': this.state.jugadorTemp._id,
            nombre: event.target.value,
            dni: this.state.jugadorTemp.dni,
            categoria: this.state.jugadorTemp.categoria,
            deportes: this.state.jugadorTemp.deportes,
            telResponsable: this.state.jugadorTemp.telResponsable,
            fechaNacimiento: this.state.jugadorTemp.fechaNacimiento,
            planillaMedica: this.state.jugadorTemp.planillaMedica
        };

        this.setState({ jugadorTemp: jugador });
    }

    guardarNuevoTelefono = (event: any) => {

        let jugador: iJugador = {
            '_id': this.state.jugadorTemp._id,
            nombre: this.state.jugadorTemp.nombre,
            dni: this.state.jugadorTemp.dni,
            categoria: this.state.jugadorTemp.categoria,
            deportes: this.state.jugadorTemp.deportes,
            telResponsable: event.target.value,
            fechaNacimiento: this.state.jugadorTemp.fechaNacimiento,
            planillaMedica: this.state.jugadorTemp.planillaMedica
        };

        this.setState({ jugadorTemp: jugador });
    }

    guardarFechaNacimiento = (event: any) => {

        let jugador: iJugador = {
            '_id': this.state.jugadorTemp._id,
            nombre: this.state.jugadorTemp.nombre,
            dni: this.state.jugadorTemp.dni,
            categoria: this.state.jugadorTemp.categoria,
            deportes: this.state.jugadorTemp.deportes,
            telResponsable: this.state.jugadorTemp.telResponsable,
            fechaNacimiento: event.target.value.split('T')[0],
            planillaMedica: this.state.jugadorTemp.planillaMedica
        };

        this.setState({ jugadorTemp: jugador });
    }

    guardarDeportes = (event: any) => {

        let jugador: iJugador = {
            '_id': this.state.jugadorTemp._id,
            nombre: this.state.jugadorTemp.nombre,
            dni: this.state.jugadorTemp.dni,
            categoria: this.state.jugadorTemp.categoria,
            deportes: event.target.value,
            telResponsable: this.state.jugadorTemp.telResponsable,
            fechaNacimiento: this.state.jugadorTemp.fechaNacimiento,
            planillaMedica: this.state.jugadorTemp.planillaMedica
        };

        this.setState({ jugadorTemp: jugador });
    }

    eliminarJugador = () => {

        BD.getJugadoresDB().get(this.state.jugador.dni)
            .then((doc) => BD.getJugadoresDB().remove(doc))
            .then((resultado) => { console.log(resultado); this.props.history.push('/jugadores') })
            .catch(console.log);
    }

    actualizarJugador = () => {

        BD.getJugadoresDB().upsert(this.state.jugadorTemp._id, () => this.state.jugadorTemp)
            .then(console.log)
            .catch(console.log);

        this.setState({ jugador: this.state.jugadorTemp, isReadOnly: true });
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
                <IonContent>
                    <IonItem>
                        <IonLabel>Nombre</IonLabel>
                        <IonInput
                            type="text" value={(this.state.isReadOnly) ? this.state.jugador.nombre : this.state.jugadorTemp.nombre}
                            readonly={this.state.isReadOnly}
                            clearInput={true}
                            minlength={1}
                            inputMode="text"
                            onIonInput={this.guardarNuevoNombre}
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
                        <IonButton size="default" color="success" fill="outline"><IonIcon icon={call} /></IonButton>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="tel"
                            value={(this.state.isReadOnly) ? this.state.jugador.telResponsable : this.state.jugadorTemp.telResponsable}
                            readonly={this.state.isReadOnly}
                            clearInput={true}
                            inputMode="tel"
                            minlength={1}
                            onIonInput={this.guardarNuevoTelefono}
                        />
                    </IonItem>
                    <IonGrid>
                        <IonRow hidden={!this.state.isReadOnly}>
                            <IonCol size='6'>
                                <IonButton className="botonJugador" fill="outline">Planilla Médica</IonButton>
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
                                    onClick={() => { this.setState({ jugadorTemp: this.state.jugador, isReadOnly: true }) }}
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
 - boton llamada funcional
 - botones planilla medica
 - VALIDACION DATOS?
 - boton volver atras
 - como hacer que al eliminar jugador y volver al listado, este se actualice automaticamente
 
 
 - VARIOS TELEFONOS??
 - DNI EDITABLE?
 - BORRO PAGOS SI ELIMINO A UN JUGADOR?
 */
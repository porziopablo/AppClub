import React, { useState } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonRow, IonGrid, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { call } from 'ionicons/icons';
import '../theme/jugadores.css';
import { iJugador, DEPORTES, NOMBRE_CAT_FUTBOL, NOMBRE_DEPORTES } from '../interfaces';
import BD from '../BD';

interface jugadorProps extends RouteComponentProps<{
    dni: string,
}> { }

const BotonEliminarJugador: React.FC = () => {

    const [showAlert, setShowAlert] = useState(false);

    return (
        <div>
            <IonButton className = "botonJugador" fill="outline" color = "danger" onClick={() => { setShowAlert(true) }}>
                Eliminar
                </IonButton>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'¿Estás seguro que quieres eliminar este jugador?'}
                subHeader={'Esta acción no puede deshacerse.'}
                buttons={['Cancelar', 'Eliminar']}
            />
        </div>
    );
}

class Jugador extends React.Component<jugadorProps> {

    state: {jugador: iJugador} = { 

        jugador: {              /* jugador por defecto */
            '_id': '0',
            nombre: ' ',
            dni: 0,
            categoria: 0,
            deportes: [],
            telResponsable: '0',
            fechaNacimiento: '2013-09-19T17:00:00.000',
            planillaMedica: ' '
        },
    }

    componentDidMount = () => {

        BD.getJugadoresDB().get(this.props.match.params.dni)
            .then((doc) => { this.setState({ jugador: doc }) })
            .catch(console.log);
    }

    formatearFecha = (stringOriginal: string): string => {

        return new Date(stringOriginal).toLocaleDateString('es-AR');
    }

    renderDeportes = (deportes: number[]): string => {

        let respuesta = '';

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

    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonItem>
                        <IonLabel>Nombre</IonLabel>
                        <h4>{this.state.jugador.nombre}</h4>
                    </IonItem>
                    <IonItem>
                        <IonLabel>DNI</IonLabel>
                        <h4>{this.state.jugador.dni}</h4>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Fecha de Nacimiento</IonLabel>
                        <h4>{this.formatearFecha(this.state.jugador.fechaNacimiento)}</h4>
                    </IonItem>
                    <IonItem>
                        <IonLabel>{(this.state.jugador.deportes.length === 1)? 'Deporte' : 'Deportes'}</IonLabel>
                        <h4>{this.renderDeportes(this.state.jugador.deportes)}</h4>
                    </IonItem>
                    {this.renderCategoria()}
                    <IonItem>
                        <IonLabel>Teléfono del Responsable</IonLabel>
                        <IonButton size="default" color="success" fill="outline"><IonIcon icon={call} /></IonButton>
                    </IonItem>
                    <IonItem>
                        <h4>{this.state.jugador.telResponsable}</h4>
                    </IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='6'>
                                <IonButton className="botonJugador" fill="outline">Planilla Médica</IonButton>
                            </IonCol>
                            <IonCol size='6'>
                                <IonButton className="botonJugador" fill="outline" href={`/pagosJugador/${this.state.jugador.dni}`}>Pagos</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='6'>
                                <IonButton className="botonJugador" fill="outline">Editar</IonButton>
                            </IonCol>
                            <IonCol size='6'>
                                <BotonEliminarJugador />
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
 - botones editar, eliminar, planilla medica
 */
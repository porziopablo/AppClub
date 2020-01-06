import React, { useState } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonIcon, IonAlert, IonRow, IonGrid, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { call } from 'ionicons/icons';
import '../theme/jugadores.css';


/* SOLO PARA VER COMO QUEDA */
interface iJugador {
    nombre: string,
    dni: string,
    categoria: string,
    deporte: string,
    telResponsable: string,
    fechaNacimiento: Date
}

interface jugadorProps extends RouteComponentProps<{
    dni: string,
}> { }

function getJugador(dni: string): any {
    const jugadores: iJugador[] = [
        { nombre: 'Ivan Aprea', dni: '12345678', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Mariquena Gros', dni: '91011121', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Martín Casas', dni: '33333333', categoria: '3', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Pablo Porzio', dni: '44444444', categoria: '4', deporte: 'futbol', telResponsable: '2235671119999999', fechaNacimiento: new Date(97, 7, 4) },
        { nombre: 'Adolfo Spinelli', dni: '5', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Leonel Guccione', dni: '6', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: '"Bigote" Dematteis', dni: '7', categoria: '3', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Felipe Evans', dni: '8', categoria: '4', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Marito Baracus', dni: '9', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
        { nombre: 'Benito Mussolinni', dni: '10', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    ];


    return jugadores.find((jugador: iJugador) => jugador.dni === dni);
}

/*************************/

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

const Jugador: React.FC<jugadorProps> = ({match}) => {
    const jugador: iJugador = getJugador(match.params.dni);

    return (
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonLabel>Nombre</IonLabel>
                    <h4>{jugador.nombre}</h4>
                </IonItem>
                <IonItem>
                    <IonLabel>DNI</IonLabel>
                    <h4>{jugador.dni}</h4>
                </IonItem>
                <IonItem>
                    <IonLabel>Fecha de Nacimiento</IonLabel>
                    <h4>{jugador.fechaNacimiento.toLocaleDateString('es-AR')}</h4>
                </IonItem>
                <IonItem>
                    <IonLabel>Deporte</IonLabel>
                    <h4>{jugador.deporte.toUpperCase()}</h4>
                </IonItem>
                <IonItem>
                    <IonLabel>Categoría Fútbol</IonLabel>
                    <h4>{jugador.categoria}</h4>
                </IonItem>
                <IonItem>
                    <IonLabel>Teléfono del Responsable</IonLabel>
                    <IonButton size = "default" color = "success" fill = "outline"><IonIcon icon={call}/></IonButton>
                </IonItem>
                <IonItem>
                    <h4>{jugador.telResponsable}</h4>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol size = '6'>
                            <IonButton className="botonJugador" fill="outline">Planilla Médica</IonButton>
                        </IonCol>
                        <IonCol size = '6'>
                            <IonButton className="botonJugador" fill="outline" href={`/pagosJugador/${jugador.dni}`}>Pagos</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size = '6'> 
                            <IonButton className="botonJugador" fill="outline">Editar</IonButton>
                        </IonCol>
                        <IonCol size = '6'>
                            <BotonEliminarJugador />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Jugador;
/*UTF8*/
import {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonHeader,
    IonList
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface iJugador {
    nombre: string,
    dni: string,
    categoria: string,
    deporte: string,
}

interface iFecha {
    day: number,
    month: number,
    year: number,
}

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const jugadores: iJugador[] = [
    { nombre: 'Ivan Aprea', dni: '12345678', categoria: '1', deporte: 'futbol' },
    { nombre: 'Mariquena Gros', dni: '91011121', categoria: '2', deporte: 'basket' },
    { nombre: 'Martín Casas', dni: '33333333', categoria: '3', deporte: 'futbol' },
];

const AsistenciaHistJ: React.FC<UserDetailPageProps> = ({ match }) => {

    const renderJugadores = () => {
        return (
            jugadores.map((jugador: iJugador) => (
                <IonItem key={jugador.dni}>
                    <IonLabel>
                        <h2>{jugador.nombre}</h2>
                    </IonLabel>
                </IonItem>
            )));
    }

 // VER como acceder al id de la fecha para el titulo y para los datos de los jugadores (db)
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        Dia 1/3/2020  
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderJugadores()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default AsistenciaHistJ;
/*UTF8*/

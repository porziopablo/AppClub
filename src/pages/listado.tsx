import React from 'react';
import {IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import '../theme/listado.css';

/* SOLO PARA VER COMO QUEDA */

interface iJugador {
    nombre: string,
    dni: string,
    categoria: string,
    deporte: string,
}

const jugadores: iJugador[] = [
    { nombre: 'Ivan Aprea', dni: '12345678', categoria: '1', deporte: 'futbol' },
    { nombre: 'Mariquena Gros', dni: '91011121', categoria: '2', deporte: 'basket' },
    { nombre: 'Martín Casas', dni: '33333333', categoria: '3', deporte: 'futbol' },
    { nombre: 'Pablo Porzio', dni: '44444444', categoria: '4', deporte: 'futbol' },
];

/**************************/

const Listado: React.FC = () => {

    const renderJugadores = () => {
        return (
            jugadores.map((jugador: iJugador) => (
                <IonItem key={jugador.dni}>
                    <IonLabel>
                        <h2>{jugador.nombre}</h2>
                        <h3 className = 'datos'>{'DNI: ' + jugador.dni + ' | Categoría: ' + jugador.categoria}</h3>
                    </IonLabel>
                </IonItem>
            )));
    }

    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {renderJugadores()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Listado;
/*UTF8*/
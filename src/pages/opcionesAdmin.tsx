﻿import React from 'react';
import { IonHeader, IonPage, IonContent, IonButton, IonText } from '@ionic/react';
import '../theme/jugadores.css';

const OpcionesAdmin: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div id='textoJugadores'>
                    <IonText>Opciones de administrador</IonText>
                </div>
                <IonButton className="botonJugadores" fill="outline" href="/usuarios/nuevos">Solicitudes de <br /> nuevos usuarios</IonButton>
                <IonButton className="botonJugadores" fill="outline" href="/usuarios/existentes">Lista de <br /> usuarios existentes</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default OpcionesAdmin;
/*UTF8*/
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
} from '@ionic/react';
import React from 'react';
import '../theme/jugadores.css';

const Jugadores: React.FC = () => {
  return (
    <IonPage>
          <IonContent>
              <div id = 'textoJugadores'>
                  <IonText>Jugadores</IonText>
              </div> 
              <IonButton className = "botonJugadores" fill="outline">Registrar Jugador</IonButton>
              <IonButton className="botonJugadores" fill="outline" href="/listado">Listado</IonButton>
          </IonContent>  
    </IonPage>
  );
};

export default Jugadores;
/*UTF8*/

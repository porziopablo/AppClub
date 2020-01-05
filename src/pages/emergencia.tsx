import React from 'react';
import { IonHeader, IonPage, IonContent, IonButton, IonText } from '@ionic/react';
import '../theme/emergencia.css';

const Emergencia: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div id='textoEmg'>
                    <IonText>Numeros de emergencia</IonText>
                </div>
                <IonButton className="botonEmg" fill="outline" size="default"><a href="tel:911">EMERGENCIAS <br /> POLICIALES (911)</a></IonButton>
                <IonButton className="botonEmg" fill="outline" size="default"><a href="tel:107">URGENCIAS <br /> MÉDICAS (107)</a></IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Emergencia;
/*UTF8*/

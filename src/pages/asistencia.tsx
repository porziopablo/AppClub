import React from 'react';
import { IonHeader, IonPage, IonButton, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import '../theme/asistencia.css';

const Asistencia: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">1° División <br /> femenina</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">1° División <br /> masculina</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">5° División</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">7° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">9° División <br /> mixta</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">11° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">13° División <br /> mixta</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaCat">15° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Asistencia;
/*UTF8*/
import React from 'react';
import { IonHeader, IonPage, IonButton, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import '../theme/asistencia.css';

const AsistenciaCatVer: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/1">1° División <br /> femenina</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/2">1° División <br /> masculina</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/3">5° División</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/4">7° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/5">9° División <br /> mixta</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/6">11° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/7">13° División <br /> mixta</IonButton></IonCol>
                        <IonCol><IonButton id='boton' size="default" fill="outline" href="/asistenciaHist/8">15° División <br /> mixta</IonButton></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default AsistenciaCatVer;
/*UTF8*/
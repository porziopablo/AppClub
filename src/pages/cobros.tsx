import React from 'react';
import {IonPage, IonContent, IonItem, IonLabel, IonInput, IonItemGroup, IonButton, IonIcon, IonText, IonRow, IonCol, IonGrid} from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

const Cobros: React.FC = () => {
  return (
    <IonPage>
          <IonContent>
              <IonItemGroup>
                  <IonItem>
                      <IonLabel>Cobros</IonLabel>
                  </IonItem>
                  <IonItem>
                      <IonInput placeholder="DNI Jugador/a" inputMode="text" minlength={1} required={true}></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonInput placeholder="Monto" inputMode="numeric" min="0" required={true} type="number"></IonInput>
                      <IonButton fill="outline" slot="end" size="default" color="success">
                          <IonIcon icon={checkmarkCircle} />
                      </IonButton>
                  </IonItem>
              </IonItemGroup>
              <IonItemGroup>
                  <IonItem>
                      <IonLabel>Balance</IonLabel>
                  </IonItem>
                  <IonItem>
                      <IonText>
                          <h4>$1500,0</h4>
                      </IonText>
                      <IonButton  fill = "outline" slot="end" size="default" color="success">
                          <IonIcon icon={checkmarkCircle} />
                      </IonButton>
                  </IonItem>
                  <IonGrid>
                      <IonRow align-content-center>
                          <IonCol>
                              <IonButton fill = "outline">
                                  Historial de Cobros
                              </IonButton>
                          </IonCol>  
                      </IonRow>
                  </IonGrid>  
              </IonItemGroup>
          </IonContent>  
    </IonPage>
  );
};

export default Cobros; 

/*
 - Usamos teclado específico para inputs numericos?
 - Falta Boton Comprobante
 */
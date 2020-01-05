import React, { useState } from 'react';
import { IonHeader, IonPage, IonContent, IonText, IonItem, IonLabel, IonInput, IonButton, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import '../theme/registrarJugador.css';

const RegistrarJugador: React.FC = () => {

    const [showPass, setShowPass] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <IonPage>
            <IonContent>
                <form>
                    <IonText class='warning'>Es obligatorio completar todos los campos.</IonText>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Nombre</IonText></IonLabel>
                        <IonInput required type="text" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Apellido</IonText></IonLabel>
                        <IonInput required type="text" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>DNI</IonText></IonLabel>
                        <IonInput required type="number" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Fecha de nacimiento</IonText></IonLabel>
                        <IonDatetime displayFormat="DD MM YY" placeholder="Seleccionar fecha"></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel><IonText class='label-modal'>Deportes que realiza</IonText></IonLabel>
                        <IonSelect multiple={true} cancelText="Cancelar" okText="Aceptar">
                            <IonSelectOption value="bacon">Futbol</IonSelectOption>
                            <IonSelectOption value="olives">Basket</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Telefono del responsable</IonText></IonLabel>
                        <IonInput required type="number" ></IonInput>
                    </IonItem>
                    <IonButton expand="full" fill='clear' >Foto de la planilla medica</IonButton>
                    <div>
                        <IonButton type='submit' onClick={() => setShowModal(false)} id='botModal'>Registrar jugador</IonButton>
                        <IonButton onClick={() => setShowModal(false)} id='botModal'>Cancelar</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default RegistrarJugador;
/*UTF8*/
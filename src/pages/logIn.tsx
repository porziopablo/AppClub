import React, { useState } from 'react';
import { IonPage, IonContent, IonLabel, IonInput, IonItem, IonText, IonCheckbox, IonButton, IonModal  } from '@ionic/react';
import logoClub from '../images/logoclub.jpg'
import '../theme/logIn.css';


const LogIn: React.FC = () => {

    const [showPass, setShowPass] = useState(false);
    const [showModal, setShowModal] = useState(false);


    return (
        <IonPage>
            <IonContent>
                <h1>
                    <img id='logoClub' src={logoClub} alt="Logo del club" />
                </h1>
                <IonItem id='div1'>
                    <IonLabel position="floating"><IonText class='label-login'>DNI</IonText></IonLabel>
                    <IonInput required type="text" ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"><IonText class='label-login'>Contraseña</IonText></IonLabel>
                    <IonInput required type={(showPass===true) ? 'text' : 'password'}></IonInput>
                </IonItem>
                <div id='verPas'>
                    <IonLabel >Mostrar contraseña</IonLabel>
                    <IonCheckbox class='CB' onClick={() => setShowPass(!showPass)}></IonCheckbox>
                </div>
                <IonButton id='botModal'>Iniciar Sesion</IonButton>
                <IonModal isOpen={showModal}>
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
                            <IonLabel position="floating"><IonText class='label-modal'>Contraseña</IonText></IonLabel>
                            <IonInput required type="password" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Confirmar contraseña</IonText></IonLabel>
                            <IonInput required type="password" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Correo electronico</IonText></IonLabel>
                            <IonInput required type="email" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Confirmar correo electronico</IonText></IonLabel>
                            <IonInput required type="email" ></IonInput>
                        </IonItem>
                        <div>
                            <IonButton type='submit' onClick={() => setShowModal(false)} id='botModal'>Registrarse</IonButton>
                            <IonButton onClick={() => setShowModal(false)} id='botModal'>Cancelar</IonButton>
                        </div>
                    </form>
                </IonModal>
                <IonButton id='botModal' onClick={() => setShowModal(true)}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;
/*UTF8*/
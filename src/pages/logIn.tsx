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
                    <IonLabel position="floating"><IonText class='label2'>Usuario</IonText></IonLabel>
                    <IonInput required type="text" ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"><IonText class='label2'>Contraseña</IonText></IonLabel>
                    <IonInput required type={(showPass===true) ? 'text' : 'password'}></IonInput>
                </IonItem>
                <div id='verPas'>
                    <IonLabel >Mostrar contraseña</IonLabel>
                    <IonCheckbox class='CB' onClick={() => setShowPass(!showPass)}></IonCheckbox>
                </div>
                <IonButton id='botModal'>Iniciar Sesion</IonButton>
                <IonModal isOpen={showModal}>
                    <p>This is modal content</p>
                    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                </IonModal>
                <IonButton id='botModal' onClick={() => setShowModal(true)}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;
/*UTF8*/
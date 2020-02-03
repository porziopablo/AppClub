import React, { useState, FormEvent } from 'react';
import { IonPage, IonContent, IonLabel, IonInput, IonItem, IonText, IonCheckbox, IonButton, IonModal, IonAlert, IonToast } from '@ionic/react';
import logoClub from '../images/logoclub.jpg'
import '../theme/logIn.css';

import { maxNumDni, regEmail, regDni, regNombre, iProfesor, iBalance } from '../interfaces';

import db from '../BD';

const regPass = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+([A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/;


const profesor: iProfesor = {
    '_id': '',
    nombre: '',
    dni: '',
    email: '',
    pass: '',
}

interface iState {
    toastParams: {
        mostrar: boolean,
        mensaje: string,
    }
}

const balance: iBalance ={
    '_id':'',
    fechaCancelacion: '',
    nombreProfesor: '',
    total: 0,

}


const LogIn: React.FC = () => {


    const [msjError, setMsjError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);
    const [existingUserReg, setExistingUserReg] = useState(false);
    const [differentDni, setDifferentDni] = useState(false);
    const [differentPass, setDifferentPass] = useState(false);
    const [showSuccessReg, setShowSuccessReg] = useState(false);
    const [noExistingUserLog, setNoExistingUserLog] = useState(false);
    const [incorrectPass, setIncorrectPass] = useState(false);
    const [invalidName, setIvalidName] = useState(false);
    const [invalidDni, setInvalidDni] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);


    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        setMostrarError(false);
        setDifferentPass(false);
        setDifferentDni(false);
        setExistingUserReg(false);
        setInvalidDni(false);
        setInvalidEmail(false);
        setInvalidPass(false);
        setIvalidName(false);

        profesor.dni = String(data.get('dni'));
        profesor.pass = String(data.get('pass'));
        profesor.nombre = String(data.get('nombre')) + String(' '+data.get('apellido'));
        profesor.email = String(data.get('email'));



        if ((regNombre.test(profesor.nombre)) && (regDni.test(profesor.dni)) && (profesor.dni === data.get('dniconf')) && (regPass.test(profesor.pass)) && (profesor.pass === data.get('passconf')) && regEmail.test(profesor.email)) {

            db.getProfesoresDB().signUp(profesor.dni, profesor.pass, {
                metadata: {
                    email: profesor.email,
                    nombre: profesor.nombre,
                    dni: profesor.dni,
                }
            }
            ).then((respuesta) => {
                if (respuesta.ok) {
                    setShowSuccessReg(true);
                    balance.nombreProfesor = profesor.nombre;
                    balance._id = profesor.dni;
                    db.getBalancesDB().post(balance);
                }
                else
                    alert('Intente nuevamente');
                (document.getElementById('registro') as HTMLFormElement).reset();
            }
            ).catch((error: Error) => {
                if (error.name === 'conflict') {
                    setExistingUserReg(true);
                    (document.getElementById('dni') as HTMLInputElement).value = '';
                    (document.getElementById('dniconf') as HTMLInputElement).value = '';
                    (document.getElementById('pass') as HTMLInputElement).value = '';
                    (document.getElementById('passConf') as HTMLInputElement).value = '';
                }
                else {
                    setMsjError('Error al registrarse, intente nuevamente.')
                    setMostrarError(true);
                }
            })

        }
        else {

            //ERRORES EN LOS DATOS DE ENTRADA
            if (!regNombre.test(profesor.nombre)) {
                //nombre invalido
                (document.getElementById('nombre') as HTMLInputElement).value = '';
                (document.getElementById('apellido') as HTMLInputElement).value = '';
                (document.getElementById('pass') as HTMLInputElement).value = '';
                (document.getElementById('passConf') as HTMLInputElement).value = '';
                setIvalidName(true);
            }
            else {
                if (!regDni.test(profesor.dni)) {
                    //dni ivalido
                    (document.getElementById('dni') as HTMLInputElement).value = '';
                    (document.getElementById('dniconf') as HTMLInputElement).value = '';
                    (document.getElementById('pass') as HTMLInputElement).value = '';
                    (document.getElementById('passConf') as HTMLInputElement).value = '';
                    setInvalidDni(true);
                }
                else {
                    if (profesor.dni !== data.get('dniconf')) {
                        // dni y dni conf iguales
                        setDifferentDni(true);
                        (document.getElementById('dniconf') as HTMLInputElement).value = '';
                        (document.getElementById('pass') as HTMLInputElement).value = '';
                        (document.getElementById('passConf') as HTMLInputElement).value = '';
                    }
                    else {
                        if (!regPass.test(profesor.pass)) {
                            //contraseña con caracteres no validos
                            (document.getElementById('pass') as HTMLInputElement).value = '';
                            (document.getElementById('passConf') as HTMLInputElement).value = '';
                            setInvalidPass(true);
                        }
                        else {
                            if (profesor.pass !== data.get('passconf')) {
                                //pass y pass conf iguales
                                (document.getElementById('pass') as HTMLInputElement).value = '';
                                (document.getElementById('passConf') as HTMLInputElement).value = '';
                                setDifferentPass(true);
                            }
                            else {
                                if (!regEmail.test(profesor.email)) {
                                    //email invalido
                                    (document.getElementById('pass') as HTMLInputElement).value = '';
                                    (document.getElementById('passConf') as HTMLInputElement).value = '';
                                    setInvalidEmail(true);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function logIn(event: FormEvent) {
        event.preventDefault();
        setIncorrectPass(false);
        setNoExistingUserLog(false);
        const data = new FormData(event.target as HTMLFormElement);
        const usuario = String(data.get('usuario'));
        const pass = String(data.get('pass'));

        db.getProfesoresDB().logIn(usuario, pass)
            .then((respuesta) => {
                if (respuesta.ok) {
                    window.location.href = '/home';
                }
                else
                    alert('Intente nuevamente');
            })
            .catch((error: Error) => {
                if (error.name === 'unauthorized') {
                    setNoExistingUserLog(true);
                    (document.getElementById('passlog') as HTMLInputElement).value = '';
                }
                else if (error.name === 'forbidden') {
                    setIncorrectPass(true);
                    (document.getElementById('passlog') as HTMLInputElement).value = '';
                }
                else {
                    setMsjError('Error al iniciar sesion, intente nuevamente.');
                    setMostrarError(true);
                }
                    
            })
    }

    return (
        <IonPage>
            <IonContent>
                <h1>
                    <img id='logoClub' src={logoClub} alt="Logo del club" />
                </h1>
                <IonToast
                    isOpen={mostrarError}
                    onDidDismiss={() => setMostrarError(false)}
                    message={msjError}
                    color="danger"
                    showCloseButton={true}
                    closeButtonText="CERRAR"
                />
                <form id='login' onSubmit={logIn}>
                    <IonItem id='div1'>
                        <IonLabel position="floating">
                            <IonText class={(noExistingUserLog) ? 'label-login-warning' : 'label-login'}>DNI</IonText>
                            <IonText class={(noExistingUserLog) ? 'regError' : 'esconder'}>Inegrese un dni valido</IonText>
                        </IonLabel>
                        <IonInput id='usuario' maxlength={maxNumDni} required name='usuario' type="text" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">
                            <IonText class={(incorrectPass) ? 'label-login-warning' : 'label-login'}>Contraseña</IonText>
                            <IonText class={(incorrectPass) ? 'regError' : 'esconder'}>Inegrese correctamente la contraseña</IonText>
                        </IonLabel>
                        <IonInput id='passlog' required name='pass' type={(showPass === true) ? 'text' : 'password'}></IonInput>
                    </IonItem>
                    <div id='verPas'>
                        <IonLabel >Mostrar contraseña</IonLabel>
                        <IonCheckbox class='CB' onClick={() => setShowPass(!showPass)}></IonCheckbox>
                    </div>
                    <IonButton type='submit' class='botLog' >Iniciar Sesion</IonButton>
                </form>
                <IonModal isOpen={showModalReg}>
                    <form id='registro' onSubmit={handleSubmit}>
                        <IonText class='warning'>Es obligatorio completar todos los campos.</IonText>
                        <IonItem>
                            <IonLabel position="floating"><IonText class={(invalidName) ? 'label-modal-warning' : 'label-modal'}>Nombre</IonText></IonLabel>
                            <IonInput id='nombre' name='nombre' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(invalidName) ? 'label-modal-warning' : 'label-modal'}>Apellido</IonText>
                                <IonText class={(invalidName) ? 'regError' : 'esconder'}>Nombre o apellido con caracteres invalidos.</IonText>
                            </IonLabel>
                            <IonInput id='apellido' name='apellido' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(existingUserReg || invalidDni || differentDni) ? 'label-modal-warning' : 'label-modal'}>DNI</IonText>
                                <IonText class={(existingUserReg) ? 'regError' : 'esconder'}>El DNI ingresado ya existe.</IonText>
                                <IonText class={(invalidDni) ? 'regError' : 'esconder'}>El DNI ingresado contiene caracteres invalidos.</IonText>
                            </IonLabel>
                            <IonInput id='dni' name='dni' maxlength={maxNumDni} required type="text" min={"0"}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentDni) ? 'label-modal-warning' : 'label-modal'}>Confirmar DNI</IonText>
                                <IonText class={(differentDni) ? 'regError' : 'esconder'}>Ingrese el DNI correcto.</IonText>
                            </IonLabel>
                            <IonInput id='dniconf' name='dniconf' maxlength={maxNumDni} required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentPass || invalidPass) ? 'label-modal-warning' : 'label-modal'}>Contraseña</IonText>
                                <IonText class={(invalidPass) ? 'regError' : 'esconder'}>La contraseña contiene caracteres invalidos.</IonText>
                            </IonLabel>
                            <IonInput id='pass' name='pass' required type="password" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentPass) ? 'label-modal-warning' : 'label-modal'}>Confirmar contraseña</IonText>
                                <IonText class={(differentPass) ? 'regError' : 'esconder'}>Ingrese la contraseña correcta.</IonText>
                            </IonLabel>
                            <IonInput id='passConf' name='passconf' required type="password"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(invalidEmail) ? 'label-modal-warning' : 'label-modal'}>Correo electronico</IonText>
                                <IonText class={(invalidEmail) ? 'regError' : 'esconder'}>El correo electronico no es valido.</IonText>
                            </IonLabel>
                            <IonInput name='email' required type="email" ></IonInput>
                        </IonItem>
                        <IonAlert
                            isOpen={showSuccessReg}
                            onDidDismiss={() => { setShowSuccessReg(false); setShowModalReg(false); }}
                            header={'Cuenta creada con exito!'}
                            message={'Cierre para continuar.'}
                            buttons={['Cerrar']}
                        />
                        <div>
                            <IonButton type='submit' class='botLog'>Registrarse</IonButton>
                            <IonButton onClick={() => {
                                setShowModalReg(false);
                                (document.getElementById('pass') as HTMLInputElement).value = '';
                                (document.getElementById('passConf') as HTMLInputElement).value = '';
                            }
                            } class='botLog'>Cancelar</IonButton>
                        </div>
                    </form>
                </IonModal>
                <IonButton class='botLog' onClick={() => setShowModalReg(true)}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;
/*UTF8*/
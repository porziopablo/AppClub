import React, { useState, FormEvent } from 'react';
import { IonPage, IonContent, IonLabel, IonInput, IonItem, IonText, IonCheckbox, IonButton, IonModal, IonAlert } from '@ionic/react';
import logoClub from '../images/logoclub.jpg'
import '../theme/logIn.css';
import { iProfesor } from '../interfaces';
import db from '../BD';


const LogIn: React.FC = () => {

    const [showPass, setShowPass] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);
    const [existingUserReg, setExistingUserReg] = useState(false);
    const [differentDni, setDifferentDni] = useState(false);
    const [differentPass, setDifferentPass] = useState(false);
    const [showSuccessReg, setShowSuccessReg] = useState(false);
    const [noExistingUserLog, setNoExistingUserLog] = useState(false);
    const [incorrectPass, setIncorrectPass] = useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        setDifferentPass(false);
        setDifferentDni(false);
        setExistingUserReg(false);
        if ((data.get('dni') === data.get('dniconf')) && (data.get('pass') === data.get('passconf'))) {
            const dni = String(data.get('dni'));
            db.getProfesoresDB().find({  
                selector: { _id: { $eq: dni } } //Busca un id igual al dni en forma de string, si no falla, entra el then
            }).then(function (result) {
                if (result.docs.length === 0) {  //si el resultado del find es un array de long 0 agrega, else informa usuario existente.
                    db.getProfesoresDB().put({
                        _id: String(dni),
                        nombre: data.get('nombre') + String(data.get('apellido')),
                        dni: dni,
                        email: data.get('email'),
                        pass: data.get('pass')
                    }).then((respuesta) => {
                        if (respuesta.ok)
                            setShowSuccessReg(true);
                        else
                            alert('Intente nuevamente');
                    }).catch( (error) => console.log(error));
                    
                    (document.getElementById('registro') as HTMLFormElement).reset();
                }
                else {
                    setExistingUserReg(true);
                    (document.getElementById('dni') as HTMLInputElement).value = '';
                    (document.getElementById('pass') as HTMLInputElement).value = '';
                    (document.getElementById('passConf') as HTMLInputElement).value = '';
                    console.log('el usuario ya existe');
                    
                }
            }).catch(function (err) { console.log(err) });
        }
        else {
            //ERROR EN LOS DATOS DE ENTRADA
            if (data.get('dni') !== data.get('dniconf')) {
                setDifferentDni(true);
                (document.getElementById('dniconf') as HTMLInputElement).value = '';
                (document.getElementById('pass') as HTMLInputElement).value = '';
                (document.getElementById('passConf') as HTMLInputElement).value = '';
            }
            else {
                (document.getElementById('pass') as HTMLInputElement).value = '';
                (document.getElementById('passConf') as HTMLInputElement).value = '';
                setDifferentPass(true);
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
        db.getProfesoresDB().find({
            selector: { _id: { $eq: usuario } }
        }).then((result) => {
            if (result.docs.length !== 0) {
                db.getProfesoresDB().get(usuario).then(function (doc: any) {
                    if (pass === doc.pass) { //tengo que setear el usuario activo!!!!!!
                        window.location.href='/home';  //Logueo exitoso!!       si se quiere cancelar la redireccion, comentar esta linea
                    }
                    else {
                        //La contraseña es incorrecta, entra aqui
                        setIncorrectPass(true);
                        (document.getElementById('passlog') as HTMLInputElement).value = '';
                    }
                }).catch((error) => console.log(error))
            }
            else {
                //El usuario no existe entra aqui
                setNoExistingUserLog(true);
                (document.getElementById('passlog') as HTMLInputElement).value = '';
            }
        }).catch((error) => { console.log(error) });
    }

    return (
        <IonPage>
            <IonContent>
                <h1>
                    <img id='logoClub' src={logoClub} alt="Logo del club" />
                </h1>
                <form id='login' onSubmit={logIn}>
                    <IonItem id='div1'>
                        <IonLabel position="floating">
                            <IonText class={(noExistingUserLog) ? 'label-login-warning' : 'label-login'}>DNI</IonText>
                            <IonText class={(noExistingUserLog) ? 'regError' : 'esconder'}>Inegrese un dni valido</IonText>
                        </IonLabel>
                        <IonInput id='usuario' required name='usuario' type="text" ></IonInput>
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
                            <IonLabel position="floating"><IonText class='label-modal'>Nombre</IonText></IonLabel>
                            <IonInput id='nombre' name='nombre' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Apellido</IonText></IonLabel>
                            <IonInput id='apellido' name='apellido' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(existingUserReg || differentDni) ? 'label-modal-warning' : 'label-modal'}>DNI</IonText>
                                <IonText class={(existingUserReg) ? 'regError' : 'esconder'}>El DNI ingresado ya existe.</IonText>
                            </IonLabel>
                            <IonInput id='dni' name='dni' required type="text" min={"0"}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentDni) ? 'label-modal-warning' : 'label-modal'}>Confirmar DNI</IonText>
                                <IonText class={(differentDni) ? 'regError' : 'esconder'}>Ingrese el DNI correcto.</IonText>
                            </IonLabel>
                            <IonInput id='dniconf' name='dniconf' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class={(differentPass) ? 'label-modal-warning' : 'label-modal'}>Contraseña</IonText></IonLabel>
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
                            <IonLabel position="floating"><IonText class='label-modal'>Correo electronico</IonText></IonLabel>
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
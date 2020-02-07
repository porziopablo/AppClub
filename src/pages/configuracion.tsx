import React, { useState, FormEvent, useEffect } from 'react';
import { IonHeader, IonPage, IonContent, IonList, IonItem, IonModal, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonLabel, IonInput, IonText, IonToast, IonCheckbox } from '@ionic/react';
import { create } from 'ionicons/icons';
import { regEmail } from '../interfaces';
import '../theme/configuracion.css';
import db from '../BD';

const regPass = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+([A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/;

const Configuracion: React.FC = () => {
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [metadata, setMetadata] = useState<any>({});
    useEffect(() => {
        //obtener sesion del profesor pasado por parametro
        db.getProfesoresDB().getSession()
            .then(res => {
                db.getProfesoresDB().getUser(res.userCtx.name)
                    .then(rta => {
                        setMetadata(rta);
                    }).catch(err => {

                    })
            }).catch(err => {
                setToastColor("danger");
                setToastMsg("Error al obtener datos del profesor");
                setToast(true);
            });
    }, [setMetadata]);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [differentEmail, setDifferentEmail] = useState(false);
    const [toast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastColor, setToastColor] = useState('danger');
    const [invalidPass, setInvalidPass] = useState(false);
    const [differentPass, setDifferentPass] = useState(false);

    function handleSubmitEmail(event: FormEvent) {
        event.preventDefault();
        setInvalidEmail(false);
        setDifferentEmail(false);
        const data = new FormData(event.target as HTMLFormElement);
        const email = String(data.get('email'));
        if (email !== (document.getElementById('emailconf') as HTMLInputElement).value) {
            //email y emailconf diferentes
            setDifferentEmail(true);
        }
        else if (!regEmail.test(email)) {
            //email invalido
            setInvalidEmail(true);
        }
        else {
            db.getProfesoresDB().putUser(metadata.name, {
                metadata: {
                    email: email,
                }
            }).then(res => {
                setShowModalEmail(false);
                setToastColor("success");
                setToastMsg("El email se ha cambiado con exito");
                setToast(true);
            }).catch(err => {
                setToastColor("danger");
                setToastMsg("Error al cambiar el email");
                setToast(true);
            });
        }
    }

    function handleSubmitPass(event: FormEvent) {
        event.preventDefault();
        setInvalidPass(false);
        setDifferentPass(false);
        const data = new FormData(event.target as HTMLFormElement);
        const pass = String(data.get('pass'));
        if (pass !== (document.getElementById('passConf') as HTMLInputElement).value) {
            //email y emailconf diferentes
            setDifferentPass(true);
        }
        else if (!regPass.test(pass)) {
            //email invalido
            setInvalidPass(true);
        }
        else {
            db.getProfesoresDB().changePassword(metadata.name, pass)
                .then(res => {
                setShowModalPass(false);
                setToastColor("success");
                setToastMsg("La contraseña se ha cambiado con exito");
                setToast(true);
            }).catch(err => {
                setToastColor("danger");
                setToastMsg("Error al cambiar la contraseña");
                setToast(true);
            });
        }
    }

    function setearAdmin() {
        db.getProfesoresDB().deleteUser(metadata.name);
        //db.getProfesoresDB().signUpAdmin(metadata.name, );
        //db.getProfesoresDB().logIn(metadata.name, pass);
        //Redirect a Configuracion
    }

    return (
        <IonPage>
            <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={toastMsg}
                color={toastColor}
                duration={3500}
            />
            <IonHeader>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2> NOMBRE Y APELLIDO </h2>
                            <h3> {metadata.nombre} </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2> DNI </h2>
                            <h3> {metadata.name} </h3>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2> EMAIL </h2>
                            <h3> {metadata.email} </h3>
                        </IonLabel>
                        <IonButton slot="end" onClick={() => setShowModalEmail(true)} >
                            <IonIcon icon={create} />
                        </IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2> CONTRASEÑA </h2>
                        </IonLabel>
                        <IonButton slot="end" onClick={() => setShowModalPass(true)} >
                            <IonIcon icon={create} />
                        </IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel >Administrador?</IonLabel>
                        <IonCheckbox disabled={metadata.roles.lenght!==0? false:true} checked={(metadata.roles[0] === 'admin')} onClick={() => setearAdmin()}></IonCheckbox>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonModal isOpen={showModalEmail}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Cambiar Email
                        </IonTitle>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setShowModalEmail(false)}>
                                <IonIcon name="arrow-back"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form onSubmit={handleSubmitEmail}>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(invalidEmail) ? 'label-login-warning' : 'label-modal'}>Nuevo correo electronico</IonText>
                                <IonText class={(invalidEmail) ? 'regError' : 'esconder'}>El correo electronico no es valido.</IonText>
                            </IonLabel>
                            <IonInput name='email' required type="email" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentEmail) ? 'label-login-warning' : 'label-modal'}>Confirmar nuevo correo electronico</IonText>
                                <IonText class={(differentEmail) ? 'regError' : 'esconder'}>El correo electronico no coincide.</IonText>
                            </IonLabel>
                            <IonInput id='emailconf' name='emailconf' required type="email" ></IonInput>
                        </IonItem>
                        <IonButton class='botLog' type='submit'>Cambiar email</IonButton>
                    </form>
                </IonContent>
            </IonModal>
            <IonModal isOpen={showModalPass}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Cambiar contraseña
                        </IonTitle>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setShowModalPass(false)}>
                                <IonIcon name="arrow-back"></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form onSubmit={handleSubmitPass}>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentPass || invalidPass) ? 'label-modal-warning' : 'label-modal'}>Nueva contraseña</IonText>
                                <IonText class={(invalidPass) ? 'regError' : 'esconder'}>La contraseña contiene caracteres invalidos.</IonText>
                            </IonLabel>
                            <IonInput id='pass' name='pass' required type="password" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">
                                <IonText class={(differentPass) ? 'label-modal-warning' : 'label-modal'}>Confirmar nueva contraseña</IonText>
                                <IonText class={(differentPass) ? 'regError' : 'esconder'}>Las contraseñas no coinciden.</IonText>
                            </IonLabel>
                            <IonInput id='passConf' name='passconf' required type="password"></IonInput>
                        </IonItem>
                        <IonButton class='botLog' type='submit'>Cambiar contraseña</IonButton>
                    </form>
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default Configuracion;
/*UTF8*/
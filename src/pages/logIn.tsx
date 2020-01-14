import React, { useState, FormEvent } from 'react';
import { IonPage, IonContent, IonLabel, IonInput, IonItem, IonText, IonCheckbox, IonButton, IonModal } from '@ionic/react';
import logoClub from '../images/logoclub.jpg'
import '../theme/logIn.css';
import { iProfesor } from '../interfaces';
import dbprofesores from '../BD';


const LogIn: React.FC = () => {

    const [showPass, setShowPass] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);


    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        if ((data.get('dni') === data.get('dniconf')) && (data.get('pass') === data.get('passconf'))) {
            const dni = Number(data.get('dni'));
            dbprofesores.getProfesoresDB().find({  
                selector: { _id: { $eq: String(dni) } } //Busca un id igual al dni en forma de string, si no falla, entra el then
            }).then(function (result) {
                console.log(result);
                console.log(result.docs);
                if (result.docs.length === 0) {  //si el resultado del find es un array de long 0 agrega, else informa error.
                    dbprofesores.getProfesoresDB().put({
                        _id: String(dni),
                        nombre: data.get('nombre') + String(data.get('apellido')),
                        dni: dni,
                        email: data.get('email'),
                        pass: data.get('pass')
                    })
                }
                else {
                    //ACA HAY QUE AGREGAR EL CODIGO EN CASO DE EXISTENTE
                    console.log('el usuario ya existe');
                }
            }).catch(function (err) { console.log(err) });
        }
        else {
            //ACA HAY QUE AGREGAR EL CODIGO EN CASO DE ERROR EN LOS DATOS DE ENTRADA
            console.log('b');

        }
    }

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
                    <IonInput required type={(showPass === true) ? 'text' : 'password'}></IonInput>
                </IonItem>
                <div id='verPas'>
                    <IonLabel >Mostrar contraseña</IonLabel>
                    <IonCheckbox class='CB' onClick={() => setShowPass(!showPass)}></IonCheckbox>
                </div>
                <IonButton id='botModal'>Iniciar Sesion</IonButton>
                <IonModal isOpen={showModalReg}>
                    <form onSubmit={handleSubmit}>
                        <IonText class='warning'>Es obligatorio completar todos los campos.</IonText>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Nombre</IonText></IonLabel>
                            <IonInput name='nombre' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Apellido</IonText></IonLabel>
                            <IonInput name='apellido' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>DNI</IonText></IonLabel>
                            <IonInput name='dni' required type="number" min={"0"}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Confirmar DNI</IonText></IonLabel>
                            <IonInput name='dniconf' required type="text" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Contraseña</IonText></IonLabel>
                            <IonInput id='pass' name='pass' required type="password" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Confirmar contraseña</IonText></IonLabel>
                            <IonInput id='passConf' name='passconf' required type="password"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"><IonText class='label-modal'>Correo electronico</IonText></IonLabel>
                            <IonInput name='email' required type="email" ></IonInput>
                        </IonItem>
                        <div>
                            <IonButton type='submit' id='botModal'>Registrarse</IonButton>
                            <IonButton onClick={() => setShowModalReg(false)} id='botModal'>Cancelar</IonButton>
                        </div>
                    </form>
                </IonModal>
                <IonButton id='botModal' onClick={() => setShowModalReg(true)}>Registrarse</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LogIn;
/*UTF8*/
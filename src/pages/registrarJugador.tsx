import React, { useState } from 'react';
import { IonPage, IonIcon, IonToast, IonContent, IonText, IonItem, IonLabel, IonInput, IonButton, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import '../theme/registrarJugador.css';
import { iJugador } from '../interfaces';
import BD from '../BD';
import { camera } from 'ionicons/icons';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const RegistrarJugador: React.FC = () => {

    const [jugador, setJugador] = useState<iJugador>({'_id': '', nombre: '', dni: '', categoria: 0, deportes: [], telResponsable: '', fechaNacimiento: '', planillaMedica: ''});
    const [toast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastColor, setToastColor] = useState('danger');
    const [telefono, setTelefono] = useState('');

    //Foto de la planilla medica, con capacitor?

    function guardarNombre(event: any) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: event.target.value,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: jugador.telResponsable,
            fechaNacimiento: jugador.fechaNacimiento,
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function guardarDNI(event: any) {
        let jug: iJugador = {
            '_id': event.target.value,
            nombre: jugador.nombre,
            dni: event.target.value,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: jugador.telResponsable,
            fechaNacimiento: jugador.fechaNacimiento,
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function guardarFechaNacimiento(event: any) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: jugador.nombre,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: jugador.telResponsable,
            fechaNacimiento: event.target.value.split('T')[0],
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function guardarDeportes(event: any) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: jugador.nombre,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: event.target.value,
            telResponsable: jugador.telResponsable,
            fechaNacimiento: jugador.fechaNacimiento,
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function guardarTelefono(tel: string) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: jugador.nombre,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: tel,
            fechaNacimiento: jugador.fechaNacimiento,
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function handleRegistrar(event: any) {
        if (jugador.nombre === "") {
            setToastMsg("Debe escribir el nombre completo del alumno");
            setToast(true);
        }
        else if (jugador.dni === "") {
            setToastMsg("Debe escribir el DNI del alumno");
            setToast(true);
        }
        else if (jugador.fechaNacimiento === "") {
            setToastMsg("Debe seleccionar una fecha de nacimiento");
            setToast(true);
        }
        else if (jugador.deportes.length === 0) {
            setToastMsg("Debe seleccionar algun deporte");
            setToast(true);
        }
        else if (jugador.planillaMedica === "") {
            setToastMsg("Debe tomar o elegir una foto de la planilla medica");
            setToast(true);
        }
        else {
            let arr = Array.from(jugador.telResponsable);
            arr.splice(3, 0, '9');
            let jug: iJugador = {
                '_id': jugador._id,
                nombre: jugador.nombre,
                dni: jugador.dni,
                categoria: jugador.categoria,
                deportes: jugador.deportes,
                telResponsable: (arr.join('')),
                fechaNacimiento: jugador.fechaNacimiento,
                planillaMedica: jugador.planillaMedica
            }
            BD.getJugadoresDB().put(jug)
                .then(res => {
                    setToastColor("success");
                    setToastMsg("El jugador se ha cargado con exito");
                    setToast(true);
                })
                .catch(err => {
                    setToastColor("danger");
                    setToastMsg("ERROR al cargar al jugador, intentelo mas tarde.");
                    setToast(true);
                    console.log(err);
            });
        }
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
            <IonContent>
                <form>
                    <IonText class='warning'>Es obligatorio completar todos los campos.</IonText>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Nombres y apellido</IonText></IonLabel>
                        <IonInput onIonInput={guardarNombre} type="text" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>DNI</IonText></IonLabel>
                        <IonInput onIonInput={guardarDNI} type="number" ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Fecha de nacimiento</IonText></IonLabel>
                        <IonDatetime onIonChange={guardarFechaNacimiento} displayFormat="DD MM YY" placeholder="Seleccionar fecha"></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel><IonText class='label-modal'>Deportes que realiza</IonText></IonLabel>
                        <IonSelect onIonChange={guardarDeportes} multiple={true} cancelText="Cancelar" okText="Aceptar">
                            <IonSelectOption value="2">Futbol</IonSelectOption>
                            <IonSelectOption value="1">Basket</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonText class='label-modal'>Telefono del responsable:</IonText>
                    </IonItem>
                    <IonItem>
                        <PhoneInput
                            defaultCountry="AR"
                            countries={["AR"]}
                            placeholder="p.ej. 223 5555555"
                            value={telefono}
                            onChange={(res) => { setTelefono(res); guardarTelefono(res)}} />
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={camera}></IonIcon>
                        <IonText class='label-modal'> Planilla medica </IonText>
                    </IonItem>
                    <div>
                        <IonButton onClick={handleRegistrar} id='botModal'>Registrar jugador</IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default RegistrarJugador;
/*UTF8*/
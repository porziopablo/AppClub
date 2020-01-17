import React, { useState } from 'react';
import { IonPage, IonIcon, IonToast, IonContent, IonText, IonItem, IonLabel, IonInput, IonButton, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import '../theme/registrarJugador.css';
import { iJugador } from '../interfaces';
import PouchDB from 'pouchdb';
import { camera } from 'ionicons/icons';

const jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');

const RegistrarJugador: React.FC = () => {

    const [jugador, setJugador] = useState<iJugador>({'_id': '', nombre: '', dni: '', categoria: 0, deportes: [], telResponsable: '', fechaNacimiento: '', planillaMedica: ''});
    const [toastNombre, setToastNombre] = useState(false);
    const [toastDNI, setToastDNI] = useState(false);
    const [toastFecha, setToastFecha] = useState(false);
    const [toastDeportes, setToastDeportes] = useState(false);
    const [toastPlanilla, setToastPlanilla] = useState(false);
    const [toastExito, setToastExito] = useState(false);
    const [toastFracaso, setToastFracaso] = useState(false);

    //Foto de la planilla medica, con capacitor?

    function guardarNombre(event: any) {
        console.log(event.target.value);
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

    function guardarTelefono(event: any) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: jugador.nombre,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: event.target.value,
            fechaNacimiento: jugador.fechaNacimiento,
            planillaMedica: jugador.planillaMedica
        }
        setJugador(jug);
    }

    function handleRegistrar(event: any) {
        if (jugador.nombre === "") {
            setToastNombre(true);
        }
        else if (jugador.dni === "") {
            setToastDNI(true);
        }
        else if (jugador.fechaNacimiento === "") {
            setToastFecha(true);
        }
        else if (jugador.deportes.length === 0) {
            setToastDeportes(true);
        }
        else if (jugador.planillaMedica === "") {
            setToastPlanilla(true);
        }
        else {
            jugadoresDB.post(jugador)
                .then(res => {
                    setToastExito(true);
                })
                .catch(err => {
                    setToastFracaso(true);
                    console.log(err);
            });
        }
    }

    setShowPass(showPass); setShowModal(showModal);

    return (
        <IonPage>
            <IonToast
                isOpen={toastNombre}
                onDidDismiss={() => setToastNombre(false)}
                message="Debe escribir el nombre completo del alumno"
                duration={3500}
            />
            <IonToast
                isOpen={toastDNI}
                onDidDismiss={() => setToastDNI(false)}
                message="Debe escribir el DNI del alumno"
                duration={3500}
            />
            <IonToast
                isOpen={toastFecha}
                onDidDismiss={() => setToastFecha(false)}
                message="Debe seleccionar una fecha de nacimiento"
                duration={3500}
            />
            <IonToast
                isOpen={toastDeportes}
                onDidDismiss={() => setToastDeportes(false)}
                message="Debe seleccionar algun deporte"
                duration={3500}
            />
            <IonToast
                isOpen={toastPlanilla}
                onDidDismiss={() => setToastPlanilla(false)}
                message="Debe tomar o elegir una foto de la planilla medica"
                duration={3500}
            />
            <IonToast
                isOpen={toastExito}
                onDidDismiss={() => setToastExito(false)}
                message="El jugador se ha cargado con exito"
                duration={3500}
            />
            <IonToast
                isOpen={toastFracaso}
                onDidDismiss={() => setToastFracaso(false)}
                message="ERROR al cargar al jugador, intentelo mas tarde."
                duration={3500}
            />
            <IonContent>
                <form>
                    <IonText class='warning'>Es obligatorio completar todos los campos.</IonText>
                    <IonItem>
                        <IonLabel position="floating"><IonText class='label-modal'>Nombres y Apellido</IonText></IonLabel>
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
                        <IonLabel position="floating"><IonText class='label-modal'>Telefono del responsable</IonText></IonLabel>
                        <IonInput onIonInput={guardarTelefono} required type="number" ></IonInput>
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
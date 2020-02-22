import React, { useState } from 'react';
import { IonPage, IonIcon, IonToast, IonContent, IonText, IonItem, IonModal, IonLabel, IonInput, IonButton, IonDatetime, IonSelect, IonSelectOption, IonHeader } from '@ionic/react';
import '../theme/registrarJugador.css';
import { iJugador } from '../interfaces';
import BD from '../BD';
import { camera } from 'ionicons/icons';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { MAX_IMG } from '../interfaces';

const PREFIJO_MOVIL: string = '+549';
const TIPO_MOVIL: string = 'movil';
const TIPO_FIJO: string = 'fijo';

const RegistrarJugador: React.FC = () => {

    const [jugador, setJugador] = useState<iJugador>({ '_id': '', nombre: '', dni: '', categoria: 0, deportes: [], telResponsable: '', fechaNacimiento: '' });
    const [toast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastColor, setToastColor] = useState('danger');
    const [telefono, setTelefono] = useState('');
    const [mostrarPopover, setMostrarPopover] = useState(false);
    const [imagenesParaSubir, setImagenesParaSubir] = useState<FileList | File[]>([]);
    const [tipoTelefono, setTipoTelefono] = useState("");

    function guardarNombre(event: any) {
        let jug: iJugador = {
            '_id': jugador._id,
            nombre: event.target.value,
            dni: jugador.dni,
            categoria: jugador.categoria,
            deportes: jugador.deportes,
            telResponsable: jugador.telResponsable,
            fechaNacimiento: jugador.fechaNacimiento,
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
        }
        setJugador(jug);
    }

    function guardarPlanilla(doc: any) {
        doc._attachments = {};

        for (let i = 0; i < imagenesParaSubir.length; i++) {
            let nombre = new Date().toISOString().replace(/:/gi, '-') + '_' + imagenesParaSubir[i].name; /* evita nombre repetido */

            doc._attachments[nombre] = {
                content_type: imagenesParaSubir[i].type,
                data: imagenesParaSubir[i]
            };
        }

        return doc;
    }

    function todosFormatosCorrectos() {
        let i = 0;
        while ((i < imagenesParaSubir.length) && (imagenesParaSubir[i].type.lastIndexOf('image/') > -1))
            i++;
        return (i === imagenesParaSubir.length);
    }

    function renderVistaPrevia() {
        let respuesta = [];
        const URL = (window.URL || window.webkitURL);

        if (imagenesParaSubir.length > MAX_IMG)
            respuesta.push(<IonItem color="danger" key='no_img'>{`El máximo de imágenes por jugador es ${MAX_IMG}. Eliminá algunas antes de subir otras, o elegí menos imágenes.`}</IonItem>);
        else if (!imagenesParaSubir.length)
            respuesta.push(<IonItem color="light" key='no_img'>No hay imágenes seleccionadas para subir.</IonItem>);
        else
            for (let i = 0; i < imagenesParaSubir.length; i++) {
                if (imagenesParaSubir[i].type.lastIndexOf('image/') > -1) {
                    let url = URL.createObjectURL(imagenesParaSubir[i]); /* let aca, sino no cambia en cada iteracion */
                    respuesta.push(
                        <IonItem color="light" key={i}>
                            {imagenesParaSubir[i].name}
                            <img
                                onLoad={() => { URL.revokeObjectURL(url) }}
                                src={url}
                                alt={imagenesParaSubir[i].name}
                                className="imgVistaPrevia"
                                slot="end"
                            />
                        </IonItem>
                    );
                }
                else
                    respuesta.push(
                        <IonItem className="itemInvalido" color="danger" key={i}>
                            {`${imagenesParaSubir[i].name} tiene un formato no aceptado.`}
                        </IonItem>
                    );
            }

        return respuesta;
    }

    function renderModalImagenes() {
        return (
            <IonModal
                isOpen={mostrarPopover}
            >
                <IonHeader>
                    <IonItem color="light">
                        <IonButton fill="outline"
                            onClick={() => { document.getElementById('inputImagenes')!.click() }}
                        >
                            ELEGIR IMÁGENES
                            </IonButton>
                        <IonButton
                            slot="end"
                            onClick={() => { setMostrarPopover(false); setImagenesParaSubir([]) }}
                            fill="outline"
                        >
                            CERRAR
                            </IonButton>
                        <input
                            type="file"
                            multiple
                            hidden
                            required
                            accept="image/*"
                            id="inputImagenes"
                            onChange={() => {
                                setImagenesParaSubir((document.getElementById('inputImagenes') as HTMLInputElement).files!)
                            }}
                        />
                    </IonItem>
                </IonHeader>
                <IonContent id="vistaPrevia" color="light">
                    {renderVistaPrevia()}
                    <IonItem color="light" hidden={(imagenesParaSubir.length === 0) || !todosFormatosCorrectos()}>
                        <IonButton onClick={() => { setMostrarPopover(false) }} fill="outline">
                            Listo
                    </IonButton>
                    </IonItem>
                </IonContent>
            </IonModal>);
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
            setToastMsg("Debe seleccionar algún deporte");
            setToast(true);
        }
        else if (jugador.telResponsable === "") {
            setToastMsg("Debe ingresar un telefono");
            setToast(true);
        }
        else {
            const tel = Array.from(jugador.telResponsable);
            let doc: any;
            if ((tipoTelefono.localeCompare(TIPO_MOVIL) === 0) && (jugador.telResponsable.indexOf(PREFIJO_MOVIL) === -1)) {
                tel.splice(3, 0, '9');
            }
            let jug: iJugador = {
                '_id': jugador._id,
                nombre: jugador.nombre,
                dni: jugador.dni,
                categoria: jugador.categoria,
                deportes: jugador.deportes,
                telResponsable: tel.join(''),
                fechaNacimiento: jugador.fechaNacimiento,
            }
            doc = guardarPlanilla(jug);
            console.log(doc);
            BD.getJugadoresDB().put(doc)
                .then(res => {
                    setToastColor("success");
                    setToastMsg("El jugador se ha cargado con éxito");
                    setToast(true);
                    
                })
                .catch(err => {
                    setToastColor("danger");
                    setToastMsg("ERROR al cargar al jugador, inténtelo más tarde.");
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
                        <IonDatetime
                            onIonChange={guardarFechaNacimiento}
                            displayFormat="DD/MM/YYYY"
                            pickerFormat="DD/MMM/YYYY"
                            monthShortNames={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}
                            placeholder="Seleccionar fecha"
                            cancelText="Cancelar"
                            doneText="OK"
                        >

                        </IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel><IonText class='label-modal'>Deportes que realiza</IonText></IonLabel>
                        <IonSelect onIonChange={guardarDeportes} multiple={true} cancelText="Cancelar" okText="Aceptar">
                            <IonSelectOption value="2">Fútbol</IonSelectOption>
                            <IonSelectOption value="1">Basket</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Teléfono del responsable</IonLabel>
                        <IonSelect
                            interface='popover'
                            cancelText="Cancelar"
                            placeholder='Tipo'
                            value={tipoTelefono}
                            onIonChange={(event: any) => { setTipoTelefono(event.target.value) }}
                    >
                            <IonSelectOption value={TIPO_FIJO} key={TIPO_FIJO} >Fijo</IonSelectOption>
                            <IonSelectOption value={TIPO_MOVIL} key={TIPO_MOVIL}>Móvil</IonSelectOption>
                        </IonSelect>
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
                        <IonButton style={{ textDecoration: 'none' }} fill="outline" onClick={() => { setMostrarPopover(true) }}>
                            <IonIcon slot="start" icon={camera}></IonIcon>
                            <IonText class='label-modal'> Planilla médica </IonText>
                        </IonButton>
                    </IonItem>
                    {renderModalImagenes()}
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
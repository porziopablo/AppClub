import React, { useState, useEffect } from 'react';
import { IonPage, IonItem, IonLabel, IonContent, IonList, IonButton, IonRadio, IonListHeader, IonRadioGroup, IonToast, IonRefresher, IonRefresherContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import '../theme/usuarios.css';
import { iProfesor } from '../interfaces';
import BD from '../BD';
import { Link } from 'react-router-dom';

const base64 = require('base-64');
const utf8 = require('utf8');

interface UserDetailPageProps extends RouteComponentProps<{
    tipo: string;
}> { }

const Usuarios: React.FC<UserDetailPageProps> = ({ match }) => {

    let tipo = match.params.tipo;

    const [nuevos, setNuevos] = useState(false);
    useEffect(() => {
        if (tipo === "nuevos") {
            setNuevos(true);
        }
    }, [tipo, match]);
    const [usuarios, setUsuarios] = useState<iProfesor[]>([]);
    const [selected, setSelected] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastColor, setToastColor] = useState('danger');

    function actualizarUsuarios() {
        if (tipo === "nuevos") {
            let pendientesRecibidos: iProfesor[] = [];
            const docToProfesor = (doc: any): iProfesor => doc;

            BD.getPendientesDB().find({ selector: { dni: { $gte: null } }, sort: ['dni'] })
                .then((resultado) => {
                    pendientesRecibidos = resultado.docs.map(doc => docToProfesor(doc));
                    setUsuarios(pendientesRecibidos);
                })
                .catch(res => {
                    setToastColor("danger");
                    setToastMsg("ERROR al obtener lista de usuarios pendientes");
                    setToast(true);
                });
        }
        else {
            let usuariosRecibidos: iProfesor[] = [];
            const docToProfesor = (doc: any): iProfesor => doc;

            BD.getUsersDB().find({ selector: { name: { $gte: null } }, sort: ['name'] })
                .then((resultado) => {
                    usuariosRecibidos = resultado.docs.map(doc => docToProfesor(doc));
                    setUsuarios(usuariosRecibidos);
                })
                .catch(res => {
                    setToastColor("danger");
                    setToastMsg("ERROR al obtener lista de usuarios");
                    setToast(true);
                });
        }
    }

    useEffect(() => {
        actualizarUsuarios();// eslint-disable-next-line
    }, [match]);

    function handleSeleccion(event: any) {
        setSelected(event.target.value);
    }

    function handleRechazarPendiente(event: any) {
        if (selected) {
            BD.getPendientesDB().get(selected)
                .then((doc) => {
                    BD.getPendientesDB().remove(doc)
                        .then(res => {
                            setToastColor("success");
                            setToastMsg("Se ha rechazado al usuario pendiente con éxito");
                            setToast(true);
                            actualizarUsuarios();
                        }).catch(res => {
                            setToastColor("danger");
                            setToastMsg("ERROR al rechazar al usuario pendiente");
                            setToast(true);
                        });

            }).catch(function (err: Error) {
                console.log(err);
                setToastColor("danger");
                setToastMsg("ERROR no se encuentra usuario pendiente seleccionado");
                setToast(true);
            });
            setSelected("");
        }
    }

    function handleAceptarPendiente(event: any) {

        if (selected) {
            let aPostear: iProfesor = { '_id': '', nombre: '', dni: '', email: '', pass: '' }
            BD.getPendientesDB().get(selected).then(function (doc: any) {
                aPostear.nombre = doc.nombre;
                aPostear.dni = doc.dni;
                aPostear.email = doc.email;
                aPostear.pass = base64.decode(doc.pass);
                aPostear.pass = utf8.decode(aPostear.pass);
                BD.getProfesoresDB().signUp(aPostear.dni, aPostear.pass, {
                    metadata: {
                        email: aPostear.email,
                        nombre: aPostear.nombre,
                        dni: aPostear.dni,
                    }
                }).then(res => {
                    BD.getPendientesDB().remove(doc);
                    setToastColor("success");
                    setToastMsg("Se ha aceptado al usuario pendiente con éxito");
                    setToast(true);
                    actualizarUsuarios();
                }).catch(error => {
                    console.log(error);
                    setToastColor("danger");
                    if (error.name === "conflict")
                        setToastMsg("ERROR ya existe un usuario con este DNI.");
                    else
                        setToastMsg("ERROR al aceptar al usuario pendiente.");
                    setToast(true);
                });
            }).catch(function (err: Error) {
                console.log(err);
                setToastColor("danger");
                setToastMsg("ERROR no se encuentra usuario pendiente seleccionado");
                setToast(true);
            });
            setSelected("");
            renderUsuariosPendientes();
        } 
    }

    const renderBotones = () => {
        if (nuevos) {
            return (
                <IonLabel class="botonCont">
                    <IonButton onClick={handleAceptarPendiente} color="primary" fill="outline" size="small" slot="end">Aceptar</IonButton>
                    <IonButton onClick={handleRechazarPendiente} color="primary" fill="outline" size="small" slot="end">Rechazar</IonButton>
                </IonLabel>
            );
        }
    }

    const renderUsuariosPendientes = () => {
        return (
            usuarios.map((usuario: iProfesor) => (
                <IonItem key={usuario._id}>
                    <IonLabel>
                        <h2>{usuario.nombre} DNI: {usuario.dni}</h2>
                    </IonLabel>
                        <IonRadio value={usuario._id} onIonSelect={handleSeleccion} />
                </IonItem>
            )));
    }

    const renderUsuarios = () => {
        return (
            usuarios.map((usuario: iProfesor) => (
                <Link to={`/configuracion/${usuario.dni}`} style={{ textDecoration: 'none' }} key={usuario.dni}>
                    <IonItem key={usuario.dni}>
                        <IonLabel>
                            <h2>{usuario.nombre}</h2>
                        </IonLabel>
                    </IonItem>
                </Link>
            )));
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
                <IonRefresher slot="fixed"
                    onIonRefresh={(event) => {
                        actualizarUsuarios();
                        setTimeout(() => { event.detail.complete() }, 500);
                    }}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    <IonRadioGroup>
                        <IonListHeader>
                            <IonLabel>Lista de usuarios {match.params.tipo}</IonLabel>
                        </IonListHeader>
                        {nuevos ? renderUsuariosPendientes() : renderUsuarios() }
                    </IonRadioGroup>
                </IonList>
                <div>
                    {renderBotones()}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Usuarios;
/*UTF8*/
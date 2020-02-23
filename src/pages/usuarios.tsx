import React, { useState, useEffect } from 'react';
import { IonPage, IonItem, IonLabel, IonContent, IonList, IonButton, IonRadio, IonListHeader, IonRadioGroup, IonToast } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import '../theme/usuarios.css';
import { iProfesor } from '../interfaces';
import BD from '../BD';

interface UserDetailPageProps extends RouteComponentProps<{
    tipo: string;
}> { }

const Usuarios: React.FC<UserDetailPageProps> = ({ match }) => {

    const [nuevos, setNuevos] = useState(false);
    const [usuarios, setUsuarios] = useState<iProfesor[]>([]);
    const [selected, setSelected] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastColor, setToastColor] = useState('danger');

    let tipo = match.params.tipo;

    function eliminarDeArray(array: Array<iProfesor>, doc: iProfesor) {
        const index = array.indexOf(doc);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    useEffect(() => {
        if (tipo === "nuevos") {
            setNuevos(true);
        }
        if (nuevos) {
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
    }, [nuevos, tipo, usuarios]);

    function handleSeleccion(event: any) {
        setSelected(event.target.value);
    }

    function handleEliminarUsuario (event: any) {
        if (selected) {
            const doc = usuarios.filter(obj => obj.dni === selected);
            BD.getProfesoresDB().deleteUser(doc[0].dni)
                .then(res => {
                    eliminarDeArray(usuarios, doc[0]);
                    setToastColor("success");
                    setToastMsg("Se ha eliminado al usuario con éxito");
                    setToast(true);
                }).catch(err => {
                    setToastColor("danger");
                    setToastMsg("ERROR al eliminar al usuario");
                    setToast(true);
                });
            setSelected("");
        }
    }

    function handleRechazarPendiente(event: any) {
        if (selected) {
            const doc = usuarios.filter(obj => obj.dni === selected);
            BD.getPendientesDB().get(doc[0].dni).then(function (documento: any) {
                BD.getPendientesDB().remove(documento)
                    .then(res => {
                        eliminarDeArray(usuarios, documento);
                        setToastColor("success");
                        setToastMsg("Se ha rechazado al usuario pendiente con éxito");
                        setToast(true);
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
                console.log(doc);
                aPostear._id = doc._id;
                aPostear.nombre = doc.nombre;
                aPostear.dni = doc.dni;
                aPostear.email = doc.email;
                aPostear.pass = doc.pass;
                BD.getPendientesDB().remove(doc);
                BD.getProfesoresDB().signUp(aPostear.dni, aPostear.pass, {
                    metadata: {
                        email: aPostear.email,
                        nombre: aPostear.nombre,
                        dni: aPostear.dni,
                    }
                }).then(res => {
                    eliminarDeArray(usuarios, aPostear);
                    setToastColor("success");
                    setToastMsg("Se ha aceptado al usuario pendiente con éxito");
                    setToast(true);
                }).catch(res => {
                    setToastColor("danger");
                    setToastMsg("ERROR al aceptar al usuario pendiente");
                    setToast(true);
                });
            }).catch(function (err: Error) {
                console.log(err);
                console.log(err);
                setToastColor("danger");
                setToastMsg("ERROR no se encuentra usuario pendiente seleccionado");
                setToast(true);
            });
            setSelected("");
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
        else {
            return (
                <IonLabel class="botonCont">
                    <IonButton onClick={handleEliminarUsuario} color="primary" fill="outline" size="small" slot="end">Eliminar usuario</IonButton>
                </IonLabel>
            );
        }
    }

    const renderUsuarios = () => {
        return (
            usuarios.map((usuario: iProfesor) => (
                <IonItem key={usuario.dni}>
                    <IonLabel>
                        <h2>{usuario.nombre}</h2>
                    </IonLabel>
                    <IonRadio slot="end" value={usuario.dni} onIonSelect={handleSeleccion} />
                </IonItem>
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
                <IonList>
                    <IonRadioGroup>
                        <IonListHeader>
                            <IonLabel>Lista de usuarios {nuevos ? "nuevos" : "existentes"}</IonLabel>
                        </IonListHeader>
                        {renderUsuarios()}
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
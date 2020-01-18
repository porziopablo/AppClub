import React, { useState, useEffect } from 'react';
import { IonPage, IonItem, IonLabel, IonContent, IonList, IonButton, IonRadio, IonListHeader, IonRadioGroup } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import '../theme/usuarios.css';
import { iProfesor } from '../interfaces';

import PouchDB from 'pouchdb';

const usuariosDB = new PouchDB('http://localhost:5984/usuariosdb');
const pendientesDB = new PouchDB('http://localhost:5984/usuariospendientesdb');

interface UserDetailPageProps extends RouteComponentProps<{
    tipo: string;
}> { }

const Usuarios: React.FC<UserDetailPageProps> = ({ match }) => {

    const [usuarios, setUsuarios] = useState<iProfesor[]>([]);
    const [selected, setSelected] = useState<number>(0);

    let tipo = match.params.tipo;
    let nuevos = false;

    const determinarTipo = () => {
        if (tipo === "nuevos") {
            nuevos = true;
        }
    }

    useEffect(() => {
        determinarTipo();
        if (nuevos) {
            let pendientesRecibidos: iProfesor[] = [];
            const docToProfesor = (doc: any): iProfesor => doc;

            pendientesDB.allDocs({ include_docs: true })
                .then((resultado) => {
                    pendientesRecibidos = resultado.rows.map(row => docToProfesor(row.doc));
                    setUsuarios(pendientesRecibidos);
                })
                .catch(console.log);
        }
        else {
            let usuariosRecibidos: iProfesor[] = [];
            const docToProfesor = (doc: any): iProfesor => doc;

            usuariosDB.allDocs({ include_docs: true })
                .then((resultado) => {
                    usuariosRecibidos = resultado.rows.map(row => docToProfesor(row.doc));
                    setUsuarios(usuariosRecibidos);
                })
                .catch(console.log);
        }
    });

    function handleSeleccion(event: any) {
        setSelected(event.target.value);
    }

    function handleEliminarUsuario (event: any) {
        if (selected) {
            console.log(selected);
            const doc = usuarios.filter(obj => obj.dni === JSON.stringify(selected));
            usuariosDB.get(JSON.stringify(doc[0].dni)).then(function (documento: any) {
                usuariosDB.remove(documento);
            }).catch(function (err: Error) {
                console.log(err);
                //aca habria que ver que pasa si el documento no existe
            });
            setSelected(0);
        }
    }

    function handleRechazarPendiente(event: any) {
        if (selected) {
            const doc = usuarios.filter(obj => obj.dni === JSON.stringify(selected));
            console.log(doc);
            pendientesDB.get(JSON.stringify(doc[0].dni)).then(function (documento: any) {
                pendientesDB.remove(documento);
            }).catch(function (err: Error) {
                console.log(err);
                //aca habria que ver que pasa si el documento no existe
            });
            setSelected(0);
        }
    }

    function handleAceptarPendiente(event: any) {
        if (selected) {
            console.log(selected);
            let aPostear: iProfesor = { '_id': '', nombre: '', dni: '', email: '', pass: '' }
            pendientesDB.get(JSON.stringify(selected)).then(function (doc: any) {
                aPostear._id = doc._id;
                aPostear.nombre = doc.nombre;
                aPostear.dni = doc.dni;
                aPostear.email = doc.email;
                aPostear.pass = doc.pass;
                pendientesDB.remove(doc);
                return usuariosDB.post(aPostear);
            }).catch(function (err: Error) {
                console.log(err);
            });
            setSelected(0);
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
            <IonContent>
                {determinarTipo()}
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
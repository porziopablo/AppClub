import React, { useState, useEffect } from 'react';
import { IonHeader, IonContent, IonLabel, IonPage, IonItem, IonCheckbox, IonList, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { iJugador, iAsistItem, iAsistencia } from '../interfaces';
import BD from '../BD';
import PouchDB from 'pouchdb';
import Find from 'pouchdb-find'
PouchDB.plugin(Find)

const jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');
let categoriaDB!: PouchDB.Database<{}>; 

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const AsistenciaList: React.FC<UserDetailPageProps> = ({ match }) => {

    const [jugadores, setJugadores] = useState<iJugador[]>([]);
    const [presentes, setPresentes] = useState<iAsistItem[]>([]);
    const cat = match.params.id;
    let titulo = "";

    switch (cat) {
        case "1": categoriaDB = BD.getCat1fDB()
            titulo = "1° División femenina"
            break;
        case "2": categoriaDB = BD.getCat1mDB();
            titulo = "1° División masculina"
            break;
        case "3": categoriaDB = BD.getCat5DB();
            titulo = "5° División"
            break;
        case "4": categoriaDB = BD.getCat7DB();
            titulo = "7° División mixta"
            break;
        case "5": categoriaDB = BD.getCat9DB();
            titulo = "9° División mixta"
            break;
        case "6": categoriaDB = BD.getCat11DB();
            titulo = "11° División mixta"
            break;
        case "7": categoriaDB = BD.getCat13DB();
            titulo = "13° División mixta"
            break;
        case "8": categoriaDB = BD.getCat15DB();
            titulo = "15° División mixta"
            break;
    }

    useEffect(() => {
        const docToJugador = (doc: any): iJugador => doc;
        let jugadoresBuscados: iJugador[] = [];

        jugadoresDB.find({
                selector: {
                    categoria: +cat
                }
        }).then((resultado) => {
            jugadoresBuscados = resultado.docs.map(row => docToJugador(row));
            setJugadores(jugadoresBuscados);
        })
            .catch(console.log);
        
    }, [cat]);

    const renderJugadores = () => {
        return (
            jugadores.map((jugador: iJugador) => (
                <IonItem key={jugador.dni}>
                    <IonLabel>
                        <h2>{jugador.nombre}</h2>    
                    </IonLabel>
                    <IonCheckbox value={jugador.dni} onClick={handleCheck} slot="end"></IonCheckbox>
                </IonItem>
            ))
        );
    }

    function handleCheck(event: any) {
        const buscado: iJugador[] = jugadores.filter(obj => obj.dni === event.target.value);
        const existente: iAsistItem[] = presentes.filter(obj => obj.dni === event.target.value);
        let clon = Array.from(presentes);
        if (existente.length === 0) {
            clon.push({ nombre: buscado[0].nombre, dni: buscado[0].dni });
        }
        else {
            clon = clon.filter(function (jug) { return jug.dni !== buscado[0].dni })
        }
        setPresentes(clon);
        console.log(presentes);
    }

    function subirPresentes(event: any) {
        let aPostear: iAsistencia = { '_id': '', presentes: [] };
        const fecha = new Date();
        fecha.setHours(fecha.getHours() - 3);
        aPostear._id = fecha.toISOString().split('T')[0];
        aPostear.presentes = presentes;
        console.log(aPostear._id);
        categoriaDB.post(aPostear);
    }


    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        {titulo}
                        <IonButton slot="end" size="small" onClick={subirPresentes}>Confirmar asistencia</IonButton>
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderJugadores()}
                </IonList>
            </IonContent>
        </IonPage>
    );

};
export default AsistenciaList;
/*UTF8*/
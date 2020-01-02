import React from 'react';
import { IonHeader, IonContent, IonLabel, IonPage, IonItem, IonSelectOption, IonList, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

//  {match.params.id} contiene el id de categoria enviado desde asistencia,
//hay que usarlo cuando se haga la logica de filtrado, para indicar que categoria filtrar
interface iJugador {
    nombre: string,
    dni: string,
    categoria: string,
    deporte: string,
}

interface iOpcion {
    nombre: string,
    value: string,
}

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

const jugadores: iJugador[] = [
    { nombre: 'Ivan Aprea', dni: '12345678', categoria: '1', deporte: 'futbol' },
    { nombre: 'Mariquena Gros', dni: '91011121', categoria: '2', deporte: 'basket' },
    { nombre: 'Martín Casas', dni: '33333333', categoria: '3', deporte: 'futbol' },
    { nombre: 'Pablo Porzio', dni: '44444444', categoria: '4', deporte: 'futbol' },
    { nombre: 'Adolfo Spinelli', dni: '5', categoria: '1', deporte: 'futbol' },
    { nombre: 'Leonel Guccione', dni: '6', categoria: '2', deporte: 'basket' },
    { nombre: '"Bigote" Dematteis', dni: '7', categoria: '3', deporte: 'futbol' },
    { nombre: 'Felipe Evans', dni: '8', categoria: '4', deporte: 'futbol' },
    { nombre: 'Marito Baracus', dni: '9', categoria: '1', deporte: 'futbol' },
    { nombre: 'Benito Mussolinni', dni: '10', categoria: '2', deporte: 'basket' },
];

const categorias: iOpcion[] = [
    { nombre: '1° Femenina', value: '1F' },
    { nombre: '1° Masculina', value: '1M' },
    { nombre: '5°', value: '5' },
    { nombre: '7° Mixta', value: '7' },
    { nombre: '9° Mixta', value: '9' },
    { nombre: '11° Mixta', value: '11' },
    { nombre: '13° Mixta', value: '13' },
    { nombre: '15° Mixta', value: '15' },
]


const asistenciaList: React.FC<UserDetailPageProps> = ({ match }) => {

    const renderJugadores = () => {
        return (
            jugadores.map((jugador: iJugador) => (
                <IonItem key={jugador.dni}>

                    <IonLabel>
                        <h2>{jugador.nombre}</h2>
                        
                    </IonLabel>
                    <IonButton color="success" fill="outline" size="small" slot="end">Presente</IonButton>
                </IonItem>
            )));
    }

    const renderOpciones = (opciones: iOpcion[]) => {
        return (
            opciones.map((opcion: iOpcion) => (
                <IonSelectOption value={opcion.value} key={opcion.value}>{opcion.nombre}</IonSelectOption>
            )));
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        Categoria {match.params.id}
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderJugadores()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default asistenciaList;
/*UTF8*/
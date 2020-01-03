import React from 'react';
import {IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonSearchbar} from '@ionic/react';
import '../theme/listado.css';
import { Link } from 'react-router-dom';

/* SOLO PARA VER COMO QUEDA */

interface iJugador {
    nombre: string,
    dni: string,
    categoria: string,
    deporte: string,
    telResponsable: string,
    fechaNacimiento: Date
}

interface iOpcion {
    nombre: string,
    value: string,
}

const jugadores: iJugador[] = [
    { nombre: 'Ivan Aprea', dni: '12345678', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96,9,19) },
    { nombre: 'Mariquena Gros', dni: '91011121', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Martín Casas', dni: '33333333', categoria: '3', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Pablo Porzio', dni: '44444444', categoria: '4', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Adolfo Spinelli', dni: '5', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Leonel Guccione', dni: '6', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: '"Bigote" Dematteis', dni: '7', categoria: '3', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Felipe Evans', dni: '8', categoria: '4', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Marito Baracus', dni: '9', categoria: '1', deporte: 'futbol', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
    { nombre: 'Benito Mussolinni', dni: '10', categoria: '2', deporte: 'basket', telResponsable: '11', fechaNacimiento: new Date(96, 9, 19) },
];

const deportes: iOpcion[] = [
    { nombre: 'Basket', value: 'basket' },
    { nombre: 'Fútbol', value: 'futbol' },
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


/**************************/

const renderOpciones = (opciones: iOpcion[]) => {
    return (
        opciones.map((opcion: iOpcion) => (
            <IonSelectOption value={opcion.value} key={opcion.value}>{opcion.nombre}</IonSelectOption>
        )));
}

class ListadoFiltrable extends React.Component<{jugadores: iJugador[]}> {
    state = {
        jugadores: [],
        jugadoresMostrados: []
    }

    handleInput = (event: CustomEvent) => {

        const query = (event.target as HTMLTextAreaElement).value;
        const jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => jugador.nombre.toLowerCase().indexOf(query) > -1)

        this.setState({ jugadoresMostrados: jugadoresBuscados });
    }

    componentDidMount = () => {
        this.setState({
            jugadores: this.props.jugadores,
            jugadoresMostrados: this.props.jugadores
        })
    }

    renderJugadores = () => {
        return (
            this.state.jugadoresMostrados.map((jugador: iJugador) => (
                <Link to={`/listado/jugador/${jugador.dni}`} style={{ textDecoration: 'none' }} key={jugador.dni}>
                    <IonItem>
                        <IonLabel>
                            <h2>{jugador.nombre}</h2>
                            <h3 className='datos'>{'DNI: ' + jugador.dni + ' | Categoría: ' + jugador.categoria}</h3>
                        </IonLabel>
                    </IonItem>
                </Link>
            )));
    }

    render() {
        return (
            <div>
                <IonHeader>
                    <IonItem>
                        <IonLabel>Filtros</IonLabel>
                        <IonSelect interface='action-sheet' placeholder='Deporte'>
                            {renderOpciones(deportes)}
                        </IonSelect>
                        <IonSelect interface='action-sheet' placeholder='Categoría'>
                            {renderOpciones(categorias)}
                        </IonSelect>
                    </IonItem>
                    <IonSearchbar onIonInput={this.handleInput} placeholder="Nombre del Jugador" />
                </IonHeader>
                <IonList>
                    {this.renderJugadores()}
                </IonList>
            </div>
        );
    }
}

const Listado: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <ListadoFiltrable jugadores = {jugadores}/>
            </IonContent>
        </IonPage>
    );
};

export default Listado;
/*UTF8*/

/* AGREGAR
   - Posibilidad de deshacer filtro elegido, ver ion-chips
   - Filtros quede flotando?
 */
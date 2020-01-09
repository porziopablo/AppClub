import React from 'react';
import {IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonSearchbar} from '@ionic/react';
import '../theme/listado.css';
import { Link } from 'react-router-dom';
import { iJugador, DEPORTES, CATEGORIAS } from '../interfaces';
import PouchDB from 'pouchdb'; 

interface iOpcion {
    nombre: string,
    valor:  number,
}

const jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');

const deportes: iOpcion[] = [
    { nombre: 'Basket', valor: DEPORTES.basket },
    { nombre: 'Fútbol', valor: DEPORTES.futbol },
];

const categorias: iOpcion[] = [
    { nombre: '1° Femenina',  valor: CATEGORIAS.primeraFemenina },
    { nombre: '1° Masculina', valor: CATEGORIAS.primeraMasculina },
    { nombre: '5°',           valor: CATEGORIAS.quinta },
    { nombre: '7° Mixta',     valor: CATEGORIAS.septima },
    { nombre: '9° Mixta',     valor: CATEGORIAS.novena },
    { nombre: '11° Mixta',    valor: CATEGORIAS.undecima },
    { nombre: '13° Mixta',    valor: CATEGORIAS.decimoTercera },
    { nombre: '15° Mixta',    valor: CATEGORIAS.decimoQuinta },
]

class Listado extends React.Component {

    state = {
        jugadores: [],
        jugadoresMostrados: [],
        deporteMostrado: 0,
    }

    renderOpciones = (opciones: iOpcion[]) => {
        return (
            opciones.map((opcion: iOpcion) => (
                <IonSelectOption value={opcion.valor} key={opcion.valor}>{opcion.nombre}</IonSelectOption>
            )));
    }

    buscarJugador = (event: CustomEvent) => {

        const query = (event.target as HTMLTextAreaElement).value;
        const jugadoresBuscados = this.state.jugadoresMostrados.filter((jugador: iJugador) => jugador.nombre.toLowerCase().indexOf(query) > -1)

        this.setState({ jugadoresMostrados: jugadoresBuscados });
    }

    filtrarPorCategoria = (event: CustomEvent) => {

        const nroCat = parseInt((event.target as HTMLTextAreaElement).value);
        const jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => (jugador.deportes[0] === this.state.deporteMostrado && jugador.categoria === nroCat));

        this.setState({ jugadoresMostrados: jugadoresBuscados });
    }

    filtrarPorDeporte = (event: any) => {

        const deportesBuscados: number[] = event.target.value;

        function cumpleCriterio(jugador: iJugador) {
            let respuesta = true;
            let i = 0;

            if (jugador.deportes.length === deportesBuscados.length) {
                while (respuesta && i < deportesBuscados.length) {
                    respuesta = jugador.deportes.includes(deportesBuscados[i]);
                    i++;
                } 
            }
            else
                respuesta = false;

            return respuesta;
        }

        if (deportesBuscados.length !== 0)         
            if ((deportesBuscados.length === 1) && (deportesBuscados[0] !== DEPORTES.basket)) /* si basket tuviera categorias, borrar 2da parte */
                this.setState({ jugadoresMostrados: this.state.jugadores.filter(cumpleCriterio), deporteMostrado: deportesBuscados[0] });
            else
                this.setState({ jugadoresMostrados: this.state.jugadores.filter(cumpleCriterio), deporteMostrado: 0 });
        else
            this.setState({ jugadoresMostrados: this.state.jugadores, deporteMostrado: 0});
    }

    componentDidMount = () => {

        let jugadoresRecibidos: iJugador[] = []; 
        const docToJugador = (doc: any): iJugador => doc; //ALGUNA FORMA DE EVITAR ESTE 'CASTEO' ?

        jugadoresDB.allDocs({ include_docs: true })
            .then((resultado) => {
                jugadoresRecibidos = resultado.rows.map(row => docToJugador(row.doc));
                this.setState({
                    jugadores: jugadoresRecibidos,
                    jugadoresMostrados: jugadoresRecibidos
                });
            })
            .catch(console.log); // ESTO O QUE TIRE CARTELITO O QUE ?
    }

    renderJugadores = () => {

        const getCategoria = (nroCat: number) => ((nroCat !== 0) ? categorias.find(cat => cat.valor === nroCat)!.nombre : '-' );

        return (
            this.state.jugadoresMostrados.map((jugador: iJugador) => (
                <Link to={`/listado/jugador/${jugador.dni}`} style={{ textDecoration: 'none' }} key={jugador.dni}>
                    <IonItem>
                        <IonLabel>
                            <h2>{jugador.nombre}</h2>
                            <h3 className='datos'>{'DNI: ' + jugador.dni + ' | Categoría: ' + getCategoria(jugador.categoria)}</h3>
                        </IonLabel>
                    </IonItem>
                </Link>
            )));
    }

    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonItem>
                            <IonLabel>Filtros</IonLabel>
                            <IonSelect cancelText = 'CANCELAR' multiple={true} placeholder='Deporte' onIonChange={this.filtrarPorDeporte}>
                                {this.renderOpciones(deportes)}
                            </IonSelect>
                            <IonSelect cancelText='CANCELAR' placeholder='Categoría' disabled={this.state.deporteMostrado === 0} onIonChange={this.filtrarPorCategoria}>
                                {this.renderOpciones(categorias)}
                            </IonSelect>
                        </IonItem>
                        <IonSearchbar onIonInput={this.buscarJugador} placeholder="Nombre del Jugador" />
                    </IonHeader>
                    <IonList>
                        {this.renderJugadores()}
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}

export default Listado;

/* AGREGAR
   - Posibilidad de deshacer filtro elegido, ver ion-chips
 */
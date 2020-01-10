import React from 'react';
import {IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonSearchbar, IonRefresher, IonRefresherContent} from '@ionic/react';
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
    { nombre: 'Sin Filtro',      valor: 0 },
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
        deportesMostrados: [],
        categoriaMostrada: 0,
    }

    renderOpciones = (opciones: iOpcion[]) => {
        return (
            opciones.map((opcion: iOpcion) => (
                <IonSelectOption value={opcion.valor} key={opcion.valor}>{opcion.nombre}</IonSelectOption>
            )));
    }

    buscarJugador = (event: CustomEvent) => {

        const query = (event.target as HTMLTextAreaElement).value;
        let criterioBusqueda: Function;
        let jugadoresBuscados;

        if ((query[0] >= '0') && (query[0] <= '9')) /* busco por DNI */
            criterioBusqueda = (jugador: iJugador): boolean => jugador.dni.toString().indexOf(query) > -1;
        else
            criterioBusqueda = (jugador: iJugador): boolean => jugador.nombre.toLowerCase().indexOf(query) > -1;

        if (this.state.deportesMostrados.length !== 0)
            if (this.state.categoriaMostrada !== 0) /* se filtro por Deporte y Categoria */
                jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => this.criterioDeporte(jugador, this.state.deportesMostrados) && jugador.categoria === this.state.categoriaMostrada && criterioBusqueda(jugador));
            else /* se filtro por Deporte */
                jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => this.criterioDeporte(jugador, this.state.deportesMostrados) && criterioBusqueda(jugador));
        else /* no se aplico ningun filtro */ 
            jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => criterioBusqueda(jugador));

        this.setState({ jugadoresMostrados: jugadoresBuscados });
    }

    filtrarPorCategoria = (event: CustomEvent) => {

        const nroCat = parseInt((event.target as HTMLTextAreaElement).value);
        let jugadoresBuscados = [];

        if (nroCat !== 0) /* filtro por deporte y categoria */
            jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => (this.criterioDeporte(jugador, this.state.deportesMostrados) && jugador.categoria === nroCat));
        else /* filtro solo por deporte */
            jugadoresBuscados = this.state.jugadores.filter((jugador: iJugador) => this.criterioDeporte(jugador, this.state.deportesMostrados));

        this.setState({ jugadoresMostrados: jugadoresBuscados, categoriaMostrada: nroCat });
    }

    criterioDeporte = (jugador: iJugador, deportesBuscados: number[]) => {
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

    filtrarPorDeporte = (event: any) => {

        const deportesBuscados: number[] = event.target.value;

        if (deportesBuscados.length !== 0)
            this.setState({ jugadoresMostrados: this.state.jugadores.filter((jugador: iJugador) => this.criterioDeporte(jugador, deportesBuscados)), deportesMostrados: deportesBuscados });
        else
            this.setState({ jugadoresMostrados: this.state.jugadores, deportesMostrados: [] });
    }

    actualizaLista = (event: CustomEvent) => {

        let jugadoresRecibidos: iJugador[] = [];
        const docToJugador = (doc: any): iJugador => doc; //ALGUNA FORMA DE EVITAR ESTE 'CASTEO' ?

        jugadoresDB.allDocs({ include_docs: true })
            .then((resultado) => {
                jugadoresRecibidos = resultado.rows.map(row => docToJugador(row.doc));
                this.setState({
                    jugadores: jugadoresRecibidos,
                    jugadoresMostrados: jugadoresRecibidos
                });
                setTimeout(() => { event.detail.complete() }, 500); /* para que dure un poco mas la animacion */
            })
            .catch(console.log); // ESTO O QUE TIRE CARTELITO O QUE ?
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

        //const getCategoria = (nroCat: number) => ((nroCat !== 0) ? categorias.find(cat => cat.valor === nroCat)!.nombre : '-' );

        return (
            this.state.jugadoresMostrados.map((jugador: iJugador) => (
                <Link to={`/listado/jugador/${jugador.dni}`} style={{ textDecoration: 'none' }} key={jugador.dni}>
                    <IonItem>
                        <IonLabel>
                            <h2>{jugador.nombre}</h2>
                            <h3 className='datos'>{'DNI: ' + jugador.dni}</h3>
                        </IonLabel>
                    </IonItem>
                </Link>
            )));
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonItem id="filtros">
                        <IonLabel>Filtros</IonLabel>
                        <IonSelect cancelText="Cancelar" multiple={true} placeholder='Deporte' onIonChange={this.filtrarPorDeporte}>
                            {this.renderOpciones(deportes)}
                        </IonSelect>
                        <IonSelect cancelText="Cancelar" placeholder='Categoría' disabled={this.state.deportesMostrados.length !== 1 || this.state.deportesMostrados[0] !== DEPORTES.futbol} onIonChange={this.filtrarPorCategoria}>
                            {this.renderOpciones(categorias)}
                        </IonSelect>
                    </IonItem>
                    <IonSearchbar onIonInput={this.buscarJugador} placeholder="Nombre o DNI del Jugador" />
                </IonHeader>
                <IonContent id = "contenido">
                    <IonRefresher slot="fixed" onIonRefresh={this.actualizaLista}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
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
import React from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonHeader, IonSearchbar, IonRefresher, IonRefresherContent, IonToast } from '@ionic/react';
import '../theme/listado.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { iJugador, DEPORTES, CATEGORIAS, NOMBRE_DEPORTES, NOMBRE_CAT_FUTBOL } from '../interfaces';
import BD from '../BD';

interface iOpcion {
    nombre: string,
    valor: number,
}

interface iState {
    jugadores: iJugador[],
    jugadoresMostrados: iJugador[],
    deportesMostrados: number[],
    categoriaMostrada: number,
    toastParams: {
        mostrar: boolean,
        mensaje: string
    },
    actualizaListado: boolean
}

const deportes: iOpcion[] = [
    { nombre: NOMBRE_DEPORTES[DEPORTES.basket], valor: DEPORTES.basket },
    { nombre: NOMBRE_DEPORTES[DEPORTES.futbol], valor: DEPORTES.futbol },
];

const categorias: iOpcion[] = [
    { nombre: 'Sin Filtro', valor: 0 },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.primeraFemenina], valor: CATEGORIAS.primeraFemenina },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.primeraMasculina], valor: CATEGORIAS.primeraMasculina },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.quinta], valor: CATEGORIAS.quinta },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.septima], valor: CATEGORIAS.septima },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.novena], valor: CATEGORIAS.novena },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.undecima], valor: CATEGORIAS.undecima },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.decimoTercera], valor: CATEGORIAS.decimoTercera },
    { nombre: NOMBRE_CAT_FUTBOL[CATEGORIAS.decimoQuinta], valor: CATEGORIAS.decimoQuinta },
]

class Listado extends React.Component<RouteComponentProps<{}>> {

    state: iState = {
        jugadores: [],
        jugadoresMostrados: [],
        deportesMostrados: [],
        categoriaMostrada: 0,
        toastParams: {
            mostrar: false,
            mensaje: ""
        },
        actualizaListado: false
    }

    renderOpciones = (opciones: iOpcion[]) => (

        opciones.map((opcion: iOpcion) => (
            <IonSelectOption value={opcion.valor} key={opcion.valor}>{opcion.nombre}</IonSelectOption>
        ))
    );

    buscarJugador = (event: CustomEvent) => {

        const query = (event.target as HTMLTextAreaElement).value.toLowerCase();
        let criterioBusqueda: Function;
        let jugadoresBuscados;

        if ((query[0] >= '0') && (query[0] <= '9')) /* busco por DNI */
            criterioBusqueda = (jugador: iJugador): boolean => jugador.dni.indexOf(query) > -1;
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
        const docToJugador = (doc: any): iJugador => doc;

        BD.getJugadoresDB().find({ selector: { nombre: { $gte: null } }, sort: ['nombre'] })
            .then((resultado) => {
                jugadoresRecibidos = resultado.docs.map(doc => docToJugador(doc));
                this.setState({ jugadores: jugadoresRecibidos, jugadoresMostrados: jugadoresRecibidos });
                setTimeout(() => { event.detail.complete() }, 500); /* para que dure un poco mas la animacion */
            })
            .catch(() => {
                this.setState({ toastParams: { mostrar: true, mensaje: "No se pudo descargar la lista de jugadores." } });
                setTimeout(() => { event.detail.complete() }, 500);
            });
    }

    actualizarJugadores = () => {

        let jugadoresRecibidos: iJugador[] = [];
        const docToJugador = (doc: any): iJugador => doc;

        BD.getJugadoresDB().find({ selector: { nombre: { $gte: null } }, sort: ['nombre'] })
            .then((resultado) => {
                jugadoresRecibidos = resultado.docs.map(doc => docToJugador(doc));
                this.setState({ jugadores: jugadoresRecibidos, jugadoresMostrados: jugadoresRecibidos });
            })
            .catch(() => { this.setState({ toastParams: { mostrar: true, mensaje: "No se pudo descargar la lista de jugadores." } }) });
    }

    componentDidMount = () => {

        this.actualizarJugadores();
    }

    componentDidUpdate = (prevProps: any) => {

        if (prevProps.location.pathname !== this.props.location.pathname)
            this.actualizarJugadores();
    }

    renderJugadores = () => (

        this.state.jugadoresMostrados.map((jugador: iJugador) => (
            <Link to={`/listado/jugador/${jugador.dni}`} style={{ textDecoration: 'none' }} key={jugador.dni}>
                <IonItem>
                    <IonLabel>
                        <h2>{jugador.nombre}</h2>
                        <h3 className='datos'>{'DNI: ' + jugador.dni}</h3>
                    </IonLabel>
                </IonItem>
            </Link>
        ))
    );

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
                <IonContent id="contenido">
                    <IonToast
                        isOpen={this.state.toastParams.mostrar}
                        onDidDismiss={() => this.setState({ toastParams: { mostrar: false } })}
                        message={this.state.toastParams.mensaje}
                        color="danger"
                        showCloseButton={true}
                        closeButtonText="CERRAR"
                    />
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
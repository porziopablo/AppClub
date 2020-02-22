import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonIcon, IonLabel, IonItem, IonText, IonGrid, IonRow, IonCol, IonButton, IonAlert, IonToast } from "@ionic/react";
import { RouteComponentProps, withRouter } from 'react-router';
import {cog, medical, informationCircle } from 'ionicons/icons';
import { iProfesor } from '../interfaces';
import BD from '../BD';

interface iPagina {
    titulo: string;
    ruta: string;
    icono: any;
}

interface iState {
    usuarioActual: iProfesor,
    paginas: iPagina[],
    mostrarAlerta: boolean,
    toastParams: {
        mostrar: boolean,
        mensaje: string,
    }
}

const paginas: iPagina[] = [
    { titulo: 'Emergencia', ruta: '/emergencia', icono: medical },
    { titulo: 'Configuración', ruta: '/configuracion', icono: cog },
    { titulo: 'Acerca de esta App', ruta: '/about', icono: informationCircle }
];

const usuarioPorDefecto: iProfesor = {
    _id: "0",
    nombre: "",
    dni: "0",
    email: "",
    pass: ""
}

class SideMenu extends React.Component<RouteComponentProps<{}>> {

    state: iState = {
        usuarioActual: usuarioPorDefecto,
        paginas: paginas,
        mostrarAlerta: false,
        toastParams: {
            mostrar: false,
            mensaje: ""
        }
    }

    componentDidMount = async () => {

        try {
            const respuesta = await BD.getProfesoresDB().getSession();
            if (respuesta.userCtx.name) { // Si se asegura llegar a esta vista logueado, entonces el if sobra
                const usuarioActual = await BD.getProfesoresDB().getUser(respuesta.userCtx.name);
                this.setState({ usuarioActual: usuarioActual })
            }
        }
        catch (error) {
            this.setState({
                toastParams: {
                    mostrar: true,
                    mensaje: "No se pudo descargar el usuario actual."
                }
            })
        }
    }

    renderMenuItems = () => (

        this.state.paginas.map((page: iPagina) => (
            <IonMenuToggle key={page.titulo} auto-hide="false">
                <IonItem button
                    color={(window.location.pathname === page.ruta) ? 'primary' : ''}
                    onClick={() => this.props.history.push(page.ruta)}>
                    <IonIcon slot="start" icon={page.icono}></IonIcon>
                    <IonLabel>{page.titulo}</IonLabel>
                </IonItem>
            </IonMenuToggle>
        ))
    )

    cerrarSesion = async () => {

        try {
            await BD.getProfesoresDB().logOut();
            this.setState({ usuarioActual: usuarioPorDefecto });
            window.location.href = '/logIn';
        }
        catch (error) {
            this.setState({
                toastParams: {
                    mostrar: true,
                    mensaje: "No se pudo cerrar la sesión."
                }
            })
        }
    }

    render() {
        return (
            <IonMenu type="overlay" contentId="main">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Menú
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent class="SideMenu">
                    <IonToast
                        isOpen={this.state.toastParams.mostrar}
                        onDidDismiss={() => this.setState({ toastParams: { mostrar: false } })}
                        message={this.state.toastParams.mensaje}
                        color="danger"
                        showCloseButton={true}
                        closeButtonText="CERRAR"
                    />
                    <IonItem>
                        <IonText>
                            <h4>{this.state.usuarioActual.nombre}</h4>
                            {this.state.usuarioActual.email}
                        </IonText>
                    </IonItem>
                    <IonList>
                        {this.renderMenuItems()}
                    </IonList>
                    <IonGrid>
                        <IonRow align-content-center>
                            <IonCol>
                                <IonButton fill="outline" onClick={() => { this.setState({mostrarAlerta: true}) }}>
                                    Cerrar Sesión
                                </IonButton>
                                <IonAlert
                                    isOpen={this.state.mostrarAlerta}
                                    onDidDismiss={() => { this.setState({ mostrarAlerta: false }) }}
                                    header={'¿Realmente querés cerrar sesión?'}
                                    buttons={['Cancelar', { text: 'Cerrar Sesión', handler: this.cerrarSesion }]}
                                />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonMenu>
            )
    }
    
}

export default withRouter(
    SideMenu
);
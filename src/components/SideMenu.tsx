import React, { useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonIcon, IonLabel, IonItem, IonGrid, IonRow, IonCol, IonButton, IonText, IonAlert } from "@ionic/react";
import { RouteComponentProps, withRouter } from 'react-router';
import {cog, medical, informationCircle } from 'ionicons/icons';

interface Page {
    title: string;
    path: string;
    icon: any;
}

const pages: Page[] = [
    { title: 'Emergencias', path: '/emergencia', icon: medical },
    { title: 'Configuración', path: '/configuracion', icon: cog },
    { title: 'Acerca de esta App', path: '/about', icon: informationCircle }
];

type Props = RouteComponentProps<{}>;

const SideMenu = ({ history }: Props) => {
    const [activePage, setActivePage] = useState(pages[0].title);

    const renderMenuItems = () => {
        return pages.map((page: Page) => (
            <IonMenuToggle key={page.title} auto-hide="false">
                <IonItem button
                    color={page.title === activePage ? 'primary' : ''}
                    onClick={() => navigateToPage(page)}>
                    <IonIcon slot="start" icon={page.icon}></IonIcon>
                    <IonLabel>
                        {page.title}
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        ));
    }

    const navigateToPage = (page: Page) => {
        history.push(page.path);
        setActivePage(page.title);
    }

    const usuarioActivo = () => {
        return (
            <IonItem class = "usuarioActivo" >
                <IonText>
                    <h4>Nombre Usuario</h4>
                    email@email.com
                </IonText>
            </IonItem>
            );
    }

    const BotonCerrarSesion: React.FC = () => {

        const [showAlert, setShowAlert] = useState(false);

        return (
            <IonGrid>
                <IonRow align-content-center>
                    <IonCol>
                        <IonButton fill="outline" onClick={() => { setShowAlert(true) }}>
                            Cerrar Sesión
                        </IonButton>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={'¿Estás seguro que quieres cerrar sesión?'}
                            buttons={['Cancelar', 'Cerrar Sesión']}
                        />
                    </IonCol>
                </IonRow> 
            </IonGrid>

            );
    }

    return (
        <IonMenu type="overlay" contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="SideMenu">
                {usuarioActivo()}
                <IonList>
                    {renderMenuItems()}
                </IonList>
                <BotonCerrarSesion/>
            </IonContent>
        </IonMenu>
    );
}

export default withRouter(
    SideMenu
);

/*
 * ARREGLAR 
 * 
 * cuando esta seleccionada una tab no deberia quedar azul ninguna opcion del menu, y viceversa
 * 
 */
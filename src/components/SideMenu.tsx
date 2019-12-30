
import React, { useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonIcon, IonLabel, IonItem } from "@ionic/react";
import { RouteComponentProps, withRouter } from 'react-router';
import {cog, medical, informationCircle } from 'ionicons/icons';

interface Page {
    title: string;
    path: string;
    icon: any;
}

const pages: Page[] = [
    { title: 'Emergencia', path: '/emergencia', icon: medical },
    { title: 'Configuracion', path: '/configuracion', icon: cog },
    { title: 'Acerca de esta App', path: '/about', icon: informationCircle }
];

type Props = RouteComponentProps<{}>;

const SideMenu = ({ history }: Props) => {
    const [activePage, setActivePage] = useState(pages[0].title);

    const renderMenuItems = () => {
        return pages.map((page: Page) => (
            <IonMenuToggle key={page.title} auto-hide="false">
                <IonItem button 
                    color={(window.location.pathname === page.path) ? 'primary' : ''}
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

    return (
        <IonMenu type="overlay" contentId="main" >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="SideMenu">
                <IonList>
                    {renderMenuItems()}
                </IonList>
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
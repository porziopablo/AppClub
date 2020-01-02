import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { checkbox, logoUsd, people } from 'ionicons/icons';

/* vistas de la app */

import Home from './pages/home';
import Cobros from './pages/cobros';
import Asistencia from './pages/asistencia';
import Jugadores from './pages/jugadores';
import Emergencia from './pages/emergencia';
import Listado from './pages/listado';
import Jugador from './pages/jugador';
import Configuracion from './pages/configuracion';
import LogIn from './pages/logIn';
import OpcionesAdmin from './pages/opcionesAdmin';
import Peticiones from './pages/peticiones';
import SignUp from './pages/signUp';
import Usuarios from './pages/usuarios';
import About from './pages/about';
import Historial from './pages/historialCobros';
import asistenciaCat from './pages/asistenciaCategoria';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SideMenu from './components/SideMenu';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <SideMenu/>
    <IonHeader>
        <IonToolbar> Club Dos de Mayo 
            <IonButtons slot="start">
                <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader> 
    <IonTabs>
        <IonRouterOutlet id = "main">
            <Route path="/jugadores" component={Jugadores} exact={true} />
            <Route path="/cobros" component={Cobros} exact={true} />
            <Route path="/Asistencia" component={Asistencia} exact={true}/>
            <Route path="/home" component={Home} exact={true}/>
            <Route path="/" component={Home} exact={true} />
            <Route path="/emergencia" component={Emergencia} exact={true} />
            <Route path="/listado" component={Listado} exact={true} />
            <Route path="/listado/jugador/:dni" component={Jugador} />
            <Route path="/configuracion" component={Configuracion} exact={true} />
            <Route path="/logIn" component={LogIn} exact={true} />
            <Route path="/peticiones" component={Peticiones} exact={true} />
            <Route path="/signUp" component={SignUp} exact={true} />
            <Route path="/opcionesAdmin" component={OpcionesAdmin} exact={true} />
            <Route path="/usuarios" component={Usuarios} exact={true} />
            <Route path="/about" component={About} exact={true} />
            <Route path="/historial" component={Historial} exact={true} />
            <Route path="/asistenciaCat" component={asistenciaCat} exact={true} />
        </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="jugadores" href="/jugadores" selected={(window.location.pathname === "/jugadores") ?  true : false}>
                        <IonIcon icon={people} />
                        <IonLabel>Jugadores</IonLabel>
            </IonTabButton>
                    <IonTabButton tab="Cobros" href="/cobros" selected={(window.location.pathname === "/cobros") ? true : false}>
                        <IonIcon icon={logoUsd} />
                        <IonLabel>Cobros</IonLabel>
            </IonTabButton>
                    <IonTabButton tab="Asistencia" href="/asistencia" selected={(window.location.pathname === "/asistencia") ? true : false}>
                        <IonIcon icon={checkbox} />
                        <IonLabel>Asistencia</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

/*UTF8*/
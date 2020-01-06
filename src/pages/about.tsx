import React from 'react';
import { IonPage, IonContent, IonItem } from '@ionic/react';
import logoClub from '../images/logoclub.jpg'
import '../theme/about.css';

const About: React.FC = () => {

    return (
        <IonPage id="about-page">
            <IonContent>
                <h2 id='titulo'> Aplicacion administrativa <br /> Club 2 de Mayo </h2>
                <img id='logoClub' src={logoClub} alt="Logo del club" />
                <h4 id='version'> Version 1.0 </h4>
                <div id='about'>
                    <IonItem> Esta aplicacion ha sido desarrollada por Ivan Aprea, Martin Casas, Mariquena Gros y Pablo Porzio, como Practica Profesional
                        Supervisada de la carrera Ingenieria Informatica dictada en la Facultad de Ingenieria de la UNMDP. Proyecto a cargo de Natalia Bartels y Felipe Evans.
                    </IonItem>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default About;
/*UTF8*/
import {
    IonPage,
    IonContent,
    IonButton,
    IonItem,
    IonHeader,
    IonList
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface iFecha {
    day: number,
    month: number,
    year: number,
    id: string
}

interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> { }

// el id corresponde al id de la bd
const fechas: iFecha[] = [
    { day: 24, month: 7, year: 2020, id: "aa" },
    { day: 2, month: 3, year: 2020, id: "bb" }
];

const AsistenciaHistF: React.FC<UserDetailPageProps> = ({ match }) => {

    const renderFechas = () => {
        return (
            fechas.map((fecha: iFecha) => (
                <IonButton key={fecha.day} expand="full" href={`/asistenciaHistJ/${fecha.id}`}><h6>{fecha.day}/{fecha.month}/{fecha.year}</h6></IonButton>
            )));
    }
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        Fechas de la categoria {match.params.id}
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderFechas()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default AsistenciaHistF;
/*UTF8*/

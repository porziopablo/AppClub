﻿import React from 'react';
import { IonHeader, IonItem, IonList, IonLabel, IonPage, IonContent } from '@ionic/react';

interface iProfesor {
    nombre: string,
    dni: string,
    email: string,
    pass: string,
}

interface iFecha {
    day: number,
    month: number,
    year: number,
    id: string
}

interface iCobro {
    fecha: iFecha,
    profesor: iProfesor,
    monto: number,
}

const profesores: iProfesor[] = [
    { nombre: 'Juancito', dni: '12345678', email: 'abc@gmail.com', pass: '1234' },
    { nombre: 'Martincito', dni: '91011121', email: 'def@gmail.com', pass: '1234' }
];


const fechas: iFecha[] = [
    { day: 24, month: 7, year: 2020, id: "aa" },
    { day: 2, month: 3, year: 2020, id: "bb" }
];

const cobros: iCobro[] = [
    { fecha: fechas[0], profesor: profesores[0], monto: 5120 },
    { fecha: fechas[1], profesor: profesores[1], monto: 8000 }
];


const Historial: React.FC = () => {

    const renderCobros = () => {
        return (
            cobros.map((cobro: iCobro) => (
                <IonItem key={cobro.fecha.day}>
                    <IonLabel>
                        <h2>{cobro.fecha.day}/{cobro.fecha.month}/{cobro.fecha.year}</h2>
                    </IonLabel>
                    <IonLabel>
                        <h2>{cobro.profesor.nombre}</h2>
                    </IonLabel>
                    <IonLabel >
                        <h2> <b>${cobro.monto}</b> </h2>
                    </IonLabel>
                </IonItem>
            )));
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        <b> Historial de cobros </b>
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderCobros()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Historial;
/*UTF8*/
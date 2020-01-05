import React from 'react';
import '../theme/jugadores.css';
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

interface iPago {
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

const pagos: iPago[] = [
    { fecha: fechas[1], profesor: profesores[1], monto: 100 },
    { fecha: fechas[0], profesor: profesores[0], monto: 200 }
];


const pagosJugador: React.FC = () => {

    const renderPagos = () => {
        return (
            pagos.map((pago: iPago) => (
                <IonItem key={pago.fecha.day}>
                    <IonLabel>
                        {pago.fecha.day}/{pago.fecha.month}/{pago.fecha.year}
                    </IonLabel>
                    <IonLabel>
                        <b>${pago.monto}</b> 
                    </IonLabel>
                    <IonLabel>
                        cobrado por {pago.profesor.nombre}
                    </IonLabel>
                </IonItem>
            )));
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        <b> Pagos realizados </b>
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderPagos()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default pagosJugador;
/*UTF8*/

import React, { useState, useEffect } from 'react';
import '../theme/jugadores.css';
import { IonHeader, IonItem, IonList, IonLabel, IonPage, IonContent } from '@ionic/react';
import { iPago } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import BD from '../BD';

interface UserDetailPageProps extends RouteComponentProps<{
    dni: string;
}> { }

const PagosJugador: React.FC<UserDetailPageProps> = ({ match }) => {

    const [pagos, setPagos] = useState<iPago[]>([]);
    const dniJugador: string = match.params.dni;

    useEffect(() => {
        const docToPago = (doc: any): iPago => doc;
        
        let pagosBuscados: iPago[] = [];

        BD.getPagosDB().find({
            selector: {
                dniJugador: dniJugador
            }
        }).then((resultado) => {
            pagosBuscados = resultado.docs.map(row => docToPago(row));
            setPagos(pagosBuscados);
        })
            .catch(console.log);
    }, []);

     const renderPagos = () => {
        return (
            pagos.map((pago: iPago) => (
                <IonItem key={pago.fecha}>
                    <IonLabel>
                        {(pago.fecha).split('T')[0]}
                    </IonLabel>
                    <IonLabel>
                        <b>${pago.monto}</b> 
                    </IonLabel>
                    <IonLabel>
                        cobrado por {pago.nombreProfesor}
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

export default PagosJugador;
/*UTF8*/

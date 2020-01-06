import React from 'react';
import { IonHeader, IonPage, IonItem, IonLabel, IonContent, IonList, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import '../theme/usuarios.css';

interface UserDetailPageProps extends RouteComponentProps<{
    tipo: string;
}> { }

interface iProfesor {
    nombre: string,
    dni: string,
    email: string,
    pass: string,
}

const profesores: iProfesor[] = [
    { nombre: 'Juancito', dni: '12345678', email: 'abc@gmail.com', pass: '1234' },
    { nombre: 'Martincito', dni: '91011121', email: 'def@gmail.com', pass: '1234' }
];


const Usuarios: React.FC<UserDetailPageProps> = ({ match }) => {

    let tipo = match.params.tipo;
    let nuevos = false;

    const determinarTipo = () => {
        if (tipo === "nuevos") {
            nuevos = true;
        }
    }

    const renderProfesores = () => {
        return (
            profesores.map((profesor: iProfesor) => (
                <IonItem key={profesor.dni}>
                    <IonLabel>
                        <h2>{profesor.nombre} {profesor.email}</h2>
                    </IonLabel>
                </IonItem>
            )));
    }

    const renderBotones = () => {
        if (nuevos) {
            return (
                <IonLabel class="botonCont">
                    <IonButton color="primary" fill="outline" size="small" slot="end">Aceptar</IonButton>
                    <IonButton color="primary" fill="outline" size="small" slot="end">Rechazar</IonButton>
                </IonLabel>
            );
        }
        else {
            return (
                <IonLabel class="botonCont">
                    <IonButton color="primary" fill="outline" size="small" slot="end">Eliminar usuario</IonButton>
                </IonLabel>
            );
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonItem>
                        {determinarTipo()}
                        Lista de usuarios {nuevos ? "nuevos" : "existentes"}
                    </IonItem>
                </IonHeader>
                <IonList>
                    {renderProfesores()}
                </IonList>
                <div>
                    {renderBotones()}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Usuarios;
/*UTF8*/
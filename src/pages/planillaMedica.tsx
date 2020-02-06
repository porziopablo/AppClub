import React from 'react';
import { IonPage, IonContent, IonSlides, IonSlide } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import BD from '../BD';

interface iState {
    urls: string[]
}

type tipoProps = RouteComponentProps<{ dni: string }>;

class PlanillaMedica extends React.Component<tipoProps> {

    state: iState; 

    constructor(props: tipoProps) {
        super(props);
        this.state = {
            urls: []
        } 
    }

    componentDidMount = async () => {

        const urls = [];

        try {
            const doc = await BD.getJugadoresDB().get(this.props.match.params.dni);

            for (let nombreImagen in doc._attachments)
                urls.push((URL || webkitURL).createObjectURL(
                    await BD.getJugadoresDB().getAttachment(this.props.match.params.dni, nombreImagen)
                ));

            this.setState({ urls: urls });
        }
        catch (error) {
            console.log(error);
        }
    }

    renderSlides = () => (
        this.state.urls.map((url: string, indice: number) => (
            <IonSlide key={indice}>
                <img onLoad={() => { (URL || webkitURL).revokeObjectURL(url) }} src={url} alt={`imagen_${indice}`} />
            </IonSlide>
        ))
    )

    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonSlides>
                        {this.renderSlides()}
                    </IonSlides>
                </IonContent>
            </IonPage>
        )
    }
}

export default PlanillaMedica;


/*
 - xq /listado/jugador/planillaMedica tira error ?
 - mostra fotos de db
 - subir fotos 
 - boton para volver al perfil del jugador
 - toast errores
 */
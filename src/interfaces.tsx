export const regNombre = /^[A-Za-zÀ-ÖØ-öø-ÿ]+( [A-Za-zÀ-ÖØ-öø-ÿ']+)*$/;
export const regDni = /^[MF1-9]?([1-9]+)*$/
export const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const maxNumDni = 8;

export enum CATEGORIAS {
    primeraFemenina = 1,
    primeraMasculina,
    quinta,
    septima,
    novena,
    undecima,
    decimoTercera,
    decimoQuinta
}

export enum DEPORTES {
    basket = 1,
    futbol
}

export interface iProfesor {
    '_id': string,
    nombre: string,
    dni: string, /* ID */
    email: string,
    pass: string,
}

export interface iJugador {
    '_id': string,
    nombre: string,
    dni: string, /* ID */
    categoria: number,
    deportes: number[],
    telResponsable: string,
    fechaNacimiento: string, /* ISO-8601 string */
    planillaMedica: string, /* ruta */
}

export interface iPago {
    '_id': string,
    fecha: string, /* ISO-8601 string */
    dniProfesor: string,
    monto: number,
    dniJugador: string,
}

export interface iBalance {
    '_id': string,
    fecha: string, /* ISO-8601 string */
    total: number
}

export interface iAsistItem {
    nombre: string,
    dni: string
}

export interface iAsistencia {
    '_id': string, /* ISO-8601 string */
    presentes: iAsistItem[]
}

export const NOMBRE_DEPORTES: string[] = ['','Basket', 'Fútbol']; /* [0] === '' para que el resto coincida con ENUMS */

export const NOMBRE_CAT_FUTBOL: string[] = ['','1° Femenina', '1° Masculina', '5°', '7° Mixta', '9° Mixta', '11° Mixta', '13° Mixta', '15° Mixta'];

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
    dni: number, /* ID */
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

export interface iAsistencia {
    '_id': string,
    categoria: string,
    fecha: string, /* ISO-8601 string */
    dniJugadoresPresentes: string[]
}

export const NOMBRE_DEPORTES: string[] = ['','Basket', 'Fútbol']; /* [0] === '' para que el resto coincida con ENUMS */

export const NOMBRE_CAT_FUTBOL: string[] = ['','1° Femenina', '1° Masculina', '5°', '7° Mixta', '9° Mixta', '11° Mixta', '13° Mixta', '15° Mixta'];

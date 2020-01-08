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
    dni: number, /* ID */
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
    planillaMedica: string /* ruta */
}

export interface iPago {
    '_id': string,
    fecha: string, /* ISO-8601 string */
    dniProfesor: number,
    monto: number,
    dniJugador: number,
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
    dniJugadoresPresentes: number[]
}
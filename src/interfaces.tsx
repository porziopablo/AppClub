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
    categoria: CATEGORIAS,
    deporte: DEPORTES[],
    telResponsable: string,
    fechaNacimiento: Date,
    planillaMedica: string /* ruta */
}

export interface iPago {
    '_id': string,
    fecha: Date,
    profesor: iProfesor,
    monto: number,
    jugador: iJugador,
}

export interface iBalance {
    '_id': string,
    fecha: Date,
    total: number
}

export interface iAsistencia {
    '_id': string,
    categoria: CATEGORIAS,
    fecha: Date,
    jugadoresPresentes: iJugador[]
}
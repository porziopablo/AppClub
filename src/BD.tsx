import PouchDB from 'pouchdb'; 
PouchDB.plugin(require('pouchdb-upsert'));

class BaseDatos {

    private static instance: BaseDatos;
    private jugadoresDB!: PouchDB.Database<{}>;

    constructor() {


        if (!BaseDatos.instance) {

            /* creacion de cada bd */

            this.jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');
            BaseDatos.instance = this;
        }

        return BaseDatos.instance;
    }

    /* getters para las diferentes bd */

    getJugadoresDB() {

        return this.jugadoresDB;
    }

}

const BD = new BaseDatos();
Object.freeze(BD);

export default BD;
import PouchDB from 'pouchdb'; 
import Find from 'pouchdb-find';
PouchDB.plugin(Find);
PouchDB.plugin(require('pouchdb-upsert'));

class BaseDatos {

    private static instance: BaseDatos;
    private jugadoresDB!: PouchDB.Database<{}>;
    private profesoresDB!: PouchDB.Database<{}>;

    constructor() {


        if (!BaseDatos.instance) {

            /* creacion de cada bd */

            this.jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');
            this.profesoresDB = new PouchDB('http://localhost:5984/profesoresdb');
            BaseDatos.instance = this;
        }

        return BaseDatos.instance;
    }

    /* getters para las diferentes bd */

    getJugadoresDB() {

        return this.jugadoresDB;
    }

    getProfesoresDB() {


        return this.profesoresDB;
    }
}

const BD = new BaseDatos();
Object.freeze(BD);

export default BD;
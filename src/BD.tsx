import PouchDB from 'pouchdb'; 
import Find from 'pouchdb-find';
PouchDB.plugin(Find);
PouchDB.plugin(require('pouchdb-upsert'));

class BaseDatos {

    private static instance: BaseDatos;
    private jugadoresDB!: PouchDB.Database<{}>;
    private profesoresDB!: PouchDB.Database<{}>;
    private pagosDB!: PouchDB.Database<{}>;

    constructor() {

        if (!BaseDatos.instance) {

            /* creacion de cada bd */

            this.jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');
            this.profesoresDB = new PouchDB('http://localhost:5984/profesoresdb');
            this.pagosDB = new PouchDB('http://localhost:5984/pagosdb');

            /* creacion de indice de nombre para jugadoresDB */

            this.jugadoresDB.createIndex({ index: { fields: ['nombre'], name: "indiceNombre", ddoc: "indiceNombre" } })
                .catch(console.log)

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

    getPagosDB() {

        return this.pagosDB;
    }
}

const BD = new BaseDatos();
Object.freeze(BD);

export default BD;
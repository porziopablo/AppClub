import PouchDB from 'pouchdb'; 
import Find from 'pouchdb-find';
PouchDB.plugin(Find);
PouchDB.plugin(require('pouchdb-upsert'));

class BaseDatos {

    private static instance: BaseDatos;
    private jugadoresDB!: PouchDB.Database<{}>;
    private profesoresDB!: PouchDB.Database<{}>;
    private cat1fDB!: PouchDB.Database<{}>; 
    private cat1mDB!: PouchDB.Database<{}>; 
    private cat5DB!: PouchDB.Database<{}>; 
    private cat7DB!: PouchDB.Database<{}>; 
    private cat9DB!: PouchDB.Database<{}>; 
    private cat11DB!: PouchDB.Database<{}>; 
    private cat13DB!: PouchDB.Database<{}>; 
    private cat15DB!: PouchDB.Database<{}>; 
    private pagosDB!: PouchDB.Database<{}>;

    constructor() {


        if (!BaseDatos.instance) {

            /* creacion de cada bd */

            this.jugadoresDB = new PouchDB('http://localhost:5984/jugadoresdb');
            this.profesoresDB = new PouchDB('http://localhost:5984/profesoresdb');
            this.cat1fDB = new PouchDB('http://localhost:5984/asist1f');
            this.cat1mDB = new PouchDB('http://localhost:5984/asist1m');
            this.cat5DB = new PouchDB('http://localhost:5984/asist5');
            this.cat7DB = new PouchDB('http://localhost:5984/asist7');
            this.cat9DB = new PouchDB('http://localhost:5984/asist9');
            this.cat11DB = new PouchDB('http://localhost:5984/asist11');
            this.cat13DB = new PouchDB('http://localhost:5984/asist13');
            this.cat15DB = new PouchDB('http://localhost:5984/asist15');

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

    getCat1fDB() {
        return this.cat1fDB;
    }
    getCat1mDB() {
        return this.cat1mDB;
    }
    getCat5DB() {
        return this.cat5DB;
    }
    getCat7DB() {
        return this.cat7DB;
    }
    getCat9DB() {
        return this.cat9DB;
    }
    getCat11DB() {
        return this.cat11DB;
    }
    getCat13DB() {
        return this.cat13DB;
    }
    getCat15DB() {
        return this.cat15DB;
    }

    getPagosDB() {

        return this.pagosDB;
    }
}

const BD = new BaseDatos();
Object.freeze(BD);

export default BD;
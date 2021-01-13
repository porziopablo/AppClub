const PouchDB = require('pouchdb');
const Find = require('pouchdb-find');
const Auth = require('pouchdb-authentication');

PouchDB.plugin(Find);
PouchDB.plugin(Auth);
PouchDB.plugin(require('pouchdb-upsert'));
PouchDB.plugin(Auth);

/*                              LEEME
 * 
 * ESTE SCRIPT ES PARA CARGAR AL PRIMER PROFESOR EN LA BASE DE DATOS
 * 
 * LUEGO DEBE RECIBIR EL ROL DE profesor_root PARA PODER EMPEZAR A AGREGAR A OTROS PROFESORES
 * 
 * CAMBIAR DATOS A CONTINUACION ANTES DE EJECUTARLO
 * 
 */
////////////////           DATOS                    ///////////////////

const metadata = {
    email: 'email@outlook.com', // email del profesor
    nombre: 'Maximiliano Pedazo',   // nombre del profesor
    dni: '33888888',            // dni del profesor
}

const password = "coso";        // password del profesor

const host = 'localhost';       // host donde esta BD
const puerto = 5984;            // puerto de BD

/////////////////////////////////////////////////////////////////////

const baseDatos = new PouchDB(`http://${host}:${puerto}/balancesdb`);
const balance = {
    '_id': '',
    fechaCancelacion: '',
    nombreProfesor: '',
    total: 0,
};

baseDatos.signUp(metadata.dni, password, {
    metadata: metadata
}).then(res => {
    balance.nombreProfesor = metadata.nombre;
    balance._id = metadata.dni;
    baseDatos.upsert(balance._id, () => balance);
    console.log("Se ha aceptado al usuario pendiente con exito");
}).catch(error => {
    console.log(error);
});
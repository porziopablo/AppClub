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
    email: 'aaaa@aaaa.com',     // email del profesor
    nombre: 'User Prueba 1',   // nombre del profesor
    dni: '',                // dni del profesor
}

const password = "";        // password del profesor

const host = '200.0.183.33';       // host donde esta BD
const puerto = 55986;            // puerto de BD

const adminUser = "" // usuario admin de la base de datos
const adminPass = ""       // clave admin de la base de datos

/////////////////////////////////////////////////////////////////////

const baseDatos = new PouchDB(`http://${adminUser}:${adminPass}@${host}:${puerto}/balancesdb`);
const balance = {
    '_id': '',
    fechaCancelacion: '',
    nombreProfesor: '',
    total: 0,
};

baseDatos.signUp(metadata.dni, password, {
    metadata: metadata,
    roles: [
        "profesor", "profesor_root"
    ],
}).then(res => {
    balance.nombreProfesor = metadata.nombre;
    balance._id = metadata.dni;
    baseDatos.upsert(balance._id, () => balance);
    console.log("Se ha aceptado al usuario pendiente con exito");
}).catch(error => {
    console.log(error);
});
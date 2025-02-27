"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = exports.secciones = exports.regalos = exports.novio = exports.novia = exports.megusta = exports.lista = exports.invitado = exports.invitacion = exports.historia = exports.galeria = exports.evento = exports.capturas = exports.boda = void 0;
exports.initModels = initModels;
const boda_1 = require("./boda");
Object.defineProperty(exports, "boda", { enumerable: true, get: function () { return boda_1.boda; } });
const capturas_1 = require("./capturas");
Object.defineProperty(exports, "capturas", { enumerable: true, get: function () { return capturas_1.capturas; } });
const evento_1 = require("./evento");
Object.defineProperty(exports, "evento", { enumerable: true, get: function () { return evento_1.evento; } });
const galeria_1 = require("./galeria");
Object.defineProperty(exports, "galeria", { enumerable: true, get: function () { return galeria_1.galeria; } });
const historia_1 = require("./historia");
Object.defineProperty(exports, "historia", { enumerable: true, get: function () { return historia_1.historia; } });
const invitacion_1 = require("./invitacion");
Object.defineProperty(exports, "invitacion", { enumerable: true, get: function () { return invitacion_1.invitacion; } });
const invitado_1 = require("./invitado");
Object.defineProperty(exports, "invitado", { enumerable: true, get: function () { return invitado_1.invitado; } });
const lista_1 = require("./lista");
Object.defineProperty(exports, "lista", { enumerable: true, get: function () { return lista_1.lista; } });
const megusta_1 = require("./megusta");
Object.defineProperty(exports, "megusta", { enumerable: true, get: function () { return megusta_1.megusta; } });
const novia_1 = require("./novia");
Object.defineProperty(exports, "novia", { enumerable: true, get: function () { return novia_1.novia; } });
const novio_1 = require("./novio");
Object.defineProperty(exports, "novio", { enumerable: true, get: function () { return novio_1.novio; } });
const regalos_1 = require("./regalos");
Object.defineProperty(exports, "regalos", { enumerable: true, get: function () { return regalos_1.regalos; } });
const secciones_1 = require("./secciones");
Object.defineProperty(exports, "secciones", { enumerable: true, get: function () { return secciones_1.secciones; } });
const usuario_1 = require("./usuario");
Object.defineProperty(exports, "usuario", { enumerable: true, get: function () { return usuario_1.usuario; } });
function initModels(sequelize) {
    const boda = boda_1.boda.initModel(sequelize);
    const capturas = capturas_1.capturas.initModel(sequelize);
    const evento = evento_1.evento.initModel(sequelize);
    const galeria = galeria_1.galeria.initModel(sequelize);
    const historia = historia_1.historia.initModel(sequelize);
    const invitacion = invitacion_1.invitacion.initModel(sequelize);
    const invitado = invitado_1.invitado.initModel(sequelize);
    const lista = lista_1.lista.initModel(sequelize);
    const megusta = megusta_1.megusta.initModel(sequelize);
    const novia = novia_1.novia.initModel(sequelize);
    const novio = novio_1.novio.initModel(sequelize);
    const regalos = regalos_1.regalos.initModel(sequelize);
    const secciones = secciones_1.secciones.initModel(sequelize);
    const usuario = usuario_1.usuario.initModel(sequelize);
    capturas.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(capturas, { as: "capturas", foreignKey: "id_boda" });
    evento.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(evento, { as: "eventos", foreignKey: "id_boda" });
    galeria.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(galeria, { as: "galeria", foreignKey: "id_boda" });
    historia.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(historia, { as: "historia", foreignKey: "id_boda" });
    invitacion.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(invitacion, { as: "invitacions", foreignKey: "id_boda" });
    lista.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(lista, { as: "lista", foreignKey: "id_boda" });
    regalos.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(regalos, { as: "regalos", foreignKey: "id_boda" });
    secciones.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda" });
    boda.hasMany(secciones, { as: "secciones", foreignKey: "id_boda" });
    megusta.belongsTo(capturas, { as: "idcaptura_captura", foreignKey: "idcaptura" });
    capturas.hasMany(megusta, { as: "megusta", foreignKey: "idcaptura" });
    invitado.belongsTo(invitacion, { as: "id_invitacion_invitacion", foreignKey: "id_invitacion" });
    invitacion.hasMany(invitado, { as: "invitados", foreignKey: "id_invitacion" });
    boda.belongsTo(novia, { as: "id_novia_novium", foreignKey: "id_novia" });
    novia.hasMany(boda, { as: "bodas", foreignKey: "id_novia" });
    boda.belongsTo(novio, { as: "id_novio_novio", foreignKey: "id_novio" });
    novio.hasMany(boda, { as: "bodas", foreignKey: "id_novio" });
    boda.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario" });
    usuario.hasMany(boda, { as: "bodas", foreignKey: "id_usuario" });
    return {
        boda: boda,
        capturas: capturas,
        evento: evento,
        galeria: galeria,
        historia: historia,
        invitacion: invitacion,
        invitado: invitado,
        lista: lista,
        megusta: megusta,
        novia: novia,
        novio: novio,
        regalos: regalos,
        secciones: secciones,
        usuario: usuario,
    };
}

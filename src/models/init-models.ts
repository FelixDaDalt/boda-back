import type { Sequelize } from "sequelize";
import { boda as _boda } from "./boda";
import type { bodaAttributes, bodaCreationAttributes } from "./boda";
import { capturas as _capturas } from "./capturas";
import type { capturasAttributes, capturasCreationAttributes } from "./capturas";
import { evento as _evento } from "./evento";
import type { eventoAttributes, eventoCreationAttributes } from "./evento";
import { galeria as _galeria } from "./galeria";
import type { galeriaAttributes, galeriaCreationAttributes } from "./galeria";
import { historia as _historia } from "./historia";
import type { historiaAttributes, historiaCreationAttributes } from "./historia";
import { invitacion as _invitacion } from "./invitacion";
import type { invitacionAttributes, invitacionCreationAttributes } from "./invitacion";
import { invitado as _invitado } from "./invitado";
import type { invitadoAttributes, invitadoCreationAttributes } from "./invitado";
import { lista as _lista } from "./lista";
import type { listaAttributes, listaCreationAttributes } from "./lista";
import { megusta as _megusta } from "./megusta";
import type { megustaAttributes, megustaCreationAttributes } from "./megusta";
import { novia as _novia } from "./novia";
import type { noviaAttributes, noviaCreationAttributes } from "./novia";
import { novio as _novio } from "./novio";
import type { novioAttributes, novioCreationAttributes } from "./novio";
import { regalos as _regalos } from "./regalos";
import type { regalosAttributes, regalosCreationAttributes } from "./regalos";
import { secciones as _secciones } from "./secciones";
import type { seccionesAttributes, seccionesCreationAttributes } from "./secciones";
import { usuario as _usuario } from "./usuario";
import type { usuarioAttributes, usuarioCreationAttributes } from "./usuario";

export {
  _boda as boda,
  _capturas as capturas,
  _evento as evento,
  _galeria as galeria,
  _historia as historia,
  _invitacion as invitacion,
  _invitado as invitado,
  _lista as lista,
  _megusta as megusta,
  _novia as novia,
  _novio as novio,
  _regalos as regalos,
  _secciones as secciones,
  _usuario as usuario,
};

export type {
  bodaAttributes,
  bodaCreationAttributes,
  capturasAttributes,
  capturasCreationAttributes,
  eventoAttributes,
  eventoCreationAttributes,
  galeriaAttributes,
  galeriaCreationAttributes,
  historiaAttributes,
  historiaCreationAttributes,
  invitacionAttributes,
  invitacionCreationAttributes,
  invitadoAttributes,
  invitadoCreationAttributes,
  listaAttributes,
  listaCreationAttributes,
  megustaAttributes,
  megustaCreationAttributes,
  noviaAttributes,
  noviaCreationAttributes,
  novioAttributes,
  novioCreationAttributes,
  regalosAttributes,
  regalosCreationAttributes,
  seccionesAttributes,
  seccionesCreationAttributes,
  usuarioAttributes,
  usuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const boda = _boda.initModel(sequelize);
  const capturas = _capturas.initModel(sequelize);
  const evento = _evento.initModel(sequelize);
  const galeria = _galeria.initModel(sequelize);
  const historia = _historia.initModel(sequelize);
  const invitacion = _invitacion.initModel(sequelize);
  const invitado = _invitado.initModel(sequelize);
  const lista = _lista.initModel(sequelize);
  const megusta = _megusta.initModel(sequelize);
  const novia = _novia.initModel(sequelize);
  const novio = _novio.initModel(sequelize);
  const regalos = _regalos.initModel(sequelize);
  const secciones = _secciones.initModel(sequelize);
  const usuario = _usuario.initModel(sequelize);

  capturas.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(capturas, { as: "capturas", foreignKey: "id_boda"});
  evento.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(evento, { as: "eventos", foreignKey: "id_boda"});
  galeria.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(galeria, { as: "galeria", foreignKey: "id_boda"});
  historia.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(historia, { as: "historia", foreignKey: "id_boda"});
  invitacion.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(invitacion, { as: "invitacions", foreignKey: "id_boda"});
  lista.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(lista, { as: "lista", foreignKey: "id_boda"});
  regalos.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(regalos, { as: "regalos", foreignKey: "id_boda"});
  secciones.belongsTo(boda, { as: "id_boda_boda", foreignKey: "id_boda"});
  boda.hasMany(secciones, { as: "secciones", foreignKey: "id_boda"});
  megusta.belongsTo(capturas, { as: "idcaptura_captura", foreignKey: "idcaptura"});
  capturas.hasMany(megusta, { as: "megusta", foreignKey: "idcaptura"});
  invitado.belongsTo(invitacion, { as: "id_invitacion_invitacion", foreignKey: "id_invitacion"});
  invitacion.hasMany(invitado, { as: "invitados", foreignKey: "id_invitacion"});
  boda.belongsTo(novia, { as: "id_novia_novium", foreignKey: "id_novia"});
  novia.hasMany(boda, { as: "bodas", foreignKey: "id_novia"});
  boda.belongsTo(novio, { as: "id_novio_novio", foreignKey: "id_novio"});
  novio.hasMany(boda, { as: "bodas", foreignKey: "id_novio"});
  boda.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(boda, { as: "bodas", foreignKey: "id_usuario"});

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

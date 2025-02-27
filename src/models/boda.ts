import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { capturas, capturasId } from './capturas';
import type { evento, eventoId } from './evento';
import type { galeria, galeriaId } from './galeria';
import type { historia, historiaId } from './historia';
import type { invitacion, invitacionId } from './invitacion';
import type { lista, listaId } from './lista';
import type { novia, noviaId } from './novia';
import type { novio, novioId } from './novio';
import type { regalos, regalosId } from './regalos';
import type { secciones, seccionesId } from './secciones';
import type { usuario, usuarioId } from './usuario';

export interface bodaAttributes {
  id: number;
  id_novio: number;
  id_novia: number;
  id_usuario: number;
  url: string;
  nombre: string;
  activo?: number;
}

export type bodaPk = "id";
export type bodaId = boda[bodaPk];
export type bodaOptionalAttributes = "id" | "activo";
export type bodaCreationAttributes = Optional<bodaAttributes, bodaOptionalAttributes>;

export class boda extends Model<bodaAttributes, bodaCreationAttributes> implements bodaAttributes {
  id!: number;
  id_novio!: number;
  id_novia!: number;
  id_usuario!: number;
  url!: string;
  nombre!: string;
  activo?: number;

  // boda hasMany capturas via id_boda
  capturas!: capturas[];
  getCapturas!: Sequelize.HasManyGetAssociationsMixin<capturas>;
  setCapturas!: Sequelize.HasManySetAssociationsMixin<capturas, capturasId>;
  addCaptura!: Sequelize.HasManyAddAssociationMixin<capturas, capturasId>;
  addCapturas!: Sequelize.HasManyAddAssociationsMixin<capturas, capturasId>;
  createCaptura!: Sequelize.HasManyCreateAssociationMixin<capturas>;
  removeCaptura!: Sequelize.HasManyRemoveAssociationMixin<capturas, capturasId>;
  removeCapturas!: Sequelize.HasManyRemoveAssociationsMixin<capturas, capturasId>;
  hasCaptura!: Sequelize.HasManyHasAssociationMixin<capturas, capturasId>;
  hasCapturas!: Sequelize.HasManyHasAssociationsMixin<capturas, capturasId>;
  countCapturas!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany evento via id_boda
  eventos!: evento[];
  getEventos!: Sequelize.HasManyGetAssociationsMixin<evento>;
  setEventos!: Sequelize.HasManySetAssociationsMixin<evento, eventoId>;
  addEvento!: Sequelize.HasManyAddAssociationMixin<evento, eventoId>;
  addEventos!: Sequelize.HasManyAddAssociationsMixin<evento, eventoId>;
  createEvento!: Sequelize.HasManyCreateAssociationMixin<evento>;
  removeEvento!: Sequelize.HasManyRemoveAssociationMixin<evento, eventoId>;
  removeEventos!: Sequelize.HasManyRemoveAssociationsMixin<evento, eventoId>;
  hasEvento!: Sequelize.HasManyHasAssociationMixin<evento, eventoId>;
  hasEventos!: Sequelize.HasManyHasAssociationsMixin<evento, eventoId>;
  countEventos!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany galeria via id_boda
  galeria!: galeria[];
  getGaleria!: Sequelize.HasManyGetAssociationsMixin<galeria>;
  setGaleria!: Sequelize.HasManySetAssociationsMixin<galeria, galeriaId>;
  addGalerium!: Sequelize.HasManyAddAssociationMixin<galeria, galeriaId>;
  addGaleria!: Sequelize.HasManyAddAssociationsMixin<galeria, galeriaId>;
  createGalerium!: Sequelize.HasManyCreateAssociationMixin<galeria>;
  removeGalerium!: Sequelize.HasManyRemoveAssociationMixin<galeria, galeriaId>;
  removeGaleria!: Sequelize.HasManyRemoveAssociationsMixin<galeria, galeriaId>;
  hasGalerium!: Sequelize.HasManyHasAssociationMixin<galeria, galeriaId>;
  hasGaleria!: Sequelize.HasManyHasAssociationsMixin<galeria, galeriaId>;
  countGaleria!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany historia via id_boda
  historia!: historia[];
  getHistoria!: Sequelize.HasManyGetAssociationsMixin<historia>;
  setHistoria!: Sequelize.HasManySetAssociationsMixin<historia, historiaId>;
  addHistorium!: Sequelize.HasManyAddAssociationMixin<historia, historiaId>;
  addHistoria!: Sequelize.HasManyAddAssociationsMixin<historia, historiaId>;
  createHistorium!: Sequelize.HasManyCreateAssociationMixin<historia>;
  removeHistorium!: Sequelize.HasManyRemoveAssociationMixin<historia, historiaId>;
  removeHistoria!: Sequelize.HasManyRemoveAssociationsMixin<historia, historiaId>;
  hasHistorium!: Sequelize.HasManyHasAssociationMixin<historia, historiaId>;
  hasHistoria!: Sequelize.HasManyHasAssociationsMixin<historia, historiaId>;
  countHistoria!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany invitacion via id_boda
  invitacions!: invitacion[];
  getInvitacions!: Sequelize.HasManyGetAssociationsMixin<invitacion>;
  setInvitacions!: Sequelize.HasManySetAssociationsMixin<invitacion, invitacionId>;
  addInvitacion!: Sequelize.HasManyAddAssociationMixin<invitacion, invitacionId>;
  addInvitacions!: Sequelize.HasManyAddAssociationsMixin<invitacion, invitacionId>;
  createInvitacion!: Sequelize.HasManyCreateAssociationMixin<invitacion>;
  removeInvitacion!: Sequelize.HasManyRemoveAssociationMixin<invitacion, invitacionId>;
  removeInvitacions!: Sequelize.HasManyRemoveAssociationsMixin<invitacion, invitacionId>;
  hasInvitacion!: Sequelize.HasManyHasAssociationMixin<invitacion, invitacionId>;
  hasInvitacions!: Sequelize.HasManyHasAssociationsMixin<invitacion, invitacionId>;
  countInvitacions!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany lista via id_boda
  lista!: lista[];
  getLista!: Sequelize.HasManyGetAssociationsMixin<lista>;
  setLista!: Sequelize.HasManySetAssociationsMixin<lista, listaId>;
  addListum!: Sequelize.HasManyAddAssociationMixin<lista, listaId>;
  addLista!: Sequelize.HasManyAddAssociationsMixin<lista, listaId>;
  createListum!: Sequelize.HasManyCreateAssociationMixin<lista>;
  removeListum!: Sequelize.HasManyRemoveAssociationMixin<lista, listaId>;
  removeLista!: Sequelize.HasManyRemoveAssociationsMixin<lista, listaId>;
  hasListum!: Sequelize.HasManyHasAssociationMixin<lista, listaId>;
  hasLista!: Sequelize.HasManyHasAssociationsMixin<lista, listaId>;
  countLista!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany regalos via id_boda
  regalos!: regalos[];
  getRegalos!: Sequelize.HasManyGetAssociationsMixin<regalos>;
  setRegalos!: Sequelize.HasManySetAssociationsMixin<regalos, regalosId>;
  addRegalo!: Sequelize.HasManyAddAssociationMixin<regalos, regalosId>;
  addRegalos!: Sequelize.HasManyAddAssociationsMixin<regalos, regalosId>;
  createRegalo!: Sequelize.HasManyCreateAssociationMixin<regalos>;
  removeRegalo!: Sequelize.HasManyRemoveAssociationMixin<regalos, regalosId>;
  removeRegalos!: Sequelize.HasManyRemoveAssociationsMixin<regalos, regalosId>;
  hasRegalo!: Sequelize.HasManyHasAssociationMixin<regalos, regalosId>;
  hasRegalos!: Sequelize.HasManyHasAssociationsMixin<regalos, regalosId>;
  countRegalos!: Sequelize.HasManyCountAssociationsMixin;
  // boda hasMany secciones via id_boda
  secciones!: secciones[];
  getSecciones!: Sequelize.HasManyGetAssociationsMixin<secciones>;
  setSecciones!: Sequelize.HasManySetAssociationsMixin<secciones, seccionesId>;
  addSeccione!: Sequelize.HasManyAddAssociationMixin<secciones, seccionesId>;
  addSecciones!: Sequelize.HasManyAddAssociationsMixin<secciones, seccionesId>;
  createSeccione!: Sequelize.HasManyCreateAssociationMixin<secciones>;
  removeSeccione!: Sequelize.HasManyRemoveAssociationMixin<secciones, seccionesId>;
  removeSecciones!: Sequelize.HasManyRemoveAssociationsMixin<secciones, seccionesId>;
  hasSeccione!: Sequelize.HasManyHasAssociationMixin<secciones, seccionesId>;
  hasSecciones!: Sequelize.HasManyHasAssociationsMixin<secciones, seccionesId>;
  countSecciones!: Sequelize.HasManyCountAssociationsMixin;
  // boda belongsTo novia via id_novia
  id_novia_novium!: novia;
  getId_novia_novium!: Sequelize.BelongsToGetAssociationMixin<novia>;
  setId_novia_novium!: Sequelize.BelongsToSetAssociationMixin<novia, noviaId>;
  createId_novia_novium!: Sequelize.BelongsToCreateAssociationMixin<novia>;
  // boda belongsTo novio via id_novio
  id_novio_novio!: novio;
  getId_novio_novio!: Sequelize.BelongsToGetAssociationMixin<novio>;
  setId_novio_novio!: Sequelize.BelongsToSetAssociationMixin<novio, novioId>;
  createId_novio_novio!: Sequelize.BelongsToCreateAssociationMixin<novio>;
  // boda belongsTo usuario via id_usuario
  id_usuario_usuario!: usuario;
  getId_usuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuario>;
  setId_usuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuario, usuarioId>;
  createId_usuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof boda {
    return boda.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_novio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'novio',
        key: 'id'
      }
    },
    id_novia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'novia',
        key: 'id'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'boda',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "boda_novia",
        using: "BTREE",
        fields: [
          { name: "id_novia" },
        ]
      },
      {
        name: "boda_novio",
        using: "BTREE",
        fields: [
          { name: "id_novio" },
        ]
      },
      {
        name: "boda_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}

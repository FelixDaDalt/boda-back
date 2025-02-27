import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface seccionesAttributes {
  id: number;
  id_boda: number;
  pareja: number;
  historia: number;
  galeria: number;
  eventos: number;
  regalos: number;
  lista: number;
  capturas: number;
  upload: number;
}

export type seccionesPk = "id";
export type seccionesId = secciones[seccionesPk];
export type seccionesOptionalAttributes = "id" | "pareja" | "historia" | "galeria" | "eventos" | "regalos" | "lista" | "capturas";
export type seccionesCreationAttributes = Optional<seccionesAttributes, seccionesOptionalAttributes>;

export class secciones extends Model<seccionesAttributes, seccionesCreationAttributes> implements seccionesAttributes {
  id!: number;
  id_boda!: number;
  pareja!: number;
  historia!: number;
  galeria!: number;
  eventos!: number;
  regalos!: number;
  lista!: number;
  capturas!: number;
  upload!:number

  // secciones belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof secciones {
    return secciones.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_boda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boda',
        key: 'id'
      }
    },
    pareja: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    historia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    galeria: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    eventos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    regalos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    lista: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    capturas: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    upload: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'secciones',
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
        name: "fk_secciones_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

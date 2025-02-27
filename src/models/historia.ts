import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface historiaAttributes {
  id: number;
  fecha: string;
  titulo: string;
  descripcion: string;
  borrado: number;
  id_boda: number;
  imagen?: string;
}

export type historiaPk = "id";
export type historiaId = historia[historiaPk];
export type historiaOptionalAttributes = "id" | "borrado" | "imagen";
export type historiaCreationAttributes = Optional<historiaAttributes, historiaOptionalAttributes>;

export class historia extends Model<historiaAttributes, historiaCreationAttributes> implements historiaAttributes {
  id!: number;
  fecha!: string;
  titulo!: string;
  descripcion!: string;
  borrado!: number;
  id_boda!: number;
  imagen?: string;

  // historia belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof historia {
    return historia.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    id_boda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boda',
        key: 'id'
      }
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historia',
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
        name: "historia_a_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface listaAttributes {
  id_boda: number;
  artista?: string;
  nombre: string;
  randomkey: string;
  id: number;
}

export type listaPk = "id";
export type listaId = lista[listaPk];
export type listaOptionalAttributes = "artista" | "id";
export type listaCreationAttributes = Optional<listaAttributes, listaOptionalAttributes>;

export class lista extends Model<listaAttributes, listaCreationAttributes> implements listaAttributes {
  id_boda!: number;
  artista?: string;
  nombre!: string;
  randomkey!: string;
  id!: number;

  // lista belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof lista {
    return lista.init({
    id_boda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boda',
        key: 'id'
      }
    },
    artista: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "sin artista"
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    randomkey: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lista',
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
        name: "fk_canciones_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

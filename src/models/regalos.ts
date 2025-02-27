import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface regalosAttributes {
  id: number;
  id_boda: number;
  cbu?: number;
  alias?: string;
}

export type regalosPk = "id";
export type regalosId = regalos[regalosPk];
export type regalosOptionalAttributes = "id" | "cbu" | "alias";
export type regalosCreationAttributes = Optional<regalosAttributes, regalosOptionalAttributes>;

export class regalos extends Model<regalosAttributes, regalosCreationAttributes> implements regalosAttributes {
  id!: number;
  id_boda!: number;
  cbu?: number;
  alias?: string;

  // regalos belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof regalos {
    return regalos.init({
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
    cbu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'regalos',
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
        name: "fk_regalos_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

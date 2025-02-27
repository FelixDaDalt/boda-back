import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface galeriaAttributes {
  id: number;
  id_boda: number;
  url?: string;
}

export type galeriaPk = "id";
export type galeriaId = galeria[galeriaPk];
export type galeriaOptionalAttributes = "id" | "url";
export type galeriaCreationAttributes = Optional<galeriaAttributes, galeriaOptionalAttributes>;

export class galeria extends Model<galeriaAttributes, galeriaCreationAttributes> implements galeriaAttributes {
  id!: number;
  id_boda!: number;
  url?: string;

  // galeria belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof galeria {
    return galeria.init({
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
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'galeria',
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
        name: "fk_galeria_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

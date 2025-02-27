import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { capturas, capturasId } from './capturas';

export interface megustaAttributes {
  idcaptura: number;
  randomkey: string;
  megusta: number;
  id: number;
}

export type megustaPk = "id";
export type megustaId = megusta[megustaPk];
export type megustaOptionalAttributes = "megusta" | "id";
export type megustaCreationAttributes = Optional<megustaAttributes, megustaOptionalAttributes>;

export class megusta extends Model<megustaAttributes, megustaCreationAttributes> implements megustaAttributes {
  idcaptura!: number;
  randomkey!: string;
  megusta!: number;
  id!: number;

  // megusta belongsTo capturas via idcaptura
  idcaptura_captura!: capturas;
  getIdcaptura_captura!: Sequelize.BelongsToGetAssociationMixin<capturas>;
  setIdcaptura_captura!: Sequelize.BelongsToSetAssociationMixin<capturas, capturasId>;
  createIdcaptura_captura!: Sequelize.BelongsToCreateAssociationMixin<capturas>;

  static initModel(sequelize: Sequelize.Sequelize): typeof megusta {
    return megusta.init({
    idcaptura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'capturas',
        key: 'id'
      }
    },
    randomkey: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    megusta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'megusta',
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
        name: "fk_megusta_capturas",
        using: "BTREE",
        fields: [
          { name: "idcaptura" },
        ]
      },
    ]
  });
  }
}

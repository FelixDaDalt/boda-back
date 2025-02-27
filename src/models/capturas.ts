import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';
import type { megusta, megustaId } from './megusta';

export interface capturasAttributes {
  id: number;
  id_boda: number;
  boda_url: string;
  url: string;
  hora: string;
  fecha?: string;
}

export type capturasPk = "id";
export type capturasId = capturas[capturasPk];
export type capturasOptionalAttributes = "id" | "fecha";
export type capturasCreationAttributes = Optional<capturasAttributes, capturasOptionalAttributes>;

export class capturas extends Model<capturasAttributes, capturasCreationAttributes> implements capturasAttributes {
  id!: number;
  id_boda!: number;
  boda_url!: string;
  url!: string;
  hora!: string;
  fecha?: string;

  // capturas belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;
  // capturas hasMany megusta via idcaptura
  megusta!: megusta[];
  getMegusta!: Sequelize.HasManyGetAssociationsMixin<megusta>;
  setMegusta!: Sequelize.HasManySetAssociationsMixin<megusta, megustaId>;
  addMegustum!: Sequelize.HasManyAddAssociationMixin<megusta, megustaId>;
  addMegusta!: Sequelize.HasManyAddAssociationsMixin<megusta, megustaId>;
  createMegustum!: Sequelize.HasManyCreateAssociationMixin<megusta>;
  removeMegustum!: Sequelize.HasManyRemoveAssociationMixin<megusta, megustaId>;
  removeMegusta!: Sequelize.HasManyRemoveAssociationsMixin<megusta, megustaId>;
  hasMegustum!: Sequelize.HasManyHasAssociationMixin<megusta, megustaId>;
  hasMegusta!: Sequelize.HasManyHasAssociationsMixin<megusta, megustaId>;
  countMegusta!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof capturas {
    return capturas.init({
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
    boda_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hora: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'capturas',
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
        name: "fk_capturas_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

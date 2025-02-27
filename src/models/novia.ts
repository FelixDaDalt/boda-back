import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface noviaAttributes {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  descripcion?: string;
  foto?: string;
}

export type noviaPk = "id";
export type noviaId = novia[noviaPk];
export type noviaOptionalAttributes = "id" | "descripcion" | "foto";
export type noviaCreationAttributes = Optional<noviaAttributes, noviaOptionalAttributes>;

export class novia extends Model<noviaAttributes, noviaCreationAttributes> implements noviaAttributes {
  id!: number;
  nombre!: string;
  apellido!: string;
  fecha_nacimiento!: string;
  descripcion?: string;
  foto?: string;

  // novia hasMany boda via id_novia
  bodas!: boda[];
  getBodas!: Sequelize.HasManyGetAssociationsMixin<boda>;
  setBodas!: Sequelize.HasManySetAssociationsMixin<boda, bodaId>;
  addBoda!: Sequelize.HasManyAddAssociationMixin<boda, bodaId>;
  addBodas!: Sequelize.HasManyAddAssociationsMixin<boda, bodaId>;
  createBoda!: Sequelize.HasManyCreateAssociationMixin<boda>;
  removeBoda!: Sequelize.HasManyRemoveAssociationMixin<boda, bodaId>;
  removeBodas!: Sequelize.HasManyRemoveAssociationsMixin<boda, bodaId>;
  hasBoda!: Sequelize.HasManyHasAssociationMixin<boda, bodaId>;
  hasBodas!: Sequelize.HasManyHasAssociationsMixin<boda, bodaId>;
  countBodas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof novia {
    return novia.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'novia',
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
    ]
  });
  }
}

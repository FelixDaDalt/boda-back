import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface novioAttributes {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  descripcion?: string;
  foto?: string;
}

export type novioPk = "id";
export type novioId = novio[novioPk];
export type novioOptionalAttributes = "id" | "descripcion" | "foto";
export type novioCreationAttributes = Optional<novioAttributes, novioOptionalAttributes>;

export class novio extends Model<novioAttributes, novioCreationAttributes> implements novioAttributes {
  id!: number;
  nombre!: string;
  apellido!: string;
  fecha_nacimiento!: string;
  descripcion?: string;
  foto?: string;

  // novio hasMany boda via id_novio
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

  static initModel(sequelize: Sequelize.Sequelize): typeof novio {
    return novio.init({
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
    tableName: 'novio',
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

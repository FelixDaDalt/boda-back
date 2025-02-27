import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface usuarioAttributes {
  id: number;
  email: string;
  password: string;
}

export type usuarioPk = "id";
export type usuarioId = usuario[usuarioPk];
export type usuarioOptionalAttributes = "id";
export type usuarioCreationAttributes = Optional<usuarioAttributes, usuarioOptionalAttributes>;

export class usuario extends Model<usuarioAttributes, usuarioCreationAttributes> implements usuarioAttributes {
  id!: number;
  email!: string;
  password!: string;

  // usuario hasMany boda via id_usuario
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

  static initModel(sequelize: Sequelize.Sequelize): typeof usuario {
    return usuario.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
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

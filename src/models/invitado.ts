import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invitacion, invitacionId } from './invitacion';

export interface invitadoAttributes {
  id: number;
  id_invitacion: number;
  nombre: string;
  apellido: string;
  email?: string;
  whatsapp?: string;
  confirmado: number;
  vegetariano: number;
  menor: number;
  celiaco: number;
}

export type invitadoPk = "id";
export type invitadoId = invitado[invitadoPk];
export type invitadoOptionalAttributes = "id" | "email" | "whatsapp" | "confirmado";
export type invitadoCreationAttributes = Optional<invitadoAttributes, invitadoOptionalAttributes>;

export class invitado extends Model<invitadoAttributes, invitadoCreationAttributes> implements invitadoAttributes {
  id!: number;
  id_invitacion!: number;
  nombre!: string;
  apellido!: string;
  email?: string;
  whatsapp?: string;
  confirmado!: number;
  vegetariano!: number;
  menor!: number;
  celiaco!: number;

  // invitado belongsTo invitacion via id_invitacion
  id_invitacion_invitacion!: invitacion;
  getId_invitacion_invitacion!: Sequelize.BelongsToGetAssociationMixin<invitacion>;
  setId_invitacion_invitacion!: Sequelize.BelongsToSetAssociationMixin<invitacion, invitacionId>;
  createId_invitacion_invitacion!: Sequelize.BelongsToCreateAssociationMixin<invitacion>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invitado {
    return invitado.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_invitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invitacion',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    whatsapp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    vegetariano: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    menor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    celiaco: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'invitado',
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
        name: "invitado_invitacion",
        using: "BTREE",
        fields: [
          { name: "id_invitacion" },
        ]
      },
    ]
  });
  }
}

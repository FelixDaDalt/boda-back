import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';
import type { invitado, invitadoId } from './invitado';

export interface invitacionAttributes {
  id: number;
  id_boda: number;
  fecha_limite: string;
  randomkey: string;
}

export type invitacionPk = "id";
export type invitacionId = invitacion[invitacionPk];
export type invitacionOptionalAttributes = "id" | "randomkey";
export type invitacionCreationAttributes = Optional<invitacionAttributes, invitacionOptionalAttributes>;

export class invitacion extends Model<invitacionAttributes, invitacionCreationAttributes> implements invitacionAttributes {
  id!: number;
  id_boda!: number;
  fecha_limite!: string;
  randomkey!: string;

  // invitacion belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;
  // invitacion hasMany invitado via id_invitacion
  invitados!: invitado[];
  getInvitados!: Sequelize.HasManyGetAssociationsMixin<invitado>;
  setInvitados!: Sequelize.HasManySetAssociationsMixin<invitado, invitadoId>;
  addInvitado!: Sequelize.HasManyAddAssociationMixin<invitado, invitadoId>;
  addInvitados!: Sequelize.HasManyAddAssociationsMixin<invitado, invitadoId>;
  createInvitado!: Sequelize.HasManyCreateAssociationMixin<invitado>;
  removeInvitado!: Sequelize.HasManyRemoveAssociationMixin<invitado, invitadoId>;
  removeInvitados!: Sequelize.HasManyRemoveAssociationsMixin<invitado, invitadoId>;
  hasInvitado!: Sequelize.HasManyHasAssociationMixin<invitado, invitadoId>;
  hasInvitados!: Sequelize.HasManyHasAssociationsMixin<invitado, invitadoId>;
  countInvitados!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof invitacion {
    return invitacion.init({
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
    fecha_limite: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    randomkey: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('substr(uuid(),1,5)')
    }
  }, {
    sequelize,
    tableName: 'invitacion',
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
        name: "invitacion_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

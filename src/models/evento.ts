import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { boda, bodaId } from './boda';

export interface eventoAttributes {
  id: number;
  fecha: string;
  hora: string;
  nombre_lugar: string;
  nombre_evento: string;
  direccion?: string;
  ubicacion_lat?: string;
  ubicacion_lon?: string;
  principal: number;
  id_boda: number;
}

export type eventoPk = "id";
export type eventoId = evento[eventoPk];
export type eventoOptionalAttributes = "id" | "direccion" | "ubicacion_lat" | "ubicacion_lon" | "principal";
export type eventoCreationAttributes = Optional<eventoAttributes, eventoOptionalAttributes>;

export class evento extends Model<eventoAttributes, eventoCreationAttributes> implements eventoAttributes {
  id!: number;
  fecha!: string;
  hora!: string;
  nombre_lugar!: string;
  nombre_evento!: string;
  direccion?: string;
  ubicacion_lat?: string;
  ubicacion_lon?: string;
  principal!: number;
  id_boda!: number;

  // evento belongsTo boda via id_boda
  id_boda_boda!: boda;
  getId_boda_boda!: Sequelize.BelongsToGetAssociationMixin<boda>;
  setId_boda_boda!: Sequelize.BelongsToSetAssociationMixin<boda, bodaId>;
  createId_boda_boda!: Sequelize.BelongsToCreateAssociationMixin<boda>;

  static initModel(sequelize: Sequelize.Sequelize): typeof evento {
    return evento.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    nombre_lugar: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombre_evento: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ubicacion_lat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ubicacion_lon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    principal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    id_boda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boda',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'evento',
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
        name: "fk_evento_boda",
        using: "BTREE",
        fields: [
          { name: "id_boda" },
        ]
      },
    ]
  });
  }
}

import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const VistaBodas = sequelize.define(
    'VistaBodas', // Nombre del modelo
    {
      nombre: {
        type: DataTypes.STRING,
      },
      artista: {
        type: DataTypes.STRING,
      },
      cantidad: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'vistas_bodas', // Nombre de la vista en la base de datos
      timestamps: false, // Las vistas no tienen columnas `createdAt` o `updatedAt`
      freezeTableName: true, // Evita que Sequelize cambie el nombre de la tabla a plural
    }
  );
  VistaBodas.removeAttribute('id')
  
  export {VistaBodas}
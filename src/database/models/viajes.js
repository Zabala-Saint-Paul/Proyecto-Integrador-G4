function skyData(sequelize, Datatypes){

    alias = 'Viajes';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      precio: {type: Datatypes.INTEGER},
      fecha: {type: Datatypes.DATE},
      descripcion: {type: Datatypes.STRING},
      nombre: {type: Datatypes.STRING},
      imagen_id:{type: Datatypes.STRING},
      capacidad_nave:{type: Datatypes.INTEGER},
      companiasFK: {type: Datatypes.INTEGER},
    }
    
    config = {camelCase: false, timestamps: false,tableName: "viajes"}; 
    
    const viajes = sequelize.define(alias,cols,config)
    
    viajes.associate = function (modelos){
    //"viajes" relacion 1:N con "companias", cada viaje puede tener 1 compania, pero la compania puede tener muchos viajes
    // 1 viaje pertenece a una compania  
    viajes.belongsTo(modelos.Companias, {   
        as: "companias",
        foreignKey: "companiasFK"
      });
      //"viajes" relacion N:1 con "pasajes", cada viaje puede tener muchos pasajes, pero el pasaje puede tener un viaje.
      // 1 viaje tiene muchos pasajes
      viajes.hasMany(modelos.Pasajes, {   
        as: "pasajes",
        foreignKey: "viajesFK"
      });
    
    
    }
    
    
    return viajes;
    
    }
    
    
    module.exports = skyData;
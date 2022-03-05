function skyData(sequelize, Datatypes){

    alias = 'Companias';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      email: {type: Datatypes.STRING},
      nombre: {type: Datatypes.STRING},
      contraseña: {type: Datatypes.STRING},      
      cuit: {type: Datatypes.INTEGER},
      imagen_id:{type: Datatypes.STRING},

    }
    
    config = {camelCase: false, timestamps: false , tableName: "companias"}; 
    
    const companias = sequelize.define(alias,cols,config)
    
    companias.associate = function (modelos){
    // companias relacion N:1 con viajes, porque cada compania puede tener muchos viajes, pero cada viaje pertenece a una compania.
    // 1 compania tiene 1 o muchos viajes
    companias.hasMany(modelos.Viajes, {   
        as: "viajes",
        foreignKey: "companiasFK"
      });
    
    
    }
    
    
    return companias;
    
    }
    
    
    module.exports = skyData;
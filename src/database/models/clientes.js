function skyData(sequelize, Datatypes){

    alias = 'Clientes';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      email: {type: Datatypes.STRING},
      

    }
    
    config = {camelCase: false, timestamps: false,  tableName: "clientes"}; 
    
    const clientes = sequelize.define(alias,cols,config)
    
    clientes.associate = function (modelos){
    // 1 cliente tiene 1 o muchos pasajes
     clientes.hasMany(modelos.Pasajes, {   
        as: "pasajes",
        foreignKey: "clientesFK"
      });
    
    
    }
    
    
    return clientes;
    
    }
    
    
    module.exports = skyData;
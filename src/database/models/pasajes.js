function skyData(sequelize, Datatypes){

    alias = 'Pasajes';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      fecha_hora: {type: Datatypes.DATE},
      valor: {type: Datatypes.INTEGER},
      pasajero:{type: Datatypes.STRING},
      asiento:{type: Datatypes.STRING},
      viajesFK: {type: Datatypes.INTEGER},
      clientesFK: {type: Datatypes.INTEGER},

    }
    
    config = {camelCase: false, timestamps: false, tableName: "pasajes"}; 
    
    const pasajes = sequelize.define(alias,cols,config)
    
    pasajes.associate = function (modelos){

    
    // 1 pasaje tiene 1 viaje
      pasajes.belongsTo(modelos.Viajes, {   
        as: "viajes",
        foreignKey: "viajesFK"
      });
    // 1 pasaje tiene 1 cliente
      pasajes.belongsTo(modelos.Clientes, {   
        as: "clientes",
        foreignKey: "clientesFK"
      });
  
    }
    
    
    return pasajes;
    
    }
    
    
    module.exports = skyData;
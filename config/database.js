const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("CarritoCompras", "","", {
    host: "Mario",
    dialect: "mssql",
    dialectOptions: {
        options: {
            trustedConnection: true
        },
          
    }
});

async function ConexionBD() {
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectada correctamente")
    }
    catch(error) {
        console.error("No fue posible conectarse a la base de datos",error)
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    ConexionBD,
};
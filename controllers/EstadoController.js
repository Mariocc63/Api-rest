const sequelize = require("../config/database").sequelize;

exports.crearEstado = async (req,res) => {
    const { estado } = req.body;
    try {
        const resultado = await sequelize.query(
            "EXEC InsertarEstado :estado",
            {
                replacements: { estado },
                type: sequelize.QueryTypes.INSERT
            }
        );
        const estadoID = resultado[0].id;
        res.status(200).json({id: estadoID, estado});
    } 
    catch (error) {
        res.status(400).json({error: "Error al crear el estado"});
    }
}

//Actualizacion de Estado
exports.actualizarEstado = async (req, res) => {
    const { idestados } = req.params;
    const { estado } = req.body;

    try {
        await sequelize.query(
            "EXEC ActualizarEstado :idestados, :estado",
            {
                replacements: { idestados, estado },
                type: sequelize.QueryTypes.RAW
            }
        );
        res.status(200).json({idestados, estado});
    }
    catch (error) {
        console.error("Error al actualizar el estado", error)
        res.status(500).json({error: "Error al actualizar el estado"});
    }
};
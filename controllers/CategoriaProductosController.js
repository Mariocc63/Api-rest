const sequelize = require("../config/database").sequelize;

exports.crearCategoriaProductos = async (req,res) => {
    const { 
        usuarios_idusuarios, 
        nombre,
        estados_idestados} = req.body;

    try {

        await sequelize.query(
            "EXEC InsertarCategoriaProductos :usuarios_idusuarios, " +
            ":nombre, " +
            ":estados_idestados",
            {
                replacements: { 
                    usuarios_idusuarios, 
                    nombre,
                    estados_idestados},
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(200).json({message: "Categoria de productos agregada correctamente"});
    } 
    catch (error) {
        res.status(400).json({error: "Error al crear la categoria de productos"});
        console.log(error);
    }
}

//Actualizacion de Categoria de productos
exports.actualizarCategoriaProductos = async (req, res) => {
    const { idcategoriaproductos } = req.params;
    const campos  = req.body;

    if(!idcategoriaproductos || Object.keys(campos).length === 0) {
        return res.status(400).json({error: "No hay campos para actualizar"})
    }

    try {

        await sequelize.query(
            "EXEC ActualizarCategoriasProductos @idcategoriaproductos = :idcategoriaproductos, "+
            "@usuarios_idusuarios = :usuarios_idusuarios, " +
            "@nombre = :nombre, " +
            "@estados_idestados = :estados_idestados, "+
            "@fecha_creacion = :fecha_creacion",
            {
                replacements: { 
                    idcategoriaproductos,
                    usuarios_idusuarios: campos.usuarios_idusuarios || null,
                    nombre: campos.nombre || null, 
                    estados_idestados: campos.estados_idestados || null,
                    fecha_creacion: campos.fecha_creacion || null
                },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        res.status(200).json({message: "Actualizado correctamente"});
    }
    catch (error) {
        console.error("Error al actualizar la categoria de productos", error)
        res.status(500).json({error: "Error al actualizar la categoria de productos"});
    }
    
};
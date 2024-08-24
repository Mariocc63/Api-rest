const sequelize = require("../config/database").sequelize;


exports.crearProductos = async (req,res) => {
    const { categoriaproductos_idcategoriaproductos, 
        usuarios_idusuarios,
        nombre,
        marca,
        codigo,
        stock,
        estados_idestados,
        precio,
        foto} = req.body;

    try {

        //let imagen = fs.readFileSync(foto).toString("hex"); 

        await sequelize.query("declare @imagen varbinary(max); " +
            "select @imagen = BulkColumn " +
            "from OPENROWSET(BULK :foto, SINGLE_BLOB) as imagen; " +
            "EXEC InsertarProductos " +
            ":categoriaproductos_idcategoriaproductos, " +
            ":usuarios_idusuarios, " +
             ":nombre, " + 
             ":marca, " +
             ":codigo, " +
             ":stock, " +
             ":estados_idestados, " +
             ":precio, " +
             "@foto = @imagen" ,
            {
                replacements: { 
                    categoriaproductos_idcategoriaproductos, 
                    usuarios_idusuarios,
                    nombre,
                    marca,
                    codigo,
                    stock,
                    estados_idestados,
                    precio,
                    foto},
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(200).json({message: "Producto agregado correctamente"});
    } 
    catch (error) {
        res.status(400).json({error: "Error al crear el producto"});
        console.log(error);
    }
}

//Actualizacion de Productos
exports.actualizarProductos = async (req, res) => {
    const { idproductos } = req.params;
    const campos  = req.body;

    if(!idproductos || Object.keys(campos).length === 0) {
        return res.status(400).json({error: "No hay campos para actualizar"})
    }

    try {

        await sequelize.query("declare @imagen varbinary(max); " +
            "select @imagen = BulkColumn " +
            "from OPENROWSET(BULK :foto, SINGLE_BLOB) as imagen; " +
            "EXEC ActualizarProductos " + 
            "@idproductos = :idproductos, "+
            "@categoriaproductos_idcategoriaproductos = :categoriaproductos_idcategoriaproductos, " +
            "@usuarios_idusuarios = :usuarios_idusuarios, " +
            "@nombre = :nombre, " +
            "@marca = :marca, " +
            "@codigo = :codigo, " + 
            "@stock = :stock, " +
            "@estados_idestados = :estados_idestados, " +
            "@precio = :precio, " +
            "@fecha_creacion = :fecha_creacion, " +
            "@foto = @imagen",
            {
                replacements: { 
                    idproductos,
                    categoriaproductos_idcategoriaproductos: campos.categoriaproductos_idcategoriaproductos || null, 
                    usuarios_idusuarios: campos.usuarios_idusuarios || null, 
                    nombre: campos.nombre || null,
                    marca: campos.marca || null, 
                    codigo: campos.codigo || null,
                    stock: campos.stock || null, 
                    estados_idestados: campos.estados_idestados || null,
                    precio: campos.precio || null,
                    fecha_creacion: campos.fecha_creacion || null,
                    foto: campos.foto || null
                },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        res.status(200).json({message: "Actualizado correctamente"});
    }
    catch (error) {
        console.error("Error al actualizar el producto", error)
        res.status(500).json({error: "Error al actualizar el producto"});
    }
    
};
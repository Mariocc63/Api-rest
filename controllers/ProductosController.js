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

        const existeproducto = await sequelize.query("select * from productos where codigo = :codigo",
            {
                replacements: {
                    codigo
                },
                type: sequelize.QueryTypes.SELECT
            }
        );
    
        if(existeproducto.length > 0) {
            res.status(400).json({message: "El estado a ingresar ya existe"})
        }
        else {
            try {

                await sequelize.query(`declare @imagen varbinary(max);
                    select @imagen = BulkColumn
                    from OPENROWSET(BULK :foto, SINGLE_BLOB) as imagen;
                    EXEC InsertarProductos
                    :categoriaproductos_idcategoriaproductos,
                    :usuarios_idusuarios,
                     :nombre,
                     :marca,
                     :codigo,
                     :stock,
                     :estados_idestados,
                     :precio,
                     @foto = @imagen` ,
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
                //console.log(error);
            }
        }
}

//Actualizacion de Productos
exports.actualizarProductos = async (req, res) => {
    const { idproductos } = req.params;
    const campos  = req.body;

    if(!idproductos || Object.keys(campos).length === 0) {
        res.status(400).json({error: "No hay campos para actualizar"})
    }

    try {
        const query1 = `EXEC ActualizarProductos @idproductos = :idproductos, 
            @categoriaproductos_idcategoriaproductos = :categoriaproductos_idcategoriaproductos, 
            @usuarios_idusuarios = :usuarios_idusuarios,
            @nombre = :nombre,
            @marca = :marca,
            @codigo = :codigo, 
            @stock = :stock,
            @estados_idestados = :estados_idestados,
            @precio = :precio,
            @fecha_creacion = :fecha_creacion`.toString();

        if(campos.foto === undefined) {
            await sequelize.query(query1,
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
                    //foto: campos.foto || null
                },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        res.status(200).json({message: "Actualizado correctamente"});
        }
        else {
            await sequelize.query(`declare @imagen varbinary(max); 
            select @imagen = BulkColumn
            from OPENROWSET(BULK :foto, SINGLE_BLOB) as imagen;` +
            query1 + ` , @foto = @imagen`,
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
        
    }
    catch (error) {
        //console.error("Error al actualizar el producto", error)
        res.status(500).json({message: "Error al actualizar el producto"});
    }
    
};

exports.verProductosActivos = async (req, res) => {
    try {
        const productos = await sequelize.query(
            `select * from Ver_Productos_Activos`, 
            {  type: sequelize.QueryTypes.SELECT }
            )
            res.status(200).json({productos})  
        }
        
    catch (error) {
        res.status(400).json({message: "Error al cargar los productos"});
    }
}

exports.VerProductosPorCategoria = async (req, res) => {
    const { categoriaproductos_idcategoriaproductos } = req.params;

    try {
        
          const productos =  await sequelize.query(
                `EXEC Ver_Productos_por_categoria
                @categoriaproductos_idcategoriaproductos = :categoriaproductos_idcategoriaproductos`,
            {
                replacements: { 
                    categoriaproductos_idcategoriaproductos
                },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json({productos});
        
        
    }
    catch (error) {
        //console.error("Error al actualizar el producto", error)
        res.status(500).json({message: "Error al ver los productos"});
    }
    
};
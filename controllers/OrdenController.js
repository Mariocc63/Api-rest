const { Transaction } = require("sequelize");

const sequelize = require("../config/database").sequelize;


exports.crearOrden= async (req,res) => {
    const { 
        usuarios_idusuarios, 
        estados_idestados, 
        nombre_completo,
        direccion, 
        telefono,
        correo_electronico, 
        fecha_entrega, 
        total_orden,
        detalles_orden} = req.body;

        const transaccion = await sequelize.transaction();

    try {

     
        const [ResultadoOrden] = await sequelize.query(
            "EXEC InsertarOrdenes " +
            ":usuarios_idusuarios, " +
            ":estados_idestados, " +
            ":nombre_completo, " +
            ":direccion, " +
            ":telefono, " +
            ":correo_electronico, " + 
            ":fecha_entrega, " +
            ":total_orden" ,
            {
                replacements: { 
                    usuarios_idusuarios, 
                    estados_idestados, 
                    nombre_completo,
                    direccion,
                    telefono,
                    correo_electronico,
                    fecha_entrega,
                    total_orden},
                type: sequelize.QueryTypes.INSERT,
                transaccion
            }
        );

        const orden_idorden = ResultadoOrden[0].id;
        //console.log(ResultadoOrden);

        for(const detalle of detalles_orden) {
            const {
                productos_idproductos,
                cantidad,
                precio,
                subtotal} = detalle;

                await sequelize.query(
                    "EXEC InsertarOrdenDetalles " + 
                    ":orden_idorden, " +
                    ":productos_idproductos, " +
                    ":cantidad, " +
                    ":precio, " +
                    ":subtotal",
                    {
                        replacements: {
                            orden_idorden,
                            productos_idproductos,
                            cantidad,
                            precio,
                            subtotal
                        },
                        type: sequelize.QueryTypes.INSERT,
                        transaccion
                    }
                );
        }

        //console.log(orden_idorden);
        await transaccion.commit();

        res.status(200).json({message: "Order y detalles de orden agregados correctamente"});
        
    } 
    catch (error) {
        await transaccion.rollback();
        res.status(400).json({error: "Error al crear la orden y detalles de orden"});
        console.log(error);
    }
}

//Actualizacion de Orden
exports.actualizarOrden = async (req, res) => {
    const { idorden } = req.params;
    const campos  = req.body;

    if(!idorden || Object.keys(campos).length === 0) {
        return res.status(400).json({error: "No hay campos para actualizar"})
    }

    try {

        await sequelize.query(
            "EXEC ActualizarOrdernes " + 
            "@idorden = :idorden, "+
            //":usuarios_idusuarios, " +
            //":estados_idestados, " +
            "@fecha_creacion = :fecha_creacion, " +
            "@nombre_completo = :nombre_completo, " +
            "@direccion = :direccion, " +
            "@telefono = :telefono, " +
            "@correo_electronico = :correo_electronico, " + 
            "@fecha_entrega = :fecha_entrega" ,
            //":total_orden",
            {
                replacements: { 
                    idorden, 
                    //usuarios_idusuarios: campos.usuarios_idusuarios || null,
                    //estados_idestados: campos.estados_idestados || null,
                    fecha_creacion: campos.fecha_creacion || null,
                    nombre_completo: campos.nombre_completo || null,
                    direccion: campos.direccion || null,
                    telefono: campos.telefono || null,
                    correo_electronico: campos.correo_electronico || null,
                    fecha_entrega: campos.fecha_entrega || null
                    //total_orden: campos.total_orden || null
                },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        res.status(200).json({message: "Actualizado correctamente"});
    }
    catch (error) {
        console.error("Error al actualizar la orden", error)
        res.status(500).json({error: "Error al actualizar la orden"});
    }
    
};
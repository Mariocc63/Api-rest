const sequelize = require("../config/database").sequelize;
const bcrypt = require("bcrypt");
const saltoRondas = 10; //costo del proceso de encriptacion

exports.crearUsuario= async (req,res) => {
    const { rol_idrol, 
        estados_idestados, 
        correo_electronico, 
        nombre_completo, 
        contrasenia, 
        telefono, 
        fecha_nacimiento} = req.body;

    try {
        let contraseniaEncriptada = null;

        contraseniaEncriptada = await bcrypt.hash(contrasenia, saltoRondas);

        await sequelize.query(
            "EXEC InsertarUsuarios :rol_idrol, " +
            ":estados_idestados, " +
             ":correo_electronico, " + 
             ":nombre_completo, " +
             ":contrasenia, " +
             ":telefono, " +
             ":fecha_nacimiento" ,
            {
                replacements: { 
                    rol_idrol, 
                    estados_idestados, 
                    correo_electronico, 
                    nombre_completo, 
                    contrasenia: contraseniaEncriptada, 
                    telefono, 
                    fecha_nacimiento},
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(200).json({message: "Usuario agregado correctamente"});
    } 
    catch (error) {
        res.status(400).json({error: "Error al crear el usuario"});
        console.log(error);
    }
}

//Actualizacion de Usuario
exports.actualizarUsuario = async (req, res) => {
    const { idusuarios } = req.params;
    const campos  = req.body;

    if(!idusuarios || Object.keys(campos).length === 0) {
        return res.status(400).json({error: "No hay campos para actualizar"})
    }

    try {
        let contraseniaEncriptada = null;
        if (campos.contrasenia) {
            contraseniaEncriptada = await bcrypt.hash(campos.contrasenia, saltoRondas);
          }

        await sequelize.query(
            "EXEC ActualizarUsuarios @idusuarios = :idusuarios, "+
            "@rol_idrol = :rol_idrol, " +
            "@estados_idestados = :estados_idestados, " +
            "@correo_electronico = :correo_electronico, " +
            "@nombre_completo = :nombre_completo, " +
            "@contrasenia = :contrasenia, " + 
            "@telefono = :telefono, " +
            "@fecha_nacimiento = :fecha_nacimiento, " +
            "@fecha_creacion = :fecha_creacion",
            {
                replacements: { 
                    idusuarios,
                    rol_idrol: campos.rol_idrol || null, 
                    estados_idestados: campos.estados_idestados || null, 
                    correo_electronico: campos.correo_electronico || null,
                    nombre_completo: campos.nombre_completo || null, 
                    contrasenia: contraseniaEncriptada || null,
                    telefono: campos.telefono || null, 
                    fecha_nacimiento: campos.fecha_nacimiento || null,
                    fecha_creacion: campos.fecha_creacion || null
                },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        res.status(200).json({message: "Actualizado correctamente"});
    }
    catch (error) {
        console.error("Error al actualizar el usuario", error)
        res.status(500).json({error: "Error al actualizar el usuario"});
    }
    
};
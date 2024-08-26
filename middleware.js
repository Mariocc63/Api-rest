const jwt = require("jsonwebtoken");
const SECRET_KEY = '12345'; //palabra clave

    function generarToken (datos) {
        try {
            return jwt.sign({ datos }, SECRET_KEY, { expiresIn: '1h' });
        }
        catch(error) {
            return error;
        }
        
    }

    function autenticarToken(req, res, next)  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "no se proporcionó un token" });
    }

    jwt.verify(token, SECRET_KEY, (error) => {
        if (error) {
            return res.status(403).json({ message: "token inválido o expirado" });
        }
        next(); // Pasar al siguiente middleware o controlador de ruta
    });
}

module.exports = {autenticarToken,generarToken};
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Obtener el token del encabezado
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    const token = authHeader?.split(' ')[1];
    console.log('Token:', token);

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Decoded User:', req.user); // Agregar log para verificar el usuario decodificado

        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
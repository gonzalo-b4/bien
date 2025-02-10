module.exports = function (req, res, next) {
    console.log('User Role:', req.user.role); // Agregar log para verificar el rol del usuario
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: insufficient permissions' });
    }
    next();
};
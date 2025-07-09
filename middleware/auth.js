const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'el token no exste' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded.usuario
        next()
    } catch (error) {
        res.status(401).json({ msg: 'token no valido' })
    }
}
import jwt from 'jsonwebtoken'

async function IdentifyUser(req, res, next) {
    const token = req.cookies.hospital
    if (!token) {
        return res.status(404).json({
            message: 'token is not found'
        })
    }
    let decoded
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(409).json({
            message: 'decoded is not found'
        })
    }
    req.user = decoded
    next()
}
export default IdentifyUser;
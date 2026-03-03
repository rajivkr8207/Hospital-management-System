import jwt from 'jsonwebtoken'

const isDoctor = async (req, res, next) => {
    const token = req.cookies.hospital
    if (!token) {
        return res.status(404).json({
            message: 'token is not found'
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "DOCTOR") {
            return res.status(403).json({
                success: false,
                message: "Access denied. DOCTOR only."
            });
        }
        next()
    } catch (error) {
        return res.status(409).json({
            message: 'decoded is not found'
        })
    }
};
export default isDoctor;
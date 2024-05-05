import User from "../models/Master/User.js";

const isBuyerMiddleware = async (req, res, next) => {
    const {email} = req.user;

    try {
        const roleUser = await User.findOne({email: email}, {roles: 1, _id: false});
    console.log("roleUser", roleUser);
        if(roleUser.roles.includes("buyer")) {
            next();
        } else {
            return res.status(403).json({msg: "Forbidden", success: false});
        }
    } catch (error) {
        console.log(`isBuyerMiddleware() Error: ${error.message}`)
        return res.status(500).json({msg: "Internal Server Error", success: false});
    }
}

export default isBuyerMiddleware;
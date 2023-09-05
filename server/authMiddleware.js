const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }
    
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        req.userData = decodedToken;
        next();
    } catch (_) {
        return  res.status(401).json({
            message: "Authentication failed!!",
        });
    }
};

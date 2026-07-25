import Jwt from 'jsonwebtoken';
export const validateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send('There is no token');
    }
    next();
};
export const validateAdminOnly = async (req, res, next) => {
    const token = req.cookies.token;
    const requiredToken = await Jwt.verify(token, process.env.JWT_SECRET);
    console.log(requiredToken);
    const role = requiredToken.role;
    console.log(role);
    if (role !== 'admin') {
        res.status(403).send("You are not allowed to access this page");
    }
    next();
};
//# sourceMappingURL=auth-middleware.js.map
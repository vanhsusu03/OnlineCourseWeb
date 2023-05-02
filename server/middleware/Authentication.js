const isAdmin = (req, res, next) => {
    if (req.session.role === 1) {
        next();
    } else {
        return res.status(401).json({
            msg: "You're not an Admin",
        });
    }
};

const isAlreadyLogin = (req, res, next) => {
    if (typeof req.session.studentId !== 'undefined') {
        return res.status(200).json({
            msg: 'Already login!',
            redirect: '/info'
        });
    } else {
        next();
    }
};

const isAuth = (req, res, next) => {
    if (typeof req.session.studentId === 'undefined') {
        return res.status(401).json({
            msg: 'You need to log in first',
            redirect: '/login',
        });
    } else {
        next();
    }
};

module.exports = { isAdmin, isAlreadyLogin, isAuth };
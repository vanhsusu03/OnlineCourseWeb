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
    if (req.session.student_id) {
        return res.status(200).json({
            msg: 'Already login!',
            redirect: '/',
            cookie: req.headers.cookie,
        });
    } else {
        next();
    }
};

const isAuth = (req, res, next) => {
    if (!req.student_id) {
        return res.status(401).json({
            msg: 'You need to log in first',
            redirect: '/login',
        });
    } else {
        console.log(req.session.cookie);
        next();
    }
};

module.exports = { isAdmin, isAlreadyLogin, isAuth };
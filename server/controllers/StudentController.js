const connection = require('../models');

module.exports.register = function (req, res) {
    let student = {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'birth': req.body.birth,
    }
    connection.query('SELECT * FROM student WHERE username = ? AND email = ? AND phone = ?',
        [student.username, student.email, student.phone], function (error, res, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (res.length > 0) {
                // Authenticate the user
                req.send('Username has existed!');
            } else {
                connection.query('INSERT INTO accounts(firstname,lastname,email,username,password,phone,birthday) VALUES(?,?,?,?,?,?,?)',
                    [student.firstname, student.lastname, student.email, student.username, student.password, student.phone, student.birth],
                    function (error, results) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        // If the account exists

                    });
                req.send('Register success!');
            }
            res.end();
        });
}

module.exports.login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM student WHERE username = ? AND password = ?',
            [username, password], function (error, res, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (res.length > 0) {
                    // Authenticate the user
                    req.session.loggedin = true;
                    req.session.username = username;
                    // Redirect to home page
                    req.redirect('/');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }
                req.end();
            });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}

module.exports.checkLoggedin = function (req, res) {
    // If the user is loggedin
    if (req.session.loggedin) {
        // Output username
        req.send('Welcome back, ' + req.session.firstname + '!');
    } else {
        // Not logged in
        req.send('Please login to view this page!');
    }
    req.end();
}
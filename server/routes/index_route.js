const adminRoute = require('./admin_route');
const cartRoute = require('./cart_route');
const categoryRoute = require('./category_route');
const courseRoute = require('./course_route');
const depositRoute = require('./deposit_route');
const instructorRoute = require('./instructor_route');
const orderRoute = require('./order_route');
const paymentRoute = require('./payment_route');
const searchingRoute = require('./searching_route');
const studentRoute = require('./student_route');
const studyRoute = require('./study_route');

function routesInit(app) {
    app.use('/', adminRoute);
    app.use('/', cartRoute);
    app.use('/', categoryRoute);
    app.use('/', courseRoute);
    app.use('/', depositRoute);
    app.use('/', instructorRoute);
    app.use('/', orderRoute);
    app.use('/', paymentRoute);
    app.use('/', searchingRoute);
    app.use('/', studentRoute);
    app.use('/', studyRoute);
}

module.exports = routesInit;
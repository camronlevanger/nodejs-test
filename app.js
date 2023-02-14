if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}

const Koa = require('koa');
const koaStatic = require('koa-static');

const app = new Koa();


// Register Routes
let indexRouter = require('./routes/index');

app.use(indexRouter.routes())
  .use(indexRouter.allowedMethods());


// Serve static files from public directory
app.use(koaStatic('./dist'));

module.exports = app;

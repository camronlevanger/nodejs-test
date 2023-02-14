const members = require('../members');

const KoaRouter = require('koa-router');

const indexRouter = new KoaRouter();

indexRouter.get('/members', async function(ctx) {
	console.dir(ctx.query)
	data = await members.fetchMembers(ctx.query.page, 5, ctx.query.filter);
	console.log(data)
	ctx.body = data;
});

indexRouter.get('/members/count', async function(ctx) {
	console.dir(ctx.query)
	data = await members.fetchMemberCount();
	console.log(data)
	ctx.body = data;
});


module.exports = indexRouter;

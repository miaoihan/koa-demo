// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

//解析req中的body
const bodyParaser = require('koa-bodyparser');

//3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML
app.use(async (ctx, next) => {
    console.log(`${ctx.method}:${ctx.url}`)
    await next()
});

//打印程序运行时间
app.use(async (ctx, next) => {
    console.time('Time')
    await next();
    console.timeEnd('Time')
});

//路由部分
//重构到controller


router.get('/hello/:name', async (ctx, next) =>{
    let name = ctx.params.name
    ctx.body = `<h1>Hello,${name}!</h1>`
});

// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });
app.use(bodyParaser());

app.use(router.routes())

// 在端口3000监听:
app.listen(3000);
console.log('app started at port http://127.0.0.1:3000 ...');
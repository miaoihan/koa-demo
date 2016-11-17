// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

router.get('/', async function(ctx, next){
    // console.dir(ctx);
    ctx.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value=""></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
});

router.post('/signin', async (ctx, next) => {
    // console.dir(ctx);
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'han' && password === '1234') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

export default router;
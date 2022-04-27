const Koa = require("koa");
const router = require("./router");
const koaBody = require("koa-body");

const app = new Koa();

app.use(koaBody());
app.use(router.routes());

app.listen(6060);
console.log(`服务已开启，端口号: 6060`);

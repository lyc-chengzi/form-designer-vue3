const KoaRouter = require("koa-router");
const registerHomeRouter = require("./homeRouter");

const router = new KoaRouter();
registerHomeRouter(router);
module.exports = router;

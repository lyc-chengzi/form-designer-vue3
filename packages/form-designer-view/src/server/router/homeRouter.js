const fs = require("fs");
const Vue = require("vue");
const path = require("path");
const vueServerRenderer = require("vue-server-renderer");
// const view = require("../../views/cms/renderer/templateRenderer/index.vue");
const rootPath = process.cwd();
const templatePath = path.join(rootPath, 'src/server/html/default.template.html');
const jsonPath = path.join(rootPath, 'src/views/cms/examples/demo1.json');
console.log("templatePath", templatePath);

function createApp(ctx){
    const app = new Vue({
        data: {
            url: ctx.req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    });
    return app;
}

function registerHomeRouter(router) {
    router
        .get("/", async function(xtx, next){
            ctx.body = "你好";
            next();
        })
        .get("/ssr", async function(ctx, next){
            ctx.set("content-type", "text/html");
            const renderer = vueServerRenderer.createRenderer(
                {
                    template: fs.readFileSync(templatePath, 'utf-8'),
                }
            );
            const jsonData = fs.readFileSync(jsonPath, 'utf-8');
            // console.log("jsonData", jsonData);
            
            const context = {
                title: '测试ssr',
                metaTitle: "一起来测试ssr",
            };
            renderer.renderToString(createApp(ctx), context, (err, html) => {
                if(err) {
                    ctx.body = "<div>error</div>";
                    next();
                }else {
                    ctx.body = html;
                    next();
                }
            });
        });
    return router;
}

module.exports = registerHomeRouter;

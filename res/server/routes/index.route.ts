import {Router} from "../misc/route";
import {contentType, enableTranslation} from "../misc/htmlViewEngine";

const router = new Router("/");

router.get("/", async (req) => {
    return new Response(await enableTranslation("./res/frontend/views/index.html", req), contentType);
});

router.get("/favicon.ico",  (req) => {
    return new Response("404", {status: 404});
});

export const index_route = router;

import {Router} from "../misc/route";

const router = new Router("/static");

router.get("/", (req: Request) => {
    return new Response("Static route");
});

router.get("/css/:id", async (req: Request, params) => {
    const {id} = params;
    if (await Bun.file(`./res/frontend/style/${id}`).exists() === false) {
        return new Response("404", {status: 404});
    } else {
        return new Response(await Bun.file(`./res/frontend/style/${id}`).text(), {
            headers: {
                "Content-Type": "text/css",
            },
        });
    }
});

router.get("/js/:id", async (req: Request, params) => {
    const {id} = params;
    if (await Bun.file(`./res/frontend/js/${id}`).exists() === false) {
        return new Response("404", {status: 404});
    } else {
        return new Response(await Bun.file(`./res/frontend/js/${id}`).text(), {
            headers: {
                "Content-Type": "text/javascript",
            },
        });
    }
});

export const static_route = router;
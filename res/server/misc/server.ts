import { Router } from "./route";
import { Color, Logger } from "./logging";



let router_list: Router[] = [];

export let app = {
    use: (routes: Router) => {
        router_list.push(routes);
    }
}

const port = Bun.env.PORT || 4000;

export let server = Bun.serve({
    port: port,
    fetch(req: Request): Response | Promise<Response> | any {
        Logger.http(req);
        let url: string = new URL(req.url).pathname;
        for (let i = 0; i < router_list.length; i++) {
            const router = router_list[i];
            if(url.startsWith(router.getBaseRoute) || url.startsWith(router.getBaseRoute.slice(0, -1))) {
                let router_callback = router.run(req)
                if(router_callback != undefined) return router_callback;
            }
        }
        Logger.error("Fallback to default 404")
        return new Response(Bun.file("./res/frontend/views/404.html"), {status: 404});
    }
})
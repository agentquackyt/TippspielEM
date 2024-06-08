import {Router} from "../misc/route";

const router = new Router("/static");

router.get("/", (req: Request) => {
    return new Response("Static route");
});

export const static_route = router;
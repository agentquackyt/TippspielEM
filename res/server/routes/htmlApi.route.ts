import {Router} from "../misc/route";
import {getLanguages, HTMLTemplateEngine} from "../misc/htmlViewEngine";
import {translations} from "../misc/translations";

const router = new Router("/api/html");

router.get("/", (req) => {
    return new Response("<h1>Hello World</h1>");
});

const exampleData = {
    team1: "Germany",
    team2: "france",
    score: "6:1",
    isLive: "",
    matchLocation: "Berlin",
    matchDate: "09.06.2024, 20:00",
}


router.get("/football/game/:id", async (req, params) => {
    const {id} = params;
    let lang = "en";

    if(req.headers.has("Accept-Language")) {
        const languages = getLanguages(req);
        lang = languages[0];
        console.log(languages);
    }
    let translationsData = (await translations)[lang];

    const translatedData = {
        ...exampleData
    }

    for (let key in translatedData) {
        if(translationsData === undefined) break;
        if(translationsData[translatedData[key].toLowerCase()] !== undefined) {
            translatedData[key] = translationsData[translatedData[key].toLowerCase()];
        }
    }

    const htmlEngine = new HTMLTemplateEngine("./res/frontend/parts/game_view.html");
    await htmlEngine.enable();

    return new Response(htmlEngine.render(translatedData, translationsData !== undefined ? translationsData : {}), {
        headers: {
            "Content-Type": "text/html",
        },
    });
});




export const html_api_router = router;
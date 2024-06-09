import {translations} from "./translations";

class HTMLTemplateEngine {
    private readonly template: string;
    private htmlString: string;

    constructor(template: string) {
        this.template = template;
    }

    public async enable() {
        if (await Bun.file(this.template).exists() === false) {
            this.htmlString = "";
            throw new Error(`Template file not found: ${this.template}`);
        }
        let file = Bun.file(this.template);
        this.htmlString = await file.text();
    }

    public render(data: any, translations?: any): string {
        let html = this.htmlString || "";
        // Extend this method to support translations with this syntax: @KEY:TRANSLATE
        if (translations !== undefined) {
            for (let key in translations) {
                html = html.replace(new RegExp(`@${key.toUpperCase()}:TRANSLATE`, "ig"), translations[key]);
            }
        }
        for (let key in data) {
            html = html.replace(new RegExp(`@${key.toUpperCase()}`, "ig"), data[key]);
        }
        return html;
    }
}


function getLanguages(req: Request): string[] {
    const lang = req.headers.get("Accept-Language");
    const langParts = lang.split(",");
    for (let i = 0; i < langParts.length; i++) {
        const langPart = langParts[i];
        const lang = langParts[0];
        langParts[i] = langPart.split(";")[0].split("-")[0].toLowerCase();
    }
    return langParts;
}

async function enableTranslation(file: string, req: Request): Promise<string> {
    let lang = "en";

    if (req.headers.has("Accept-Language")) {
        const languages = getLanguages(req);
        lang = languages[0];
        console.log(languages);
    }
    let translationsData = (await translations)[lang];

    const htmlEngine = new HTMLTemplateEngine(file);
    await htmlEngine.enable();
    return htmlEngine.render({lang}, translationsData !== undefined ? translationsData : {})
}

const contentType = { headers: { "Content-Type": "text/html", } };

export {HTMLTemplateEngine, getLanguages, enableTranslation, contentType};
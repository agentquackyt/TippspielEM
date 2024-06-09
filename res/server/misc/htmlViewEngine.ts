
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

export {HTMLTemplateEngine};
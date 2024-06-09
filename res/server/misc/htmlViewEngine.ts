
class HtmlEngine {
    private template: string;
    private htmlString: string;

    constructor(template: string) {
        this.template = template;
        this.readFile().then(() => {});
    }

    private async readFile() {
        if (await Bun.file(this.template).exists() === false) {
            this.htmlString = "";
            throw new Error(`Template file not found: ${this.template}`);
        }
        let file = Bun.file(this.template);
        this.htmlString = await file.text();
    }
}
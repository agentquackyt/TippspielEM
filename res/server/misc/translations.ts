import { readdir } from "node:fs/promises";
import {Logger} from "./logging";

async function getTranslations() {
    // @ts-ignore
    const files = await readdir(import.meta.dir+"./../../../config/translations");
    let translations = {};
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if(file.endsWith(".json")) {
            const lang = file.split(".")[0].split("-")[0].toLowerCase();
            Logger.info(`Loading translations for ${lang}`);
            translations[lang] = await Bun.file(`./config/translations/${file}`).json();
        }
    }
     // console.log(translations)
    return translations;
}


export const translations = getTranslations();
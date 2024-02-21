import { link } from "fs";
import { startPropeteerSevice } from "service/start.propetter.service";
import { IFileGenerator } from "interface/file-generator-interface";

 export class CrawlerCorinthiasController {
    constructor(){}

    public async init() {
        try {
            const page = await startPropeteerSevice.start(
            'https://www.corinthians.com.br/noticias');

            const selector = '.ct-news-list .ct-news-list-item';
            await page.waitForSelector(selector);

            const nodes = await page.$$(selector);
            const payload: Array <IFileGenerator> = [];

            for(const node of nodes){
                const link = await page.evaluate((eL:Element) => {
                    return eL
                      .querySelector('.ct-news-list-item-content a')
                      ?.getAttribute('href');
                }, node);

                const titulo = await page.evaluate((eL: Element) => {
                    return eL
                     .querySelector('.ct-news-list-item-content a h4')
                     ?.innerHTML.replace(/\n/g, '')
                     .replace(/<p>.*?<\/p>/g, '').trim();
                }, node);

                const data = await page.evaluate((eL: Element) => {
                    return eL.querySelector('.ct-news-list-item-content a h4 p')
                    ?.innerHTML.replace(/\n/g, '')
                    .replace(/<strong>.*?<\/strong>/g, '')
                    .replace(/\-/g, '')
                    .trim();
                }, node)

                if(!link || !titulo || !data) 
                throw new Error('Esses itens não são validos');


               payload.push({
                link,
                titulo,
                data,
               });

            
            }
           

            startPropeteerSevice.fileGenerator(payload, '_corinthians');
            page.close();
        } catch (error) {
            console.log(Error)
        }
    }
}
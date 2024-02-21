import puppeteer from 'puppeteer';
import { startPropeteerSevice } from 'service/start.propetter.service';
import { IFileGenerator } from 'interface/file-generator-interface';

export class CrawlerPalmeirasController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public async init() {
   try {
    const page = await startPropeteerSevice.start(
      'https://www.palmeiras.com.br/central-de-midia/noticias/',
    );

    const selector = '.central-de-midia-container .items-central';
    await page.waitForSelector(selector);

    const nodes = await page.$$(selector);
    const payload: Array<IFileGenerator> = [];

    for(const node  of nodes) {

      const link = await page.evaluate((eL: Element) => {
        return eL.querySelector('a')?.getAttribute('href')
      }, node);

      const titulo = await page.evaluate((el:Element) => {
        return el.querySelector('a .items-central-txt h4')?.textContent;
      },node);

      const data = await page.evaluate((eL : Element) => {
        return eL.querySelector('a .items-central-date')?.textContent;
      },node)

      if (!link || !titulo || !data)
      throw new Error('Esses itens não são validos')

      payload.push({
        link,
        titulo,
        data,
      });
    }

   
    startPropeteerSevice.fileGenerator(payload, '_Palmeiras');
   page.close();
   } catch (error) {
     console.log(error);
   }   
  }
}

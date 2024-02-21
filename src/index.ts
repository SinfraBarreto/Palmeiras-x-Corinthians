import { CrawlerCorinthiasController } from 'controller/crawler-corinthias.controller';
import { CrawlerPalmeirasController } from 'controller/crawler-palmeiras.controller';

class Init {
  constructor() {
    this._init();
  }

  private _init() {
    new CrawlerPalmeirasController().init();
    new CrawlerCorinthiasController().init();
    console.log('Inicializado com sucesso!');

  }
}

new Init();  

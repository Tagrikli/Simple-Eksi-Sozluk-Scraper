import selenium from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

import EksiSozluk from './eksisozluk';


const builder = new selenium.Builder();
const options = new Options()
options.addArguments(...['headless']);


(async () => {

    const chrome = await builder.setChromeOptions(options).withCapabilities(selenium.Capabilities.chrome()).build();

    const eksi = new EksiSozluk(chrome);
    const basliklar = await eksi.getDebe();

    console.log(basliklar);

    chrome.quit()


})()



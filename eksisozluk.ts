import selenium, { By } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { URL } from 'url';


export default class EksiSozluk {
    homepage: URL
    driver: selenium.WebDriver


    constructor(driver: selenium.WebDriver) {
        this.homepage = new URL('https://eksisozluk.com/');
        this.driver = driver;
    }



    async getGundem(): Promise<string[]> {

        var result: string[] = []

        const gundemURL = new URL('/basliklar/m/populer', this.homepage);
        gundemURL.searchParams.append('p', '0');

        for (let i of Array(5).keys()) {

            gundemURL.searchParams.set('p', (i + 1).toString());
            await this.driver.get(gundemURL.toString());

            const topic_list = await this.driver.findElements(By.className("topic-list partial mobile"));
            const list = await topic_list[0].findElements(By.css('li'));
            for (let item of list) {

                const text = await item.getAttribute('innerText');
                if (text.trim().length) {
                    const parsed = text.trim().split('\n')[0];
                    result.push(parsed);
                }

            }
        }

        return result

    }

    async getDebe(): Promise<string[]> {


        var result: string[] = []

        const debeURL = new URL('/m/debe', this.homepage);
        await this.driver.get(debeURL.toString());

        const topic_list = await this.driver.findElements(By.className("topic-list partial mobile"));
        const list = await topic_list[0].findElements(By.css('li'));
        for (let item of list) {
            const text = await item.getAttribute('innerText');
            if (text.trim().length) {

                const parsed = text.trim().split('\n')[0];
                result.push(parsed);
            }
        }


        return result

    }




}
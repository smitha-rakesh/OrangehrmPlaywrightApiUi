import { Page } from "@playwright/test";
import { config } from "../test.config";

export class LandingPage{

    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }

    async land(url: string)
    {
        await this.page.goto(config.url + url);
        await this.page.waitForLoadState('domcontentloaded',{timeout: 30000});
    }
}
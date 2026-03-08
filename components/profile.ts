import { Page } from "@playwright/test";

export class UserProfile{

    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }

    private loggedInUserProfile = () => this.page.locator('.oxd-userdropdown-tab');
    private logoutButton = () => this.page.getByRole('menuitem', { name: 'Logout' });

    async logout()
    {
        await this.loggedInUserProfile().click();
        await this.logoutButton().click();
        await this.page.waitForLoadState('domcontentloaded',{timeout: 30000});
        return this.page.url();
    }
}
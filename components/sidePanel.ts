import { Page } from "@playwright/test";

export class SidePanel{

    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }

    sidePanel = () => this.page.getByRole('navigation', { name: 'Sidepanel' });
    private collapseExpandSidePanelButton = () => this.page.locator('.oxd-icon-button.oxd-main-menu-button');
    private collapsedSidePanel = () => this.page.locator('.oxd-sidepanel.toggled');
    private expandedSidePanel = () => this.page.locator('.oxd-sidepanel');
    private pim = () => this.page.locator('a[href*="viewPimModule"]');

    async toggleSidePanelButton()
    {
        await this.collapseExpandSidePanelButton().click();
    }

    async isSidePanelCollapsed()
    {
        return await this.collapsedSidePanel().isVisible();
    }

    async isSidePanelExpanded()
    {
        return await this.expandedSidePanel().isVisible();
    }

    async gotoPIM()
    {
        await this.pim().click();
    }
}
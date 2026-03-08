import { Page } from "@playwright/test";
import { config } from "../test.config";

export class LoginPage {

  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  username = () => this.page.getByRole('textbox', { name: 'Username' });
  password = () => this.page.getByRole('textbox', { name: 'Password' });
  loginBtn = () => this.page.getByRole('button', { name: 'Login' });

  async login() {

    await this.username().fill(config.userName);
    await this.password().fill(config.userPassword);

    await this.loginBtn().click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async launchURL() {
    await this.page.goto(config.url);
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.page.context().storageState({
      path: 'storageState.json'
    });
  }

}
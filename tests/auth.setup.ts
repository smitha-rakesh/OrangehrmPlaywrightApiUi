import { test as setup } from '@playwright/test';
import { config } from "../test.config";

setup('login and save state', async ({ page }) => {

  await page.goto(config.url);

  await page.fill('input[name="username"]', config.userName);
  await page.fill('input[name="password"]', config.userPassword);

  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(10000);
  await page.context().storageState({
    path: 'storageState.json'
  });

  const cookies = await page.context().cookies();
  console.log(cookies);


  await page.close();

});
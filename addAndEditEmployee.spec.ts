import { test, expect } from '@playwright/test';

test.describe("UI test", async()=>{

    test('Add and Edit Employee detail', async({page, request}) =>{
       await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
       await page.waitForLoadState('networkidle',{timeout: 30000});

       //Login to org
       await page.getByRole('textbox', { name: 'Username' }).fill("Admin", {timeout: 500});
       await page.getByRole('textbox', { name: 'Password' }).fill("admin123", {timeout: 500});

       await page.getByRole('button', { name: 'Login' }).click();

       await page.waitForLoadState('networkidle',{timeout: 30000});

       const cookies = await page.context().cookies();
       const cookieHeader = cookies
  .map(c => `${c.name}=${c.value}`)
  .join('; ');

      //  //Side panel is displayed and functional
      //  page.getByRole('navigation', { name: 'Sidepanel' }).waitFor({state:"visible", timeout: 40000});
      //  //await expect( page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
      //  await page.locator('.oxd-icon-button.oxd-main-menu-button').click();
      //  await expect(page.locator('.oxd-sidepanel.toggled')).toBeVisible();
      //  await page.locator('.oxd-icon-button.oxd-main-menu-button').click();
      //  await expect(page.locator('.oxd-sidepanel')).toBeVisible();

       //go to PIM
       await page.locator('a[href*="viewPimModule"]').click();

    //    const response = await request.get( "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
    //   {
    //   headers: {
    //     "Accept": "application/json",
    //     "X-Requested-With": "XMLHttpRequest"
    //   }
    // }
    // );

    // expect(response.status()).toBe(200);

    // const body = await response.json();

    // expect(body).toHaveProperty('data');

    // return body.data;
  //    const apiContext = await ({

  //   baseURL: 'https://opensource-demo.orangehrmlive.com',

  //   extraHTTPHeaders: {
  //     Cookie: 'orangehrm=n50kmf35ou7ca0sq55dr94mi8r'
  //   }

  // });

  // const response = await apiContext.get(
  //   'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees'
  // );

  // expect(response.status()).toBe(200);

       //click add
    //    await page.getByRole('button', { name: 'Add' }).click();


    //    const random5Digit = Math.floor(10000 + Math.random() * 90000);
    //    console.log(random5Digit);

    //    //Enter firstname/lastname
    //    await page.getByRole('textbox', { name: 'First Name' }).waitFor({state: "visible", timeout: 40000})
    //    await page.getByRole('textbox', { name: 'First Name' }).fill("test");
    //    await page.getByRole('textbox', { name: 'Last Name' }).fill("FN_"+random5Digit);
    //    await page.locator('//*[@class="oxd-input-group oxd-input-field-bottom-space"]//*[@class="oxd-input oxd-input--active"]').fill(random5Digit.toString());
    //    //await page.locator('//*[@class="oxd-input-group oxd-input-field-bottom-space"]//*[@class="oxd-input oxd-input--active"]').type(random5Digit.toString());

    //    //Click Save
    //    await page.getByRole('button', { name: 'Save' }).first().click();
    //   await page.locator("//*[@class='oxd-toast oxd-toast--success oxd-toast-container--toast']").waitFor({state:"visible", timeout: 50000});
    //     await page.getByRole('heading', { name: 'Personal Details', level: 6 }).waitFor({state:"visible", timeout: 50000});
    //     await page.getByRole('button', { name: 'Save' }).first().click();
    //     await page.getByRole('heading', { name: 'Personal Details', level: 6 }).waitFor({state:"visible", timeout: 50000})


    //    //Go to Employees list
    //    await page.locator('.oxd-topbar-body-nav-tab.--visited').click();
    // //    await page
    // //     .locator('.oxd-input-group').waitFor({state:"visible", timeout: 30000});
    //     await page
    //     .locator('.oxd-input-group')
    //     .locator('.oxd-input.oxd-input--active').fill(random5Digit.toString());

    //     await page.getByText('Search', { exact: true }).click();

    //    //Go to row and clcik edit
    //     let row = await page.locator('.oxd-table-row', { hasText: random5Digit.toString() });
    //     //await row.waitFor({state:"visible", timeout: 30000});
    //     await row.locator('button:has(.bi-pencil-fill)').click();

    //     //Go to Job 
    //     await page.getByRole('link', { name: 'Job' }).click();
    //     await page.locator('.oxd-input-group', { hasText: 'Job Title' }).waitFor({state:"visible", timeout: 50000});
    //     await page.locator('.oxd-input-group', { hasText: 'Job Title' })
    //       .locator('.oxd-select-text')
    //       .click();

    //     await page.locator("//span[text() = 'Automaton Tester']").click();

    //     await page.getByRole('button', { name: 'Save' }).click();

    //     //Go to Employees list
    //    await page.locator('.oxd-topbar-body-nav-tab.--visited').click();

    //     await page
    //     .locator('.oxd-input-group')
    //     .locator('.oxd-input.oxd-input--active').fill(random5Digit.toString());

    //     await page.getByText('Search', { exact: true }).click();
    //    //Go to row and clcik edit
    //     row = page.locator('.oxd-table-row',{ hasText: random5Digit.toString() });
    //     ///await row.scrollIntoViewIfNeeded();
    //     await row.locator('button:has(.bi-pencil-fill)').click();

    //     //Go to Job 
    //     await page.getByRole('link', { name: 'Job' }).click();
    //     //
    //     await page.locator('.oxd-input-group', { hasText: 'Job Title' }).waitFor({state:"visible", timeout: 50000});
    //     await page.waitForTimeout(15000);
    //     expect(await page.locator('.oxd-input-group', { hasText: 'Job Title' }).locator('.oxd-select-text.oxd-select-text--active').innerText()).toBe('Automaton Tester');

    //     //Logout

    //     await page.locator('.oxd-userdropdown-tab').click();
    //     await page.getByRole('menuitem', { name: 'Logout' }).click();

    });

});

function browser(arg0: { baseURL: string; extraHTTPHeaders: { Cookie: string; }; }) {
  throw new Error('Function not implemented.');
}

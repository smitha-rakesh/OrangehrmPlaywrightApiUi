import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { LandingPage } from '../pages/landingPage.ts';
import { PimPage } from '../pages/pimPage';
import { SidePanel } from '../components/sidePanel.ts';
import { UserProfile } from '../components/profile.ts';
import { EmployeeService } from '../util/apiEmployeeService.ts';

type MyFixtures = {

  loginPage: LoginPage
  landingPage: LandingPage
  pimPage: PimPage
  sidePanelComponent: SidePanel
  userProfileComponent: UserProfile
  employeeService: EmployeeService
}

export const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

    landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },

  sidePanelComponent: async ({ page }, use) => {
    await use(new SidePanel(page));
  },

  userProfileComponent: async ({ page }, use) => {
    await use(new UserProfile(page));
  },

  employeeService: async ({ request }, use) => {
    await use(new EmployeeService(request));
  }

})

export { expect } from '@playwright/test'
import { test, expect } from '../../fixtures/testFixture';
import { config } from "../../test.config";

test.describe("UI test", async () => {

  test('Add and Edit Employee detail', async ({
    landingPage,
    sidePanelComponent,
    pimPage,
    userProfileComponent,
    employeeService
  }) => {

    await landingPage.land(config.landingPage);

    //Side panel is displayed and functional
    await sidePanelComponent.sidePanel().waitFor({ state: "visible", timeout: 40000 });
    await sidePanelComponent.toggleSidePanelButton();
    expect(await sidePanelComponent.isSidePanelCollapsed()).toBeTruthy();
    await sidePanelComponent.toggleSidePanelButton();
    expect(await sidePanelComponent.isSidePanelExpanded()).toBeTruthy();

    //go to PIM
    await sidePanelComponent.gotoPIM();

    //Create Employee record
    const employeeID = await pimPage.addEmployee("FN", "LN");

    //Edit Job title for the created Employee
    await pimPage.searchEmployeeToEdit(employeeID);
    const jobTitleSet = "Automaton Tester";
    await pimPage.editJobTitle(jobTitleSet);

    //Validate the changed job title is retained
    const jobTitle = await pimPage.getJobtitleForEmployeeId(employeeID);
    expect(jobTitle).toBe(jobTitleSet);

    //API function to get all employees and validate the newly created employee exist
    const apiEmployee = await employeeService.findEmployeeById(employeeID);

    expect(apiEmployee).toBeDefined();
    expect(apiEmployee.employeeId).toBe(employeeID);
    expect(apiEmployee.firstName).toBe("FN");
    expect(apiEmployee.lastName).toBe("LN" + employeeID);
    expect(apiEmployee.jobTitle).toBe(jobTitleSet)

    //Logout
    const loggedOutUrl = await userProfileComponent.logout();
    expect(loggedOutUrl).toBe(config.url + config.onLogout);
  });
});
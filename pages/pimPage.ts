import { Page } from "@playwright/test";
import { RandomGenerator } from "../util/randomGenerator";

export class PimPage {

    readonly page: Page;
    readonly random: RandomGenerator;
    constructor(page: Page) {
        this.page = page;
        this.random = new RandomGenerator();

    }

    private addEmployeeButton = () => this.page.getByRole('button', { name: 'Add' });
    private firstName = () => this.page.getByRole('textbox', { name: 'First Name' });
    private lastName = () => this.page.getByRole('textbox', { name: 'Last Name' });
    private employeeId = () => this.page.locator('//*[@class="oxd-input-group oxd-input-field-bottom-space"]//*[@class="oxd-input oxd-input--active"]');
    private saveButton = () => this.page.getByRole('button', { name: 'Save' });

    private saveSuccessToast = () => this.page.locator("//*[@class='oxd-toast oxd-toast--success oxd-toast-container--toast']");

    private personalDetailsHeading = () => this.page.getByRole('heading', { name: 'Personal Details', level: 6 });


    private employeeListSubTab = () => this.page.locator('.oxd-topbar-body-nav-tab.--visited');
    private employeeIdSearchBox = () => this.page
        .locator('.oxd-input-group')
        .locator('.oxd-input.oxd-input--active');
    private searchButton = () => this.page.getByText('Search', { exact: true });

    private jobDetailsButton = () => this.page.getByRole('link', { name: 'Job' });
    private jobTitle = () => this.page.locator('.oxd-input-group', { hasText: 'Job Title' });
    private jobTitleDropDown = () => this.page.locator('.oxd-input-group', { hasText: 'Job Title' }).locator('.oxd-select-text');
    private selectedjobTitle = () => this.page.locator('.oxd-input-group', { hasText: 'Job Title' }).locator('.oxd-select-text.oxd-select-text--active');


    // Locator Paths
    private searchedRow = '.oxd-table-row';
    private editEmployeeDetail = 'button:has(.bi-pencil-fill)';
    private jobTitleDropDownSelection = "//span[text() = '{0}']";


    //create an employee record
    async addEmployee(firstName: string, lastName: string) {
        const randomEmployeeId = await this.random.random5Digit.toString();

        await this.addEmployeeButton().click();
        //Enter firstname/lastname
        await this.firstName().waitFor({ state: "visible", timeout: 40000 })
        await this.firstName().fill(firstName);
        await this.lastName().fill(lastName + randomEmployeeId);
        await this.employeeId().fill(randomEmployeeId.toString());

        //Click Save
        await this.saveButton().first().click();
        await this.saveSuccessToast().waitFor({ state: "visible", timeout: 50000 });
        await this.personalDetailsHeading().waitFor({ state: "visible", timeout: 50000 });
        await this.saveButton().first().click();
        await this.personalDetailsHeading().waitFor({ state: "visible", timeout: 50000 });
        return randomEmployeeId;
    }

    //Serch employee record based on employeeId
    async searchEmployee(employeeid: string) {
        await this.employeeListSubTab().click();
        await this.employeeIdSearchBox().fill(employeeid);
        await this.searchButton().click();
    }

    // Search employee and edit details
    async searchEmployeeToEdit(employeeid: string) {
        await this.searchEmployee(employeeid);

        let row = await this.page.locator(this.searchedRow, { hasText: employeeid });
        await row.locator(this.editEmployeeDetail).click();
    }


    // Select the specified job title
    async editJobTitle(jobTitleParam: string)
    {
        //Go to Job 
        await this.jobDetailsButton().click();
        await this.jobTitle().waitFor({state:"visible", timeout: 50000});
        await this.jobTitleDropDown().click();

        const title = this.jobTitleDropDownSelection.replace("{0}", jobTitleParam);
        await this.page.locator(title).click();
        await this.saveButton().first().click();
    }

    //Get the job title for specific employee id
    async getJobtitleForEmployeeId(employeeid: string)
    {
        await this.searchEmployeeToEdit(employeeid);
        await this.jobDetailsButton().click();
        await this.jobTitle().waitFor({state:"visible", timeout: 50000});
        await this.page.waitForTimeout(15000);
        return this.selectedjobTitle().innerText();
    }
}
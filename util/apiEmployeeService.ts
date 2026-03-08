import { APIRequestContext, expect } from '@playwright/test';
import { config } from "../test.config";

export class EmployeeService {

  readonly request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  //Get all employee record and validatate schema
  async getEmployees() {

    const response = await this.request.get(config.url + config.apiUrlToGetAllEmployees,
      {
        headers: {
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty("employeeId");
    expect(body.data[0]).toHaveProperty("firstName");
    expect(body.data[0]).toHaveProperty("lastName");

    return body.data;
  }

  //Get Employee Id, First Name, Last Name, Job title for the employee Id
  async findEmployeeById(id: string) {

    const employees = await this.getEmployees();

    let emp = employees.find((emp: {
      employeeId: string
    }) =>
      emp.employeeId === id
    );

    //fetch job details using the employee number
    const apiForJobDetails = config.url + config.apiUrlToGetJobDetailsForAnEmployee.replace("{empNo}", emp.empNumber);
    console.log(apiForJobDetails);
    const response = await this.request.get(apiForJobDetails,
      {
        headers: {
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
    console.log("=========================================================================");
    console.log(body.data);

    return {
      employeeId: emp.employeeId,
      firstName: emp.firstName,
      lastName: emp.lastName,
      jobTitle: body.data.jobTitle.title
    }
  }
}
const config = {

    url: 'https://opensource-demo.orangehrmlive.com',
    landingPage: "/web/index.php/dashboard/index",
    apiUrlToGetAllEmployees: '/web/index.php/api/v2/pim/employees?limit=500',
    apiUrlToGetJobDetailsForAnEmployee: '/web/index.php/api/v2/pim/employees/{empNo}/job-details',
    onLogout: '/web/index.php/auth/login',
    userName: 'Admin',
    userPassword: 'admin123'

}

export {config}
import nodemailer from "nodemailer";
import fs from "fs";

async function sendReport() {

  const report = fs.readFileSync(
    "playwright-report/index.html",
    "utf8"
  );

  const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }

  });

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: "team@company.com",

    subject: "Playwright Test Execution Report",

    html: `
      <h2>Automation Execution Summary</h2>
      <p>Playwright tests completed</p>

      <p>See attached HTML report.</p>
    `,

    attachments: [
      {
        filename: "report.html",
        content: report
      }
    ]
  });

}

sendReport();
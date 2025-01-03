// emailTemplates.js
exports.generateAccountActivationSuccessEmail = (username, email, phoneNumber, password, referralLink) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Account Activation Successful</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
          }
          .content {
            padding: 20px;
            text-align: left;
          }
          .content p {
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Activation Successful</h1>
          </div>
          <div class="content">
            <p>Dear ${username},</p>
            <p>Your account has been activated successfully.</p>
            <p>Please use the following credentials to login to your account:</p>
            <ul>
              <li><strong>Username:</strong> ${username}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone Number:</strong> ${phoneNumber}</li>
              <li><strong>Password:</strong> ${password}</li>
            </ul>
            <p>You can also use the following link to refer a friend:</p>
            <p style="text-align: center;">
              <a href="${referralLink}" class="button">Refer a Friend</a>
            </p>
            <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
            <p><a href="${referralLink}">${referralLink}</a></p>
            <p>If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Elite Connections LTD. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };  
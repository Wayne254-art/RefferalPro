// emailTemplates.js
exports.generatePasswordChangeNotificationEmail = (username, loginLink, forgotPasswordLink) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Password Change Notification</title>
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
            background-color: #FF6347;
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
            background-color: #FF6347;
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
            <h1>Password Change Notification</h1>
          </div>
          <div class="content">
            <p>Dear ${username},</p>
            <p>We wanted to inform you that your account password was changed recently.</p>
            <p>If you initiated this change, no further action is required.</p>
            <p>If you did not change your password, please use the following link to reset your password immediately:</p>
            <p style="text-align: center;">
              <a href="${forgotPasswordLink}" class="button">Reset Password</a>
            </p>
            <p>You can also log in to your account using the following link to verify your account details:</p>
            <p style="text-align: center;">
              <a href="${loginLink}" class="button">Login to Your Account</a>
            </p>
            <p>If the buttons above do not work, please copy and paste the following links into your web browser:</p>
            <p><a href="${forgotPasswordLink}">${forgotPasswordLink}</a></p>
            <p><a href="${loginLink}">${loginLink}</a></p>
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
  
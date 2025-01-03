// emailTemplates.js
exports.generateForgotPasswordEmail = (username, resetURL) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Password Reset Request</title>
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
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Dear ${username},</p>
            <p>We received a request to reset your password. Please use the link below to set a new password:</p>
            <p style="text-align: center;">
              <a href="${resetURL}" class="button">Reset Password</a>
            </p>
            <p>If the button above does not work, please copy and paste the following link into your web browser:</p>
            <p><a href="${resetURL}">${resetURL}</a></p>
            <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
            <p>Thank you,</p>
            <p>Elite Connections LTD</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Elite Connections LTD. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
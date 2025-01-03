// emailTemplates.js
exports.generatePaymentConfirmationEmail = (username, fullName, accountId, newPlan, paymentAmount, paymentDate) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Payment Confirmation</title>
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
                .content ul {
                    list-style-type: none;
                    padding: 0;
                }
                .content ul li {
                    margin-bottom: 10px;
                }
                .footer {
                    text-align: center;
                    padding: 10px 0;
                    font-size: 12px;
                    color: #777777;
                }
                .footer a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Confirmation</h1>
                </div>
                <div class="content">
                    <p>Dear ${username},</p>
                    <p>We are pleased to inform you that your account has been successfully paid and upgraded to the ${newPlan} plan.</p>
                    <h3>Account Details:</h3>
                    <ul>
                        <li><strong>Account Name:</strong> ${fullName}</li>
                        <li><strong>Account ID:</strong> ${accountId}</li>
                        <li><strong>New Plan/Service:</strong> ${newPlan}</li>
                        <li><strong>Payment Amount:</strong> KSH: ${paymentAmount}</li>
                        <li><strong>Date of Payment:</strong> ${paymentDate}</li>
                    </ul>
                    <p>We appreciate your prompt payment and continued trust in our services. If you have any questions or need further assistance, please do not hesitate to contact our support team at <a href="mailto:info@eliteconnections.co.ke">info@eliteconnections.co.ke</a>.</p>
                    <p>Thank you for being a valued customer.</p>
                    <p>Best regards,<br/>
                    Elite Connections LTD<br/>
                    Virtual Assistance<br/>
                    Email: <a href="mailto:support@eliteconnections.co.ke">support@eliteconnections.co.ke</a><br/>
                    Website: <a href="http://www.eliteconnections.co.ke">www.eliteconnections.co.ke</a></p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Elite Connections LTD. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
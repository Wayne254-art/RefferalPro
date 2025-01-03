exports.adminWithdrawalRequest = ({ userId, phoneNumber, activityAmount }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Withdrawal Request Notification</h1>
        </div>
        <div class="content">
            <p>Dear Admin,</p>
            <p>A withdrawal request has been made by:</p>
            <ul>
                <li><strong>User ID:</strong> ${userId}</li>
                <li><strong>Phone Number:</strong> ${phoneNumber}</li>
                <li><strong>Amount:</strong> Ksh.${activityAmount}</li>
            </ul>
            <p>Please review and process this request as soon as possible.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

exports.userWithdrawalRequest = ({ username, activityAmount, phoneNumber }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Withdrawal Request Confirmation</h1>
        </div>
        <div class="content">
            <p>Dear ${username},</p>
            <p>Your withdrawal request has been successfully received. Here are the details:</p>
            <ul>
                <li><strong>Phone Number:</strong> ${phoneNumber}</li>
                <li><strong>Amount:</strong> Ksh.${activityAmount}</li>
            </ul>
            <p>We will process your request shortly and notify you once it has been completed. If you did not request this withdrawal, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

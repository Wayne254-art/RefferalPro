const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");
const { db } = require("../Database/database");
const { promisify } = require("util");
const { generateUUID } = require("../utils/helperFunctions");
const sendMail = require("../utils/sendMail");
const { generatePaymentConfirmationEmail } = require("../templates email/paymentConfirmation");
const { userWithdrawalRequest, adminWithdrawalRequest } = require("../templates email/withdrawalRequests");
const query = promisify(db.query).bind(db);

const adminId = process.env.ADMIN_REFFERAL_ID;
const andminEmailId = process.env.ADMIN_EMAIL_ID;

// Get total account balance
exports.getTotalAccountBalance = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const selectQuery = `SELECT totalBalance FROM users WHERE userId = ?`;

    // Execute the query to get the total balance
    const results = await query(selectQuery, [userId]);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }

    const totalBalance = results[0].totalBalance;

    logger.info(`User userId: ${userId} total balance retrieved successfully`);

    // Return total balance if found
    res.status(200).json({
      success: true,
      totalBalance,
    });
  } catch (error) {
    logger.error(`Error fetching total balance: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get total deposits
exports.getTotalDeposits = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const selectQuery = `SELECT SUM(activityAmount) as totalDeposits FROM activity WHERE userId = ? AND activityType = 'deposit' AND activityStatus = 'completed'`;

    // Execute the query to get the total deposits amount
    const results = await query(selectQuery, [userId]);

    if (results.length === 0 || results[0].totalDeposits === null) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }

    const totalDeposits = results[0].totalDeposits;

    logger.info(`User userId: ${userId} total deposits retrieved successfully`);

    console.log(totalDeposits);

    // Return total deposits amount if found
    res.status(200).json({
      success: true,
      totalDeposits,
    });
  } catch (error) {
    logger.error(`Error fetching total deposits: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Add a new deposit record
exports.addDeposit = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { userId, activityAmount, transactionId, paymentDate, phoneNumber } = req.body;
    // amount: 1,
    // phone: '0742275513',
    // refference: 'SGF3SB2SC7',
    // CheckoutRequestID: 'ws_CO_15072024201038688742275513'

    // Input validation
    if (!userId || !activityAmount || !transactionId || !paymentDate || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const activityId = generateUUID();
    const activityData = JSON.stringify({
      transactionId,
      paymentDate,
      phoneNumber,
    });

    const firstDepositQuery = `SELECT COUNT(*) as depositCount FROM activity WHERE userId = ? AND activityType = 'deposit'`;
    const firstDepositResult = await query(firstDepositQuery, [userId]);

    const isFirstDeposit = firstDepositResult[0].depositCount < 1;

    // Start a transaction
    await query("START TRANSACTION");

    const insertQuery = `
      INSERT INTO activity (activityId, userId, activityType, activityStatus, activityAmount, activityData, createdAt)
      VALUES (?, ?, 'deposit', 'completed', ?, ?, NOW())
    `;

    const result = await query(insertQuery, [activityId, userId, activityAmount, activityData]);

    if (result.affectedRows === 0) {
      await query("ROLLBACK");
      return res.status(400).json({ success: false, message: "Failed to add deposit record" });
    }

    // Cashback handling
    if (isFirstDeposit && activityAmount === 100) {
      const rewardAmount = 0 * 0.2;
      const rewardId = generateUUID();
      const rewardType = "cashBack";

      const rewardInsertQuery = `
        INSERT INTO rewards (rewardId, userId, rewardType, rewardAmount, createdAt)
        VALUES (?, ?, ?, ?, NOW())
      `;

      const rewardResult = await query(rewardInsertQuery, [rewardId, userId, rewardType, rewardAmount]);

      if (rewardResult.affectedRows === 0) {
        await query("ROLLBACK");
        return res.status(400).json({ success: false, message: "Failed to add cashback reward" });
      }

      const updateBalanceQuery = `
        UPDATE users
        SET totalBalance = totalBalance + ?, status = '1'
        WHERE userId = ?
      `;

      const balanceResult = await query(updateBalanceQuery, [rewardAmount, userId]);

      if (balanceResult.affectedRows === 0) {
        await query("ROLLBACK");
        return res.status(400).json({ success: false, message: "Failed to update user balance with cashback reward" });
      }

      // Referral bonus handling
      const referralQuery = `SELECT referrerId FROM referrals WHERE referredId = ?`;
      const referralResult = await query(referralQuery, [userId]);
      const adminUserId = adminId; // Ensure adminId is defined

      const referrerId = referralResult.length > 0 ? referralResult[0].referrerId : adminUserId;
      const referralBonusAmount = 50;
      const referralRewardId = generateUUID();
      const referralRewardType = "referralBonus";

      const referralRewardInsertQuery = `
        INSERT INTO rewards (rewardId, userId, rewardType, rewardAmount, createdAt)
        VALUES (?, ?, ?, ?, NOW())
      `;

      const referralRewardResult = await query(referralRewardInsertQuery, [referralRewardId, referrerId, referralRewardType, referralBonusAmount]);

      if (referralRewardResult.affectedRows === 0) {
        await query("ROLLBACK");
        return res.status(400).json({ success: false, message: "Failed to add referral bonus" });
      }

      const updateReferralBalanceQuery = `
        UPDATE users
        SET totalBalance = totalBalance + ?
        WHERE userId = ?
      `;

      const referralBalanceResult = await query(updateReferralBalanceQuery, [referralBonusAmount, referrerId]);

      if (referralBalanceResult.affectedRows === 0) {
        await query("ROLLBACK");
        return res.status(400).json({ success: false, message: "Failed to update referrer balance with referral bonus" });
      }
    }

    const selectQuery = `SELECT userId, firstName, lastName, username, email, phoneNumber, role, referralCode, avatar, totalBalance FROM users WHERE userId = ?`;
    const user = await query(selectQuery, [userId]);

    if (user.length === 0) {
      await query("ROLLBACK");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const fullName = user[0].firstName + user[0].lastName
    const username=  user[0].username
    
    const emailContent = generatePaymentConfirmationEmail(username, fullName, userId, 'Starter', activityAmount, transactionId);

    await sendMail({
      from: process.env.SMTP_MAIL,
      to: userEmail,
      subject: 'Your Account Has Been Successfully Upgraded',
      html: emailContent,
    });

    await query("COMMIT");

    logger.info(`Deposit added for userId: ${userId}, amount: ${activityAmount}`);
    return res.status(201).json({ success: true, message: "Deposit added successfully" });
  } catch (error) {
    await query("ROLLBACK");
    logger.error(`Error adding deposit: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Add a new withdrawal record
exports.addWithdrawal = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { activityAmount, phoneNumber, email, username } = req.body;
  const withdrawalDate = new Date(Date.now());

  if (!activityAmount) {
    return res.status(400).json({
      success: false,
      message: "Withdrawal amount is required",
    });
  }

  // Generate a new activityId
  const activityId = generateUUID();

  // Create the activityData JSON object
  const activityData = JSON.stringify({
    withdrawalDate,
    phoneNumber,
    email,
    username,
  });

  // Get actaul balance
  const actauBalanceQuery = `SELECT totalBalance FROM users WHERE userId = ?`;
  const actualBalance = await query(actauBalanceQuery, [userId]);
  const actualBalanceAmount = actualBalance[0].totalBalance;

  // console.log("actual Balance Before withdrawal request", actualBalanceAmount);
  if (actualBalanceAmount < activityAmount) {
    return res.status(400).json({
      success: false,
      message: "Insuficient funds",
    });
  }
  try {
    // Start a transaction
    await query("START TRANSACTION");

    // Insert the new withdrawal record
    const insertQuery = `
      INSERT INTO activity (activityId, userId, activityType, activityStatus, activityAmount, activityData, createdAt)
      VALUES (?, ?, 'withdrawal', 'pending', ?, ?, NOW())
    `;

    const result = await query(insertQuery, [
      activityId,
      userId,
      activityAmount,
      activityData,
    ]);

    if (result.affectedRows === 0) {
      await query("ROLLBACK");
      logger.error(`Failed to add withdrawal record for userId: ${userId}`);
      return res.status(400).json({
        success: false,
        message: "Failed to add withdrawal record",
      });
    }

    // Update the user's total balance
    const updateBalanceQuery = `
      UPDATE users
      SET totalBalance = totalBalance - ?
      WHERE userId = ?
    `;

    const balanceResult = await query(updateBalanceQuery, [
      activityAmount,
      userId,
    ]);

    if (balanceResult.affectedRows === 0) {
      await query("ROLLBACK");
      logger.error(`Failed to update balance for userId: ${userId}`);
      return res.status(400).json({
        success: false,
        message: "Failed to update balance",
      });
    }

    // Commit the transaction
    await query("COMMIT");

    logger.info(
      `Withdrawal added for userId: ${userId}, amount: ${activityAmount}`
    );

    // Send email notifications
    const userEmailQuery = `
      SELECT email FROM users WHERE userId = ?
    `;
    const userEmailResult = await query(userEmailQuery, [userId]);

    if (userEmailResult.length === 0) {
      logger.error(`User email not found for userId: ${userId}`);
      return res.status(404).json({
        success: false,
        message: "User email not found",
      });
    }

    const userEmail = userEmailResult[0].email;

    try {
      await sendMail({
        from: process.env.SMTP_MAIL,
        to: userEmail,
        subject: "Withdrawal Request Confirmation",
        html: userWithdrawalRequest(username, activityAmount, phoneNumber),
      });

      await sendMail({
        from: process.env.SMTP_MAIL,
        to: andminEmailId,
        subject: "Withdrawal Request Notification",
        html: adminWithdrawalRequest(userId, phoneNumber, activityAmount),
      });
    } catch (error) {
      logger.error(`Error sending email: ${error.message}`);
      return res.status(500).json({
        success: false,
        message:"failed to initiate withdrwal",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Withdrawal request sent successfully",
    });
  } catch (error) {
    // Rollback the transaction in case of any error
    await query("ROLLBACK");
    logger.error(`Error adding withdrawal: ${error.message}`);
    console.error(`Error adding withdrawal: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all withdrawal requests
exports.getAllWithdrawals = asyncHandler(async (req, res) => {
  try {
    // Query to get all withdrawals
    const getWithdrawalsQuery = `
      SELECT *
      FROM activity
      WHERE activityType = 'withdrawal'
      ORDER BY createdAt DESC
    `;

    const results = await query(getWithdrawalsQuery);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No withdrawal requests found",
      });
    }

    return res.status(200).json({
      success: true,
      withdrawals: results,
    });
  } catch (error) {
    console.error(`Error fetching withdrawals: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Change the withdrawal status
exports.changeWithdrawalStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  try {
    // Start a transaction
    await query("START TRANSACTION");

    // Fetch the withdrawal request to ensure it exists and get its current status
    const selectQuery = `
      SELECT activityStatus FROM activity WHERE activityId = ? AND activityType = 'withdrawal'
    `;
    const [request] = await query(selectQuery, [requestId]);

    if (!request) {
      await query("ROLLBACK");
      logger.error(`Withdrawal request with ID ${requestId} not found`);
      return res.status(404).json({
        success: false,
        message: `Withdrawal request with ID ${requestId} not found`,
      });
    }

    // Update the status of the withdrawal request to 'complete'
    const updateQuery = `
      UPDATE activity SET activityStatus = 'completed' WHERE activityId = ?
    `;
    const result = await query(updateQuery, [requestId]);

    if (result.affectedRows === 0) {
      await query("ROLLBACK");
      logger.error(
        `Failed to update withdrawal status for request ID: ${requestId}`
      );
      return res.status(400).json({
        success: false,
        message: "Failed to update withdrawal status",
      });
    }

    // Commit the transaction
    await query("COMMIT");

    logger.info(`Withdrawal status updated for request ID: ${requestId}`);
    return res.status(200).json({
      success: true,
      message: "Withdrawal status updated successfully",
    });
  } catch (error) {
    // Rollback the transaction in case of any error
    await query("ROLLBACK");
    logger.error(`Error updating withdrawal status: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get all withdrawals of user
exports.getUserWithdrawals = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch withdrawals for the user from the activity table
    const withdrawalsQuery = `
      SELECT *
      FROM activity
      WHERE userId = ? AND activityType = 'withdrawal'
      ORDER BY createdAt DESC
    `;
    const withdrawals = await query(withdrawalsQuery, [userId]);

    if (!withdrawals || withdrawals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No withdrawals found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawals fetched successfully.",
      withdrawals,
    });
  } catch (error) {
    console.error(`Error getting user withdrawals: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the withdrawals.",
    });
  }
});

// Get total deposits --- Admin
exports.getAllTotalDeposits = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const selectQuery = `SELECT * FROM activity  WHERE activityType = 'deposit'`;

    // Execute the query to get the total deposits amount
    const results = await query(selectQuery, [userId]);

    if (results.length === 0 ) {
      return res.status(404).json({
        success: false,
        message: "No record found",
      });
    }

    const totalAdminDeposits = results;

    logger.info(`User userId: ${userId} total deposits retrieved successfully`);

    // console.log(totalAdminDeposits);

    // Return total deposits amount if found
    res.status(200).json({
      success: true,
      totalAdminDeposits,
    });
  } catch (error) {
    logger.error(`Error fetching total deposits: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

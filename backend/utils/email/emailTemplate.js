import dotenv from "dotenv";

dotenv.config();

export const orderConfirmationEmail = `<!-- Order Confirmation Email -->
<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #4caf50;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #4caf50;
            color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4caf50;
            color: #ffffff;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Foodflick</h1>
        </div>
        <div class="content">
            <p>Hi {name},</p>
            <p>Thank you for placing your order with Foodflick! 🎉</p>
            <p><strong>Order Details:</strong></p>
            <ul>
                <li>Order Number: {Order-Number}</li>
                <li>Total: {Total-Amount}</li>
                <li>Delivery Address: {Delivery-Address}</li>
            </ul>
            <p>Our team is preparing your food with love and care. We’ll keep you updated on the status of your order.</p>
            <a href="{Order-Tracking-Link}" class="button">Track Your Order</a>
        </div>
        <div class="footer">
            <p>Need help? Contact us at ${process.env.EMAIL_ID}</p>
            <p>&copy; 2024 Foodflick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

export const deliveryUpdateEmail = `<!DOCTYPE html>
<html>
<head>
    <title>Delivery Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #4caf50;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #4caf50;
            color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4caf50;
            color: #ffffff;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Foodflick</h1>
        </div>
        <div class="content">
            <p>Hi ,{name}</p>
            <p>Your order is on its way! 🚗💨</p>
            <p><strong>Delivery Details:</strong></p>
            <ul>
                <li>Order Number: {Order-Number}</li>
                <li>Delivery Person: {Delivery-Partner-Name}</li>
                <li>Contact: {Delivery-Partner-Contact}</li>
            </ul>
            <p>Track your delivery in real-time:</p>
            <a href="{Order-Tracking-Link}" class="button">Track Delivery</a>
        </div>
        <div class="footer">
            <p>Need help? Contact us at ${process.env.EMAIL_ID}</p>
            <p>&copy; 2024 Foodflick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

export const accountCreationEmail = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Foodflick</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #4caf50;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #4caf50,
            color:#ffffff,
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4caf50;
            color: #ffffff;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Foodflick!</h1>
        </div>
        <div class="content">
            <p>Hi {name},</p>
            <p>Welcome to the Foodflick family! 🎉 We’re thrilled to have you on board.</p>
            <p>Explore our menu and enjoy exclusive deals:</p>
            <a href="${process.env.BASE_URL}" class="button">Explore Now</a>
        </div>
        <div class="footer">
            <p>Need help? Contact us at ${process.env.EMAIL_ID}</p>
            <p>&copy; 2024 Foodflick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

export const passwordResetEmail = `<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #4caf50;
            color:#ffffff,
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #4caf50;
            color:#ffffff,
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4caf50;
            color: #ffffff;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hi {name},</p>
            <p>We received a request to reset your Foodflick account password.</p>
            <p>Click the link below to reset your password:</p>
            <a href="{reset-link}" class="button">Reset Password</a>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Need help? Contact us at ${process.env.EMAIL_ID}</p>
            <p>&copy; 2024 Foodflick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const confirmationOfResetPassword = `<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #4caf50;
            color:#ffffff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background: #4caf50;
            color:#ffffff;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #8bc34a;
            color: #ffffff;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <p>Hi {name},</p>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>If you did not make this change, please contact us immediately at ${process.env.EMAIL_ID}</p>
        </div>
        <div class="footer">
            <p>Need help? Contact us at ${process.env.EMAIL_ID}</p>
            <p>&copy; 2024 Foodflick. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

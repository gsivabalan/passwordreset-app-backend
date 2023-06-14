# passwordreset-app-backend

http://localhost:9000/forgot-password.

Enter your email address and click on the Reset Password button.

You will receive an email with a link to reset your password.

Click on the link in the email.

Enter your new password and click on the Reset Password button.

Your password has been successfully reset.


The ForgotPassword component is responsible for rendering the forgot password page.
 app.post("/forgot-password") route is responsible for sending the email with the reset link.
 app.get("/reset-password/:randomString") route is responsible for rendering the password reset form.
 app.post("/reset-password") route is responsible for updating the user's password.

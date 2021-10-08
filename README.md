# Trackky - Price Drop Alert App

### **Link**:

https://trackky-frontend.vercel.app/

### **Status Badge**:

[![CD](https://github.com/Jocelyn59435/Trackky_frontend/actions/workflows/CD.yml/badge.svg)](https://github.com/Jocelyn59435/Trackky_frontend/actions/workflows/CD.yml)

### **Project Overview**:

Tech Stacks: 
- Next.js
- tailwindcss
- Apollo Client
- Graphql Code Generator
- Jest

This project has 6 pages:

- **Home Page:** A brief introduction of Trackky.
- **Sign Up Page:** Has a sign up form, when new users enter input and click `submit` button, then get to landing page.
- **Sign In Page:** Has a sign in form, when current users enter input and click `submit` button, then get to landing page.
- **Reset Passowrd Request Page:** Has a reset password request form, when current users enter email address and click `submit` button, they will receive a email with reset password link, the link will expire in 2 hours.
- **Reset Password Page:** Reset password form will be shown if the secure code is valid, current users enter input and click `submit` button, the password will be reset.
- **Landing Page**: Has a search form and a track list. When current users enter product link, product details including product name, product price, product image will be shown, it will be added to track list if `Add to track list` button is clicked. The track list shows product alert details in including product name, original price, current price and desired price. Current users can modify desired price with the `update` button, and delete product alert with the `X` button.

### Quick Demo:

When getting to user landing page, a `JWT token` will be set in the cookie, and it will be set to `null` when `Log Out` is clicked.\
**Form input** is checked on the fly.

- Sign Up

  ![signup](/demoGIF/signup.gif)

- Sign In & Sign Out

  ![signin_signout](/demoGIF/signin_signout.gif)

- Reset Password

  ![reset_password](/demoGIF/resetpassword.gif)

- Add Product Alert & Delete Product Alert & Update Desired Price

  ![add_delete_update_product](/demoGIF/addproduct_deleteproduct.gif)

- Responsive Display

  - HomePage
    ![responsive1](/demoGIF/responsive.gif)
  - User Landing Page
    ![responsive2](/demoGIF/responsive2.gif)

For more details, please refer to [docs](./docs) folder.

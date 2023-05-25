/**

Performs a login operation with the provided email and password.

@param {string} email - The email to use for login.

@param {string} password - The password to use for login.

@returns {boolean} - Returns true if the login was successful, false otherwise.

@author Yash Chouriya
*/
const login = (email, password) => {
  try {
    // Update the email input field with the provided email
    const isEmailEntered = updateInputElementValue(
      'input[name="email"]',
      email
    );
    if (!isEmailEntered) {
      // If failed to update the email input field, return false
      return false;
    }

    // Update the password input field with the provided password
    const isPasswordEntered = updateInputElementValue(
      'input[name="password"]',
      password
    );
    if (!isPasswordEntered) {
      // If failed to update the password input field, return false
      return false;
    }

    // Trigger a click on the login button
    const isSubmitClicked = triggerClickOnElement('button[form="loginForm"]');

    return !!isSubmitClicked;
  } catch (error) {
    // Log any errors that occur during the login process
    console.error("Error during login:", error);

    // Return false if an error occurs during the login process
    return false;
  }
};

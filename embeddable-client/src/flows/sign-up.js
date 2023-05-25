/**
 * Performs a sign-up process by filling out the form and clicking on various elements.
 * @param {string} first_name - The first name to be entered in the sign-up form.
 * @param {string} last_name - The last name to be entered in the sign-up form.
 * @param {string} email - The email address to be entered in the sign-up form.
 * @param {string} password - The password to be entered in the sign-up form.
 * @returns {Promise<boolean>} - A promise that resolves to true if the sign-up process is successful, or false otherwise.
 */
const signUp = async (first_name, last_name, email, password) => {
  try {
    // Update first name input element
    const isFirstNameEntered = updateInputElementValue(
      'input[name="first_name"]',
      first_name
    );

    // Update last name input element
    const isSecondNameEntered = updateInputElementValue(
      'input[name="last_name"]',
      last_name
    );

    // Update email input element
    const isEmailEntered = updateInputElementValue(
      'input[name="email"]',
      email
    );

    // Update password input element
    const isPasswordEntered = updateInputElementValue(
      'input[name="password"]',
      password
    );

    // Check if any field is not entered
    if (
      !isFirstNameEntered ||
      !isSecondNameEntered ||
      !isEmailEntered ||
      !isPasswordEntered
    ) {
      return false;
    }

    // Select term and condition checkboxes
    const conditionCheckBoxes = window.document.querySelectorAll(
      'input[type="checkbox"]'
    );
    const termAndConditionCheckBox = conditionCheckBoxes[0];
    const privacyPolicyCheckBox = conditionCheckBoxes[1];

    // Check if checkboxes are present
    if (!privacyPolicyCheckBox || !termAndConditionCheckBox) {
      return false;
    }

    // Click on term and condition checkboxes
    privacyPolicyCheckBox.click();
    termAndConditionCheckBox.click();

    // Submit the form
    const isSubmitClicked = triggerClickOnElement(
      'button[class="w-100 btn btn-success"]'
    );

    // Check if the submit button was clicked successfully
    if (!isSubmitClicked) {
      return false;
    }

    // Wait for a certain duration
    await sleep(3000);
    console.log("Slept well");

    // Let's get to know you section

    // Select chips (example: aFriendChip, agencyChip)
    const chips = document.querySelectorAll('[role="button"]');
    if (!chips || !chips.length) {
      return false;
    }
    const aFriendChip = chips[0];
    const agencyChip = chips[9];
    if (!aFriendChip || !agencyChip) {
      return false;
    }

    // Click on the selected chips
    aFriendChip.click();
    agencyChip.click();

    // Click continue button
    const continueButton = triggerClickOnElement(
      'button[class="btn btn-primary"]'
    );
    return continueButton;
  } catch (error) {
    // Log any errors that occur during the sign-up process
    console.error("Error during login:", error);
    // Return false if an error occurs during the sign-up process
    return false;
  }
};

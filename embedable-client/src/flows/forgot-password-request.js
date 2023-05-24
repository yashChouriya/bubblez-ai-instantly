/**
 * Initiates a forgot password request by interacting with the corresponding elements in the DOM.
 *
 * @param {string} email - The email to be entered in the forgot password form.
 * @returns {boolean} - Returns true if the button is clicked successfully, otherwise false.
 * @author Yash Chouriya
 */
const forgotPasswordRequest = async (email) => {
  try {
    // Find the "Forgot password?" element
    const forgotPasswordElement = findElementInDomByInnerTextAndTagName(
      "small",
      "Forgot password?"
    );
    if (!forgotPasswordElement) return false;

    // Click on the "Forgot password?" element
    forgotPasswordElement.click();

    await sleep(500);

    // Update the email input element with the provided email
    const isForgotPasswordEmailElementUpdated = updateInputElementValue(
      'input[form="forgotPasswordForm"]',
      email
    );

    if (!isForgotPasswordEmailElementUpdated) return false;

    // Click on the button within the forgotPasswordForm
    const buttonClicked = triggerClickOnElement(
      'button[form="forgotPasswordForm"]'
    );
    return buttonClicked;
  } catch (error) {
    console.error(error);
    return false;
  }
};

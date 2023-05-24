/**
 * Opens the email setting for the specified email address.
 *
 * @param {string} email - The email address to enable or disable warmup for.
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya
 */
const openEmailSetting = (email) => {
  try {
    // Select all elements with a class containing "accounts__AccountCard"
    const allEmailCards = document.querySelectorAll(
      '[class*="accounts__AccountCard"]'
    );

    // If no email cards are found, return false
    if (!allEmailCards.length) return false;

    // Loop over each email card
    for (const emailCard of allEmailCards) {
      // Find the h6 element within the current email card
      const emailH6Element = emailCard.querySelector("h6");

      // If the email in the h6 element matches the provided email
      if (emailH6Element.innerText === email) {
        console.log(emailCard); // Log the email card

        // Extract the email index from the h6 element's ID
        const emailArrId = emailH6Element.id.split("_");
        const emailIndex = emailArrId[emailArrId.length - 1];

        // Find the warmupIcon element with the corresponding email index
        const warmupIcon = emailCard.querySelector(
          `a[id="settings_${emailIndex}"]`
        );

        // Trigger a click event on the warmupIcon element
        warmupIcon.click();

        // Return true to indicate that the settings were opened
        return true;
      }
    }

    // If the email is not found, return false
    return false;
  } catch (error) {
    console.error(error); // Log any errors that occur
    return false;
  }
};

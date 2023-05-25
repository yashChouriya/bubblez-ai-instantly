/**
 * Enables or disables email warmup for the specified email address.
 *
 * @param {string} email - The email address to enable or disable warmup for.
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya
 */
const enableOrDisableEmailWarmup = (email) => {
  try {
    // Find all email cards in the DOM
    const allEmailCards = document.querySelectorAll(
      '[class*="accounts__AccountCard"]'
    );

    if (!allEmailCards.length) return false;

    // Iterate through each email card
    for (const emailCard of allEmailCards) {
      // Find the email's h6 element
      const emailH6Element = emailCard.querySelector("h6");

      // Check if the email matches the specified email address
      if (emailH6Element.innerText === email) {
        console.log(emailCard);

        // Extract the email index from the h6 element's ID
        const emailArrId = emailH6Element.id.split("_");
        const emailIndex = emailArrId[emailArrId.length - 1];

        // Find the warmup icon and click on it
        const warmupIcon = emailCard.querySelector(
          `a[id="warmup_${emailIndex}"]`
        );
        warmupIcon.click();
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

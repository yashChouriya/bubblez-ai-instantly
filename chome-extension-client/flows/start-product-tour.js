/**

Starts the product tour by clicking on the help button and selecting the "Start product tour" option.

 *
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya

*/
const startProductTour = () => {
  try {
    // Find the help button in the DOM
    const helpButton = document.querySelector(
      'button[aria-label="help-button"]'
    );

    // If the help button is not found, return false
    if (!helpButton) return false;

    // Click on the help button to open the help menu
    helpButton.click();

    // Find the "Start product tour" element in the DOM
    const startTourElement = findElementInDomByInnerTextAndTagName(
      "li",
      "Start product tour"
    );

    // If the "Start product tour" element is not found, return false
    if (!startTourElement) return false;

    // Click on the "Start product tour" element to start the tour
    startTourElement.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

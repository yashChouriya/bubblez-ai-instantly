/**
 * Performs the necessary actions to add a new campaign.
 * @returns {boolean} - Returns true if the campaign was added successfully, false otherwise.
 * @author Yash Chouriya
 */
const addNewCampaign = async (name) => {
  try {
    console.log("Inside AddNewCampaign method");

    // Navigate to the campaign page
    triggerClickOnElement('div[id="sidebar_icon_campaigns"]');

    await sleep(2000);

    console.log("slept good");

    // Selector for the "Add New" button
    const addNewButtonSelector =
      'button[class="d-none d-sm-block btn btn-outline-primary"]';

    // Selector for the input element to update the campaign name
    const inputSelector = 'input[placeholder="Give your campaign a name"]';

    // Selector for the "Continue" button
    const continueButtonSelector = 'button[class="btn-lg btn btn-primary"]';

    // Click the "Add New" button
    const isAddNewClicked = triggerClickOnElement(addNewButtonSelector);
    if (!isAddNewClicked) return false;

    await sleep(1000);

    // Update the campaign name input
    const isInputUpdated = updateInputElementValue(inputSelector, name);
    if (!isInputUpdated) return false;

    await sleep(500);

    // Click the "Continue" button
    const isContinueButtonClicked = triggerClickOnElement(
      continueButtonSelector
    );
    return !!isContinueButtonClicked;
  } catch (error) {
    console.error("Error in AddNewCampaign:", error);
    return false;
  }
};

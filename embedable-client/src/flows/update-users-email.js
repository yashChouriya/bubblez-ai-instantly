/**

Updates the user's email in the settings.

@param {string} newEmail - The new email address.

@returns {boolean} - True if the update is successful, false otherwise.
@author Yash Chouriya
*/
const updateUsersEmail = async (newEmail) => {
  try {
    console.log("Updating user email");

    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Profile" section in the settings page
    const profileSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Profile"
    );

    if (!profileSection) return false;

    // Click on the "Profile" section to expand it
    profileSection.click();

    await sleep(500);

    // Find the setting form container in the settings page
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );

    // Find the email input element
    const inputs = settingFormContainer.querySelectorAll("input");
    const emailInput = inputs[2];

    // Update the value of the email input
    const emailInputObject = { ...emailInput };
    const reactProps = Object.keys(emailInputObject);
    const reactStateProp = emailInputObject[reactProps[1]];
    reactStateProp.onChange({ target: { value: newEmail } });

    await sleep(500);

    // Find the "Save" button in the settings page
    const hiddenSection = document.querySelector('div[class="collapse show"]');
    const saveButton = hiddenSection.querySelector("button");

    if (!saveButton) return false;

    // Click on the "Save" button to save the changes
    saveButton.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**

Updates the user's first name and last name in the settings.
@param {string} firstName - The new first name.
@param {string} lastName - The new last name.
@returns {boolean} - True if the update is successful, false otherwise.
@author Yash Chouriya
*/
const updateUsersName = async (firstName, lastName) => {
  try {
    console.log("Updating user " + firstName + " " + lastName);

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

    // Find the input elements for first name and last name
    const inputs = settingFormContainer.querySelectorAll("input");
    const firstNameInput = inputs[0];
    const lastNameInput = inputs[1];

    // Update the value of the first name input
    const firstNameInputObject = { ...firstNameInput };
    const reactPropsFirst = Object.keys(firstNameInputObject);
    const reactStatePropFirst = firstNameInputObject[reactPropsFirst[1]];
    reactStatePropFirst.onChange({ target: { value: firstName } });

    // Update the value of the last name input
    const LastNameInputObject = { ...lastNameInput };
    const reactPropsLast = Object.keys(LastNameInputObject);
    const reactStatePropLast = LastNameInputObject[reactPropsLast[1]];
    reactStatePropLast.onChange({ target: { value: lastName } });

    await sleep(500);

    // Find the "Save" button in the settings page
    const saveButton = findElementInDomByInnerTextAndTagName("span", "Save");
    if (!saveButton) return false;

    // Click on the "Save" button to save the changes
    saveButton.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

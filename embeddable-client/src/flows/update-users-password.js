const updateUsersPassword = async (newPassword) => {
  try {
    console.log("Updating user password");
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

    // Find the "Workspace" section in the settings page
    const profileSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Profile"
    );

    if (!profileSection) return false;

    // Click on the "Workspace" section to expand it
    profileSection.click();

    await sleep(500);

    // Find the container for the workspace settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelectorAll("input");

    const passInput = inputElement[3];
    passInput.click();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

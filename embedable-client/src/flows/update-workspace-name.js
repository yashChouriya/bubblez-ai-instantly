/**
 * Updates the name of the current workspace.
 *
 * @param {string} newWorkspaceName - The new name for the workspace.
 * @returns {boolean} - Returns true if the workspace name is updated successfully, false otherwise.
 * @author Yash Chouriya
 */
const updateCurrentWorkspaceName = async (newWorkspaceName) => {
  try {
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
    const workspaceSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Workspace"
    );

    if (!workspaceSection) return false;

    // Click on the "Workspace" section to expand it
    workspaceSection.click();

    await sleep(500);

    // Find the container for the workspace settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelector("input");

    // Update the value of the input element with the new workspace name
    const inputElementObject = { ...inputElement };
    const reactProps = Object.keys(inputElementObject);
    const reactStateProp = inputElementObject[reactProps[1]];
    reactStateProp.onChange({ target: { value: newWorkspaceName } });

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

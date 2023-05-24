/**
 * Adds a new member to the workspace.
 *
 * @param {string} newUserEmail - The email address of the new member.
 * @returns {boolean} - Returns true if the new member is added successfully, false otherwise.
 * @author Yash Chouriya
 */
const addNewMemberInWorkspace = async (newUserEmail) => {
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

    // Find the "Members" section in the workspace settings
    const membersSection = findElementInDomByInnerTextAndTagName(
      "p",
      "Members"
    );
    if (!membersSection) return false;

    // Click on the "Members" section to open the member settings
    membersSection.click();

    await sleep(500);

    // Find the container for the member settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelector(
      'input[placeholder="Enter email address"]'
    );
    const inputObject = { ...inputElement };
    const reactProps = Object.keys(inputObject);
    const reactStateProp = inputObject[reactProps[1]];

    // Trigger the onChange event of the input element to enter the new user email
    reactStateProp.onChange({ target: { value: newUserEmail } });

    await sleep(500);

    // Find the "Invite" button in the member settings
    const invite = findElementInDomByInnerTextAndTagName("span", "Invite");
    if (!invite) return false;

    // Click on the "Invite" button to send the invitation
    invite.click();

    return true;
  } catch (error) {
    // Log any errors that occur during the member addition process
    console.error(error);
    return false;
  }
};

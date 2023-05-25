/**
 * Logs out the user by interacting with the logout element in the DOM.
 *
 * @returns {boolean} - Returns true if the logout element is clicked successfully, otherwise false.
 * @author Yash Chouriya
 */
const logout = async () => {
  try {
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the logout element in the DOM
    const logoutDropDownMenu = findElementInDomByInnerTextAndTagName(
      "li",
      "Logout"
    );

    if (!logoutDropDownMenu) return false;

    // Click on the logout element
    logoutDropDownMenu.click();

    return true;
  } catch (error) {
    // Log any errors that occur during the logout process
    console.error(error);
    return false;
  }
};

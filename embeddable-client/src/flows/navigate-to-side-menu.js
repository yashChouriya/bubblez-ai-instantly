/**
 * Navigates to the specified menu in the side menu list.
 *
 * @param {string} menuName - The name of the menu to navigate to.
 * @returns {boolean} - True if the navigation is successful, false otherwise.
 * @author Yash Chouriya
 */
const navigateToSideMenus = (menuName) => {
  const menus = document.querySelectorAll('[class="pro-item-content"]');
  if (!menus) return false;

  const menuMap = {
    accounts: { index: 0, path: "/app/accounts" },
    campaigns: { index: 1, path: "/app/campaigns" },
    analytics: { index: 2, path: "/app/analytics/overview" },
    unibox: { index: 3, path: "/app/unibox" },
    settings: { index: 4, path: "/app/settings/profile" },
    accelerator: { index: 5, path: "/app/accelerator" },
  };

  let isNavigated = false;

  for (const key in menuMap) {
    if (menuName.toLowerCase().includes(key)) {
      const index = menuMap[key].index;
      const menuDiv = menus[index];
      const menuATag = menuDiv?.childNodes[0];

      if (menuATag) {
        menuATag.click();
        isNavigated = true;
        break;
      }
    }
  }

  return isNavigated;
};

/**
 * Downloads the analytics for a campaign.
 * @param {string} campaignName - The name of the campaign.
 * @returns {boolean} - Returns true if the download was initiated successfully, false otherwise.
 */
const downloadCampaignAnalytics = async (campaignName) => {
  try {
    // Open the campaign
    const campaign = openCampaign(campaignName);
    if (!campaign) {
      return false;
    }
    await sleep(1500); // Wait for the campaign to load

    // Get the campaign dropdown menu
    const campaignDropdownMenu = document
      .querySelectorAll('[id="customized-menu"]')[0]
      .querySelectorAll("span");

    // Ensure the menu has at least two items
    if (campaignDropdownMenu.length <= 1) {
      return false;
    }

    // Select the "Download Analytics" option from the dropdown menu
    const downloadAnalyticsMenu = campaignDropdownMenu[1];
    downloadAnalyticsMenu.click();

    return true; // Download initiated successfully
  } catch (error) {
    console.error(error);
    return false;
  }
};

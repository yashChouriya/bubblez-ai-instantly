const exportCampaignFile = async (campaignName) => {
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
    if (campaignDropdownMenu.length <= 2) {
      return false;
    }

    // Select the "Download Analytics" option from the dropdown menu
    const shareCampaignMenu = campaignDropdownMenu[2];
    shareCampaignMenu.click();

    await sleep(1500); // wait for share campaign menu to load

    const copyLinkButton = document.querySelector(
      '[class="MuiButtonBase-root MuiButton-root MuiButton-outlined"]'
    );

    if (!copyLinkButton) return false;

    copyLinkButton.click();

    return true; // Download initiated successfully
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Toggles the play/pause state of a campaign.
 * @param {string} campaignName - The name of the campaign.
 * @param {boolean} active - The desired state (true for active, false for paused).
 * @returns {boolean} - Returns true if the state was toggled successfully, false otherwise.
 */
const playPauseCampaign = (campaignName, active = true) => {
  try {
    // Find the campaign by name
    const campaign = findCampaignByNameInCampaignsScreen(campaignName);

    // If the campaign is not found, return false
    if (!campaign) {
      return false;
    }

    // Check if the campaign is already in the desired state
    if (campaign.status === "Paused" && active === false) {
      return false;
    }

    if (campaign.status === "Active" && active === true) {
      return false;
    }

    // Check if the campaign has the expected number of actions
    if (campaign.actions.length !== 3) {
      return false;
    }

    // Get the pause button from the campaign actions
    const pauseButton = campaign.actions[0];

    // Check if the button has the expected ID
    if (!pauseButton.id.includes("playPause")) {
      return false;
    }

    // Click the pause button to toggle the play/pause state
    pauseButton.click();

    // Return true to indicate successful toggling of the state
    return true;
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);

    // Return false in case of an error
    return false;
  }
};

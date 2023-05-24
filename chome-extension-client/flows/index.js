const FUNCTION_MAPPING = {
  login: {
    fileName: "login.js",
    description:
      "Performs a login operation with the provided email and password.",
  },
  signUp: {
    fileName: "sign-up.js",
    description:
      "Performs a sign-up or user registration process with the provided first_name, last_name, email and password.",
  },

  playPauseCampaign: {
    fileName: "active-or-pause-campaign.js",
    description:
      "Performs a active or paused campaign with the provided campaign name and status ",
  },

  addNewCampaign: {
    fileName: "add-new-campaign.js",
    description:
      "Performs the necessary actions to add a new campaign with the provided campaign name",
  },

  downloadCampaignAnalytics: {
    fileName: "download-campaign-analytics.js",
    description:
      "Performs the necessary actions to download campaign analytics with the provided campaign name",
  },

  exportCampaignFile: {
    fileName: "export-campaign-file.js",
    description:
      "Performs the necessary actions to export campaign data with the provided campaign name",
  },

  getShareableCampaignLink: {
    fileName: "get-shareable-campaign-link.js",
    description:
      "Performs the necessary actions to copy the shareable url of the campaign with the provided campaign name",
  },
};

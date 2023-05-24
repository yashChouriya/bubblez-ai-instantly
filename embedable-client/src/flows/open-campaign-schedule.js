const opencampaignSchedule = (campaignName) => {
  try {
    // click on the campagin button
    const isCampaignClicked = triggerClickOnElement(
      `//*[@id="sidebar_icon_campaigns"]/div/button/span[1]/span/svg`
    );
    if (!isCampaignClicked) {
      return false;
    }

    // select all campaigns with p tag and check if the campaign name matches where id contains campaign_name_{campaignName}
    const campaignList = document.querySelectorAll("p");

    // iterate through all p tags and check if the campaign name matches
    for (let i = 0; i < campaignList.length; i++) {
      const campaign = campaignList[i];
      if (campaign.innerText === campaignName) {
        // click on the campaign
        const isCampaignClicked = triggerClickOnElement(
          `//*[@id="campaign_name_${i}"]`
        );
        if (!isCampaignClicked) {
          return false;
        }
        break;
      }
    }

    if (i === campaignList.length) {
      return false;
    }

    // iterate through all span tag and check if innerText matches Schedule

    const spanList = document.querySelectorAll("span");
    for (let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      if (span.innerText === "Schedule") {
        // click on the span button
        const isScheduleClicked = triggerClickOnElement(span.id);
        if (!isScheduleClicked) {
          return false;
        }
        break;
      }
    }

    return !(i === spanList.length);
  } catch (error) {
    console.error("Error during openSchedule:", error);
    return false;
  }
};

const duplicateCampaign = async (campaignId) => {
  try {
    // click on the campagin button
    const isCampaignClicked = triggerClickOnElement(
      `//*[@id="sidebar_icon_campaigns"]/div/button/span[1]/span/svg`
    );
    if (!isCampaignClicked) {
      return false;
    }

    // wait for the campaign page to load
    await sleep(2000);

    const clickOnCampaignDots = triggerClickOnElement(
      `//*[@id="__next"]/div[2]/div[4]/div[2]/div/div/a[1]/div/div/div[4]/div/a[2]/i/svg`
    );
    if (!clickOnCampaignDots) {
      return false;
    }

    // iterate through all the span tags and click on the one which has innerText as "Duplicate Campaign"
    const spans = document.querySelectorAll("span");
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].innerText === "Duplicate Campaign") {
        spans[i].click();
        break;
      }
    }

    // wait for the duplicate campaign page to load
    await sleep(1000);

    // iterate thorough all the buttons andd click on the one which has innerText as "Duplicate"
    const buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerText === "Duplicate") {
        buttons[i].click();
        break;
      }
    }

    return !(i === buttons.length);
  } catch (error) {
    console.error("Error in DeleteCampaign:", error);
    return false;
  }
};

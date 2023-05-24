const opencampaignAnalytics = (campaignName) => {
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

        return !(i === campaignList.length);
    } catch (error) {
        // Log any errors that occur during the oepning campagin process
        console.error("Error during opencampaign:", error);

        // Return false if an error occurs during the campaign process
        return false;
    }
};

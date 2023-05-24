const deleteCampaign = async (campaignId) => {
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

        // click on delete button with id as delete_{campaignId}
        const clickOnDeleteButton = triggerClickOnElement(
            `//*[@id="delete_${campaignId}"]`
        );

        if (!clickOnDeleteButton) {
            return false;
        }

        // iterate through all buttons and click which has innerText as "Delete"

        const buttons = document.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === "Delete") {
                buttons[i].click();
                break;
            }
        }

        return !(i===buttons.length);

    } catch (error) {
        console.error("Error in DeleteCampaign:", error);
        return false;
    }
};

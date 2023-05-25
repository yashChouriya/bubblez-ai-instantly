const updateCampaignName = async (newCampaignName) => {
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

        // iterate through all the span tags and click on the one which has innerText as "Rename"
        const spans = document.querySelectorAll("span");
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].innerText === "Rename") {
                spans[i].click();
                break;
            }
        }

        if (i === spans.length) {
            return false;
        }

        // wait for the rename campaign page to load
        await sleep(1000);

        const input = document.querySelector(`//*[@id="name"]`);
        input.value = newCampaignName;

        // iterate through all the buttons and click on the one which has innerText as "Rename"
        const buttons = document.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === "Rename") {
                buttons[i].click();
                break;
            }
        }

        return !(i === buttons.length);
    } catch (error) {
        console.error("Error in UpdateCampaignName:", error);
        return false;
    }
};

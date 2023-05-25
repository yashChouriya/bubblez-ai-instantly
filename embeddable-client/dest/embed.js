const GLOBAL_CHATBOT_STYLES = `
.bot-icon-text-container {
  width: 58px;
  height: 70px;
  padding-top: 10px;
  position: fixed;
  z-index: 10000000000000;
  bottom: 20%;
  right: 2%;
  background-color: #620091;
  border-radius: 6px;
  cursor: pointer;
}
#bot-trigger-div {
  width: 35px;
  height: 35px;
  margin: auto;
  margin-bottom: 0.2rem;
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/dependabot-svgrepo-com.svg");
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
}
#bot-icon-text-container:hover {
  width: 65px !important;
  height: 75px !important;
  animation-name: bounce;
  -moz-animation-name: bounce;
}
@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -webkit-transform: translateY(-15px);
    -ms-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}
.bot-modal {
  display: none;
  position: fixed;
  z-index: 100000000000000;
  left: 98%;
  top: 15%;
  transform: translate(-99%, -15%);
  width: 362px;
  height: 686px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 15px 15px 5px 15px;
  border-radius: 16px;
  font-family: "inter";
  background-color: #fff;
  transition: opacity 0.5s ease-in-out;
}
.bot-modal-dialog {
  margin: auto;
}
.bot-modal-content {
  position: relative;
  background-color: #fff;
  padding-bottom: 0.1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}
.poweredByBubblez {
  font-family: "inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  padding: 0;
  margin-top: 0.7rem;
  text-align: center;
}
#hamburgerMenu {
  cursor: pointer;
  position: absolute;
  right: 0.5%;
  top: 1%;
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/hamburgerMenu.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 24px;
  height: 24px;
}
.chat-section {
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: clip;
  height: 540px;
  padding-top: 5px;
}
.chat-section::-webkit-scrollbar {
  width: 1px;
}
.chat-section::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}
.chat-section::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #63009100;
}
.chat-message-bot {
  display: flex;
  width: 100%;
  padding: 10px 0;
}
.bot-icon-holder {
  width: 18%;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  background-color: #ebeced;
  border-radius: 50%;
  position: relative;
  margin-right: 0.5rem;
  line-height: 19px;
}
.bot-icon-holder .bot-svg {
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/p.svg");
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner-chat-text {
  width: fit-content;
  height: fit-content;
  background-color: #8000801a;
  padding: 5px 10px;
  border-radius: 8px;
  line-height: 150%;
  white-space: pre-line;
  font-family: "inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #1e1e1e;
  max-width: 270px;
}
.bot-text-align {
  margin-left: 0;
}
.human-text-align {
  margin-right: 0;
  word-break: break-all;
}
.bot-head-reply {
  margin-top: 0.3rem;
  position: relative;
  width: 270px;
}
.chat-message-human {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  padding: 10px 0;
}
.human-icon-holder {
  width: 18%;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  background-color: #ebeced;
  border-radius: 50%;
  position: relative;
  margin-left: 0.5rem;
}
.human-icon-holder .human-svg {
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/avatar.svg");
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.human-head-reply {
  margin-top: 0.3rem;
  position: relative;
  width: 270px;
  display: flex;
  justify-content: end;
}
.messageBox {
  margin: 5px !important;
  overflow: hidden;
  /* width: 330px; */
  height: 36px;
  position: relative;
  background: #ffffff;
  border: 1px solid #eaecec;
  border-radius: 24px;
}
.messageBox .messageBoxTextArea {
  outline: none;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  width: 300px;
  height: 34px;
  margin: auto;
  resize: none;
  padding: 8px 8px 5px 15px;
  overflow: hidden;
}
.messageBox .messageBoxTextArea:focus {
  outline: none;
  border: none;
}
.messageBox .messageBoxSpan {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  right: 1%;
  background: #620091;
  top: 10%;
  cursor: pointer;
}
.messageBox .messageBoxSpan .send-arrow {
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/send.svg");
  width: 12px;
  height: 12px;
  display: inline-flex;
  background-repeat: no-repeat;
  margin: 0.5rem;
}
.messageBox .messageBoxSpan-disabled {
  position: absolute;
  right: 3%;
  top: 22%;
  background-color: #767676;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  z-index: 100000;
  border-radius: 8px;
  font-weight: bold;
  cursor: not-allowed;
}
.messageBox .messageBoxSpan:hover {
  background-color: #620091;
}
.tabs {
  display: flex;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  background: #620091;
  border-radius: 24px;
  padding: 0.3rem;
  margin: auto;
}
.tabs .tab {
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.1s 0.1s ease-in-out;
  /* height: 30px !important; */
  padding: 5px 15px;
  background-color: #620091 !important;
  color: #ffffff !important;
}
.tabs .tab .tab-icon {
  width: 12px;
  height: 12px;
  margin-right: 0.2rem;
  display: inline-flex;
}
.tabs .tab-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  vertical-align: text-top;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
}
.tabs .tab.active {
  background-color: #ffffff !important;
  color: #620091 !important;
  transition: all 0.1s 0.1s ease-in-out;
}
.feedback-button-container {
  display: flex;
  margin-left: 3rem;
}
.feedback-button-container .feedback-buttons {
  background: #ffffff;
  border: 1px solid #eaecec;
  border-radius: 8px;
  padding: 6px 10px;
  gap: 10px;
  cursor: pointer;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 140%;
  color: #3f4a5c;
  height: 28px;
  margin-right: 0.5rem;
  height: fit-content;
}
.feedback-button-container .feedback-buttons img {
  margin-left: 0.2rem;
}
#commands-container {
  display: none;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px 10px 15px;
  border: 1px solid #eaecec;
  border-radius: 24px;
  width: fit-content;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
}
#commands-container .command-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #1e1e1e;
}
#commands-container .command-icon {
  width: 12px;
  height: 12px;
  background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/open-arrow.svg");
  margin-left: 0.3rem;
}
.loader {
  width: 15px;
  height: 15px;
  color: #620091;
  background: linear-gradient(currentColor 0 0),
    linear-gradient(currentColor 0 0), linear-gradient(currentColor 0 0),
    linear-gradient(currentColor 0 0);
  background-size: 8px 8px;
  background-repeat: no-repeat;
  animation: sh5 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  margin-left: 50%;
  transform: translateX(-50%);
}
@keyframes sh5 {
  0% {
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  }
  33% {
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    width: 30px;
    height: 30px;
  }
  66% {
    background-position: 100% 0, 100% 100%, 0 100%, 0 0;
    width: 30px;
    height: 30px;
  }
  100% {
    background-position: 100% 0, 100% 100%, 0 100%, 0 0;
  }
}
.loader-container {
  width: 100%;
  height: 50px;
}
.loader-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #676969;
  width: 100%;
  text-align: center;
  padding-bottom: 1.5rem;
}
.relativeUrl {
  margin-right: 0.5rem;
  color: #620091;
  cursor: pointer;
  background: #ffffff;
  border-width: 1px;
  border-style: solid;
  border-color: #dedfe1;
  border-image: initial;
  border-radius: 8px;
  padding: 6px 10px 4px;
  color: #1e1e1e;
  font-size: 12px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-bottom: 0.3rem;
}
.relativeUrl:hover {
  color: #1e1e1e;
  text-decoration: underline !important;
}
`;
;/**

Pauses the execution for a specified duration.
@param {number} ms - The duration in milliseconds to sleep.
@returns {Promise} - A Promise that resolves after the specified duration.
@author Yash Chouriya
*/
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Triggers a click event on the element with the specified selector.
 * @param {string} selector - The selector of the element to click.
 * @returns {boolean} - Returns true if the element was found and clicked, false otherwise.
 * @author Yash Chouriya
 */
const triggerClickOnElement = (selector) => {
  // Find the element using the selector
  const element = window.document.querySelector(selector);

  // If the element is not found, return false
  if (!element) return false;

  // Trigger a click event on the element
  element.click();

  // Return true to indicate that the click was successful
  return true;
};

/**
 * Updates the value of an input element with the specified selector.
 * @param {string} selector - The selector of the input element.
 * @param {string} value - The value to set for the input element.
 * @returns {boolean} - Returns true if the input element was found and its value was updated, false otherwise.
 * @author Yash Chouriya
 */
const updateInputElementValue = (selector, value, element = null) => {
  let inputElement;

  if (element) {
    inputElement = element;
  } else {
    // Find the input element using the selector
    inputElement = window.document.querySelector(selector);
  }

  // If the input element is not found, return false
  if (!inputElement) return false;

  // creating a new custom input event
  const triggerInputEvent = new Event("input", { bubbles: true });

  // Update the value of the input element
  inputElement.value = value;

  // trigger the input event so react or other frameworks can detect the change in the input element
  inputElement.dispatchEvent(triggerInputEvent);

  // Return true to indicate that the value was updated successfully
  return true;
};

/**
 * Finds a campaign by its name in the campaigns screen.
 * @param {string} campaignName - The name of the campaign to find.
 * @returns {Object|boolean} - Returns an object representing the found campaign if successful, or false if not found.
 * @author Yash Chouriya
 */
const findCampaignByNameInCampaignsScreen = (campaignName) => {
  try {
    // Find the campaign holder div in the campaigns screen
    const campaignHolderDiv = document.querySelector(
      "div.pb-5.main-content-center.container"
    );

    // Get all anchor elements within the campaign holder div
    const anchorElements = campaignHolderDiv.querySelectorAll("a");

    // Iterate through each anchor element
    for (const [index, anchor] of anchorElements.entries()) {
      // Skip if the anchor element does not have a href attribute
      if (!anchor.href) continue;

      // Define a regex pattern to match campaign URLs
      const regex = /\/app\/campaign\/[^/]+\/analytics/;

      // Skip if the anchor's href does not match the campaign URL pattern
      if (!regex.test(anchor.href)) continue;

      // Get all p tags within the anchor element
      const pTags = anchor.querySelectorAll("p");

      // Skip if there are no p tags
      if (!pTags.length) continue;

      // Get the first p tag (childWithName) and the second p tag (statusElement)
      const pTag = pTags[0];
      const statusElement = pTags[1];

      // Skip if the p tag's innerText does not match the campaign name
      if (pTag.innerText !== campaignName) continue;

      // Get all anchor elements within the current anchor element (actions)
      const actions = anchor.querySelectorAll("a");

      // Return an object representing the found campaign
      return {
        parent: anchor,
        childWithName: pTag,
        name: pTag.innerText,
        actions,
        index,
        statusElement,
        status: statusElement.innerText,
      };
    }

    // Return false if the campaign is not found
    return false;
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);

    // Return false in case of an error
    return false;
  }
};

/**
 * Toggles the play/pause state of a campaign.
 * @param {string} campaignName - The name of the campaign.
 * @returns {Object|boolean} - Returns an object representing the found campaign if successful, or false if not found.
 * @author Yash Chouriya
 */
const openCampaign = (campaignName) => {
  try {
    // Find the campaign by name
    const campaign = findCampaignByNameInCampaignsScreen(campaignName);

    // If the campaign is not found, return false
    if (!campaign) {
      return false;
    }

    campaign.parent.click();

    // Return true to indicate successful triggering campaign
    return campaign;
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);
    // Return false in case of an error
    return false;
  }
};

/**
 * Finds an element in the DOM by tag name and inner text.
 *
 * @param {string} tagName - The tag name of the elements to search for.
 * @param {string} innerText - The inner text to match against.
 * @param {boolean} [exactMatch=false] - Specifies whether the inner text match should be exact.
 * @returns {Element|null} - The matching element or null if no match is found.
 * @author Yash Chouriya
 */
function findElementInDomByInnerTextAndTagName(
  tagName,
  innerText,
  exactMatch = false
) {
  // Retrieve all elements with the specified tag name
  const elements = document.getElementsByTagName(tagName);

  // Iterate over the elements
  for (const element of elements) {
    // Retrieve the inner text of the current element and trim any leading or trailing white space
    const elementInnerText = element.innerText.trim();
    console.log(elementInnerText);
    // Perform the matching based on the provided criteria
    if (
      exactMatch
        ? elementInnerText === innerText
        : elementInnerText.includes(innerText)
    ) {
      // Return the matching element
      return element;
    }
  }

  // No matching element found, return null
  return null;
}

/**
 * Finds an element in the DOM by class.
 *
 * @param {string} text - The text is the class of the elements to search for.
 * @returns {Element|null} - The matching element or null if no match is found.
 * @author Yash Chouriya
 */
const findElementByClassWhichIncludesProvidedText = (text) => {
  return document.querySelector(`[class*="${text}"]`);
};

/**
 * Updates the value of an input element by triggering a React state change.
 * @param {object} element - The input element object.
 * @param {string} value - The new value to be set for the input element.
 * @returns {boolean} - Returns true if the value was successfully updated, false otherwise.
 * @author Yash Chouriya
 */
const updateInputValueByTriggeringReactState = (element, value) => {
  try {
    const elementObject = { ...element };
    const reactProps = Object.keys(elementObject);
    const reactStateProp = elementObject[reactProps[1]];
    reactStateProp.onChange({ target: { value } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;/**
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
;const exportCampaignFile = async (campaignName) => {
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
;const opencampaignAnalytics = (campaignName) => {
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
;const updateCampaignName = async (newCampaignName) => {
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
;/**
 * Performs the necessary actions to add a new campaign.
 * @returns {boolean} - Returns true if the campaign was added successfully, false otherwise.
 * @author Yash Chouriya
 */
const addNewCampaign = async (name) => {
  try {
    console.log("Inside AddNewCampaign method");

    // Navigate to the campaign page
    triggerClickOnElement('div[id="sidebar_icon_campaigns"]');

    await sleep(2000);

    console.log("slept good");

    // Selector for the "Add New" button
    const addNewButtonSelector =
      'button[class="d-none d-sm-block btn btn-outline-primary"]';

    // Selector for the input element to update the campaign name
    const inputSelector = 'input[placeholder="Give your campaign a name"]';

    // Selector for the "Continue" button
    const continueButtonSelector = 'button[class="btn-lg btn btn-primary"]';

    // Click the "Add New" button
    const isAddNewClicked = triggerClickOnElement(addNewButtonSelector);
    if (!isAddNewClicked) return false;

    await sleep(1000);

    // Update the campaign name input
    const isInputUpdated = updateInputElementValue(inputSelector, name);
    if (!isInputUpdated) return false;

    await sleep(500);

    // Click the "Continue" button
    const isContinueButtonClicked = triggerClickOnElement(
      continueButtonSelector
    );
    return !!isContinueButtonClicked;
  } catch (error) {
    console.error("Error in AddNewCampaign:", error);
    return false;
  }
};
;/**
 * Initiates a forgot password request by interacting with the corresponding elements in the DOM.
 *
 * @param {string} email - The email to be entered in the forgot password form.
 * @returns {boolean} - Returns true if the button is clicked successfully, otherwise false.
 * @author Yash Chouriya
 */
const forgotPasswordRequest = async (email) => {
  try {
    // Find the "Forgot password?" element
    const forgotPasswordElement = findElementInDomByInnerTextAndTagName(
      "small",
      "Forgot password?"
    );
    if (!forgotPasswordElement) return false;

    // Click on the "Forgot password?" element
    forgotPasswordElement.click();

    await sleep(500);

    // Update the email input element with the provided email
    const isForgotPasswordEmailElementUpdated = updateInputElementValue(
      'input[form="forgotPasswordForm"]',
      email
    );

    if (!isForgotPasswordEmailElementUpdated) return false;

    // Click on the button within the forgotPasswordForm
    const buttonClicked = triggerClickOnElement(
      'button[form="forgotPasswordForm"]'
    );
    return buttonClicked;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const opencampaignLeads = (campaignName) => {
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

    // iterate through all span tag and check if innerText matches leads

    const spanList = document.querySelectorAll("span");
    for (let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      if (span.innerText === "Leads") {
        // click on the span button
        const isleadsClicked = triggerClickOnElement(span.id);
        if (!isleadsClicked) {
          return false;
        }
        break;
      }
    }

    return !(i === spanList.length);
  } catch (error) {
    console.error("Error during openLeads:", error);
    return false;
  }
};
;/**

Updates the user's email in the settings.

@param {string} newEmail - The new email address.

@returns {boolean} - True if the update is successful, false otherwise.
@author Yash Chouriya
*/
const updateUsersEmail = async (newEmail) => {
  try {
    console.log("Updating user email");

    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Profile" section in the settings page
    const profileSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Profile"
    );

    if (!profileSection) return false;

    // Click on the "Profile" section to expand it
    profileSection.click();

    await sleep(500);

    // Find the setting form container in the settings page
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );

    // Find the email input element
    const inputs = settingFormContainer.querySelectorAll("input");
    const emailInput = inputs[2];

    // Update the value of the email input
    const emailInputObject = { ...emailInput };
    const reactProps = Object.keys(emailInputObject);
    const reactStateProp = emailInputObject[reactProps[1]];
    reactStateProp.onChange({ target: { value: newEmail } });

    await sleep(500);

    // Find the "Save" button in the settings page
    const hiddenSection = document.querySelector('div[class="collapse show"]');
    const saveButton = hiddenSection.querySelector("button");

    if (!saveButton) return false;

    // Click on the "Save" button to save the changes
    saveButton.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;/**
 * Adds a new member to the workspace.
 *
 * @param {string} newUserEmail - The email address of the new member.
 * @returns {boolean} - Returns true if the new member is added successfully, false otherwise.
 * @author Yash Chouriya
 */
const addNewMemberInWorkspace = async (newUserEmail) => {
  try {
    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Workspace" section in the settings page
    const workspaceSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Workspace"
    );

    if (!workspaceSection) return false;

    // Click on the "Workspace" section to expand it
    workspaceSection.click();

    await sleep(500);

    // Find the "Members" section in the workspace settings
    const membersSection = findElementInDomByInnerTextAndTagName(
      "p",
      "Members"
    );
    if (!membersSection) return false;

    // Click on the "Members" section to open the member settings
    membersSection.click();

    await sleep(500);

    // Find the container for the member settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelector(
      'input[placeholder="Enter email address"]'
    );
    const inputObject = { ...inputElement };
    const reactProps = Object.keys(inputObject);
    const reactStateProp = inputObject[reactProps[1]];

    // Trigger the onChange event of the input element to enter the new user email
    reactStateProp.onChange({ target: { value: newUserEmail } });

    await sleep(500);

    // Find the "Invite" button in the member settings
    const invite = findElementInDomByInnerTextAndTagName("span", "Invite");
    if (!invite) return false;

    // Click on the "Invite" button to send the invitation
    invite.click();

    return true;
  } catch (error) {
    // Log any errors that occur during the member addition process
    console.error(error);
    return false;
  }
};
;const getShareableCampaignLink = async (campaignName) => {
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
      '[class="MuiButtonBase-root MuiButton-root MuiButton-outlined mr-2"]'
    );

    if (!copyLinkButton) return false;

    copyLinkButton.click();

    return true; // Download initiated successfully
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const opencampaignOptions = (campaignName) => {
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

    // iterate through all span tag and check if innerText matches Options

    const spanList = document.querySelectorAll("span");
    for (let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      if (span.innerText === "Options") {
        // click on the span button
        const isOptionClicked = triggerClickOnElement(span.id);
        if (!isOptionClicked) {
          return false;
        }
        break;
      }
    }

    return !(i === spanList.length);
  } catch (error) {
    console.error("Error during openOption:", error);
    return false;
  }
};
;/**

Updates the user's first name and last name in the settings.
@param {string} firstName - The new first name.
@param {string} lastName - The new last name.
@returns {boolean} - True if the update is successful, false otherwise.
@author Yash Chouriya
*/
const updateUsersName = async (firstName, lastName) => {
  try {
    console.log("Updating user " + firstName + " " + lastName);

    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Profile" section in the settings page
    const profileSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Profile"
    );

    if (!profileSection) return false;

    // Click on the "Profile" section to expand it
    profileSection.click();

    await sleep(500);

    // Find the setting form container in the settings page
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );

    // Find the input elements for first name and last name
    const inputs = settingFormContainer.querySelectorAll("input");
    const firstNameInput = inputs[0];
    const lastNameInput = inputs[1];

    // Update the value of the first name input
    const firstNameInputObject = { ...firstNameInput };
    const reactPropsFirst = Object.keys(firstNameInputObject);
    const reactStatePropFirst = firstNameInputObject[reactPropsFirst[1]];
    reactStatePropFirst.onChange({ target: { value: firstName } });

    // Update the value of the last name input
    const LastNameInputObject = { ...lastNameInput };
    const reactPropsLast = Object.keys(LastNameInputObject);
    const reactStatePropLast = LastNameInputObject[reactPropsLast[1]];
    reactStatePropLast.onChange({ target: { value: lastName } });

    await sleep(500);

    // Find the "Save" button in the settings page
    const saveButton = findElementInDomByInnerTextAndTagName("span", "Save");
    if (!saveButton) return false;

    // Click on the "Save" button to save the changes
    saveButton.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const addNewImapSmtpEmailAccount = async (
  firstName,
  lastName,
  email,
  password,
  host,
  port
) => {
  try {
    console.log("adding new email account");

    const addNewButton = document.querySelector(
      'button[class="d-none d-sm-block btn btn-outline-primary"]'
    );

    addNewButton.click();
    await sleep(1000);

    const anyProviderBlock = document.querySelectorAll(
      '[class*="ConnectOptions__ProviderCard"]'
    )[3];

    if (!anyProviderBlock) return false;

    anyProviderBlock.click();

    await sleep(500);

    const singleAccountBlock = document.querySelectorAll(
      '[class*="ConnectCustom__ProviderCard"]'
    )[1];

    if (!singleAccountBlock) return false;

    singleAccountBlock.click();

    await sleep(500);

    const firstNameInput = document.querySelector(
      'input[placeholder="First Name"]'
    );
    const lastNameInput = document.querySelector(
      'input[placeholder="First Name"]'
    );
    const emailInput = document.querySelector(
      'input[placeholder="Email address to connect"]'
    );

    const firstNameUpdated = updateInputElementValue(
      "",
      firstName,
      firstNameInput
    );
    const LastNameUpdated = updateInputElementValue(
      "",
      lastName,
      lastNameInput
    );
    const emailUpdated = updateInputElementValue("", email, emailInput);

    if (!firstNameUpdated || !LastNameUpdated || !emailUpdated) return false;

    const nextButton = document.querySelector(
      'button[class="w-100 mt-5 btn-lg btn btn-success"]'
    );
    nextButton.click();

    await sleep(500);

    const passwordInput = document.querySelector(
      'input[placeholder="Password"]'
    );

    const hostInput = document.querySelector(
      'input[placeholder="imap.website.com"]'
    );

    const portInput = document.querySelector('input[placeholder="IMAP Port"]');

    const passwordUpdated = updateInputElementValue(
      "",
      password,
      passwordInput
    );
    const hostUpdated = updateInputElementValue("", host, hostInput);
    const portUpdated = updateInputElementValue("", port, portInput);

    if (!passwordUpdated || !hostUpdated || !portUpdated) return false;

    const nextButton_ = document.querySelector(
      'button[class="w-100 mt-3 mt-sm-5 btn-lg btn btn-success"]'
    );
    nextButton_.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const opencampaignSchedule = (campaignName) => {
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
;const updateUsersPassword = async (newPassword) => {
  try {
    console.log("Updating user password");
    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Workspace" section in the settings page
    const profileSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Profile"
    );

    if (!profileSection) return false;

    // Click on the "Workspace" section to expand it
    profileSection.click();

    await sleep(500);

    // Find the container for the workspace settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelectorAll("input");

    const passInput = inputElement[3];
    passInput.click();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const deleteCampaign = async (campaignId) => {
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
;/**

Performs a login operation with the provided email and password.

@param {string} email - The email to use for login.

@param {string} password - The password to use for login.

@returns {boolean} - Returns true if the login was successful, false otherwise.

@author Yash Chouriya
*/
const login = (email, password) => {
  try {
    // Update the email input field with the provided email
    const isEmailEntered = updateInputElementValue(
      'input[name="email"]',
      email
    );
    if (!isEmailEntered) {
      // If failed to update the email input field, return false
      return false;
    }

    // Update the password input field with the provided password
    const isPasswordEntered = updateInputElementValue(
      'input[name="password"]',
      password
    );
    if (!isPasswordEntered) {
      // If failed to update the password input field, return false
      return false;
    }

    // Trigger a click on the login button
    const isSubmitClicked = triggerClickOnElement('button[form="loginForm"]');

    return !!isSubmitClicked;
  } catch (error) {
    // Log any errors that occur during the login process
    console.error("Error during login:", error);

    // Return false if an error occurs during the login process
    return false;
  }
};
;const opencampaignSequences = (campaignName) => {
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

    // iterate through all span tag and check if innerText matches sequences

    const spanList = document.querySelectorAll("span");
    for (let i = 0; i < spanList.length; i++) {
      const span = spanList[i];
      if (span.innerText === "Sequences") {
        // click on the span button
        const isSequenceClicked = triggerClickOnElement(span.id);
        if (!isSequenceClicked) {
          return false;
        }
        break;
      }
    }

    return !(i === spanList.length);
  } catch (error) {
    // Log any errors that occur during the oepning campagin process
    console.error("Error during openSequence:", error);

    // Return false if an error occurs during the campaign process
    return false;
  }
};
;/**
 * Updates the name of the current workspace.
 *
 * @param {string} newWorkspaceName - The new name for the workspace.
 * @returns {boolean} - Returns true if the workspace name is updated successfully, false otherwise.
 * @author Yash Chouriya
 */
const updateCurrentWorkspaceName = async (newWorkspaceName) => {
  try {
    // Find the user profile menu in the DOM
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    // Click on the first child element of the user profile menu to open the menu dropdown
    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the "Settings" menu item in the DOM
    const settingMenu = findElementInDomByInnerTextAndTagName("li", "Settings");

    // Click on the "Settings" menu item to open the settings page
    settingMenu.click();

    await sleep(500);

    // Find the "Workspace" section in the settings page
    const workspaceSection = findElementInDomByInnerTextAndTagName(
      "span",
      "Workspace"
    );

    if (!workspaceSection) return false;

    // Click on the "Workspace" section to expand it
    workspaceSection.click();

    await sleep(500);

    // Find the container for the workspace settings form
    const settingFormContainer = document.querySelector(
      'div[id="settingsMain"]'
    );
    const inputElement = settingFormContainer.querySelector("input");

    // Update the value of the input element with the new workspace name
    const inputElementObject = { ...inputElement };
    const reactProps = Object.keys(inputElementObject);
    const reactStateProp = inputElementObject[reactProps[1]];
    reactStateProp.onChange({ target: { value: newWorkspaceName } });

    await sleep(500);

    // Find the "Save" button in the settings page
    const saveButton = findElementInDomByInnerTextAndTagName("span", "Save");
    if (!saveButton) return false;

    // Click on the "Save" button to save the changes
    saveButton.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;/**
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
;/**
 * Logs out the user by interacting with the logout element in the DOM.
 *
 * @returns {boolean} - Returns true if the logout element is clicked successfully, otherwise false.
 * @author Yash Chouriya
 */
const logout = async () => {
  try {
    const userProfileMenu = findElementByClassWhichIncludesProvidedText(
      "AppTopbar__AccountSettingsContainer"
    );

    if (!userProfileMenu) return false;

    userProfileMenu.children[0].click();

    await sleep(500);

    // Find the logout element in the DOM
    const logoutDropDownMenu = findElementInDomByInnerTextAndTagName(
      "li",
      "Logout"
    );

    if (!logoutDropDownMenu) return false;

    // Click on the logout element
    logoutDropDownMenu.click();

    return true;
  } catch (error) {
    // Log any errors that occur during the logout process
    console.error(error);
    return false;
  }
};
;/**
 * Opens the email setting for the specified email address.
 *
 * @param {string} email - The email address to enable or disable warmup for.
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya
 */
const openEmailSetting = (email) => {
  try {
    // Select all elements with a class containing "accounts__AccountCard"
    const allEmailCards = document.querySelectorAll(
      '[class*="accounts__AccountCard"]'
    );

    // If no email cards are found, return false
    if (!allEmailCards.length) return false;

    // Loop over each email card
    for (const emailCard of allEmailCards) {
      // Find the h6 element within the current email card
      const emailH6Element = emailCard.querySelector("h6");

      // If the email in the h6 element matches the provided email
      if (emailH6Element.innerText === email) {
        console.log(emailCard); // Log the email card

        // Extract the email index from the h6 element's ID
        const emailArrId = emailH6Element.id.split("_");
        const emailIndex = emailArrId[emailArrId.length - 1];

        // Find the warmupIcon element with the corresponding email index
        const warmupIcon = emailCard.querySelector(
          `a[id="settings_${emailIndex}"]`
        );

        // Trigger a click event on the warmupIcon element
        warmupIcon.click();

        // Return true to indicate that the settings were opened
        return true;
      }
    }

    // If the email is not found, return false
    return false;
  } catch (error) {
    console.error(error); // Log any errors that occur
    return false;
  }
};
;const duplicateCampaign = async (campaignId) => {
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
;/**
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
;/**
 * Performs a sign-up process by filling out the form and clicking on various elements.
 * @param {string} first_name - The first name to be entered in the sign-up form.
 * @param {string} last_name - The last name to be entered in the sign-up form.
 * @param {string} email - The email address to be entered in the sign-up form.
 * @param {string} password - The password to be entered in the sign-up form.
 * @returns {Promise<boolean>} - A promise that resolves to true if the sign-up process is successful, or false otherwise.
 */
const signUp = async (first_name, last_name, email, password) => {
  try {
    // Update first name input element
    const isFirstNameEntered = updateInputElementValue(
      'input[name="first_name"]',
      first_name
    );

    // Update last name input element
    const isSecondNameEntered = updateInputElementValue(
      'input[name="last_name"]',
      last_name
    );

    // Update email input element
    const isEmailEntered = updateInputElementValue(
      'input[name="email"]',
      email
    );

    // Update password input element
    const isPasswordEntered = updateInputElementValue(
      'input[name="password"]',
      password
    );

    // Check if any field is not entered
    if (
      !isFirstNameEntered ||
      !isSecondNameEntered ||
      !isEmailEntered ||
      !isPasswordEntered
    ) {
      return false;
    }

    // Select term and condition checkboxes
    const conditionCheckBoxes = window.document.querySelectorAll(
      'input[type="checkbox"]'
    );
    const termAndConditionCheckBox = conditionCheckBoxes[0];
    const privacyPolicyCheckBox = conditionCheckBoxes[1];

    // Check if checkboxes are present
    if (!privacyPolicyCheckBox || !termAndConditionCheckBox) {
      return false;
    }

    // Click on term and condition checkboxes
    privacyPolicyCheckBox.click();
    termAndConditionCheckBox.click();

    // Submit the form
    const isSubmitClicked = triggerClickOnElement(
      'button[class="w-100 btn btn-success"]'
    );

    // Check if the submit button was clicked successfully
    if (!isSubmitClicked) {
      return false;
    }

    // Wait for a certain duration
    await sleep(3000);
    console.log("Slept well");

    // Let's get to know you section

    // Select chips (example: aFriendChip, agencyChip)
    const chips = document.querySelectorAll('[role="button"]');
    if (!chips || !chips.length) {
      return false;
    }
    const aFriendChip = chips[0];
    const agencyChip = chips[9];
    if (!aFriendChip || !agencyChip) {
      return false;
    }

    // Click on the selected chips
    aFriendChip.click();
    agencyChip.click();

    // Click continue button
    const continueButton = triggerClickOnElement(
      'button[class="btn btn-primary"]'
    );
    return continueButton;
  } catch (error) {
    // Log any errors that occur during the sign-up process
    console.error("Error during login:", error);
    // Return false if an error occurs during the sign-up process
    return false;
  }
};
;/**
 * Enables or disables email warmup for the specified email address.
 *
 * @param {string} email - The email address to enable or disable warmup for.
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya
 */
const enableOrDisableEmailWarmup = (email) => {
  try {
    // Find all email cards in the DOM
    const allEmailCards = document.querySelectorAll(
      '[class*="accounts__AccountCard"]'
    );

    if (!allEmailCards.length) return false;

    // Iterate through each email card
    for (const emailCard of allEmailCards) {
      // Find the email's h6 element
      const emailH6Element = emailCard.querySelector("h6");

      // Check if the email matches the specified email address
      if (emailH6Element.innerText === email) {
        console.log(emailCard);

        // Extract the email index from the h6 element's ID
        const emailArrId = emailH6Element.id.split("_");
        const emailIndex = emailArrId[emailArrId.length - 1];

        // Find the warmup icon and click on it
        const warmupIcon = emailCard.querySelector(
          `a[id="warmup_${emailIndex}"]`
        );
        warmupIcon.click();
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const openBillingsPage = async () => {
    try {
        // find out the a tag with href = app/settings/billing

        const billingButton = triggerClickOnElement(
            document.querySelector('a[href="app/settings/billing"]')
        );

        // if billingButton is not found return false
        if (!billingButton) return false;

        // wait for the billing page to load
        await sleep(1000);

        // return true if billing page is loaded
        return true;
    } catch (error) {
        console.error("Error while opening Billinngs page", error);
        return false;
    }
};
;/**

Starts the product tour by clicking on the help button and selecting the "Start product tour" option.

 *
 * @returns {boolean} - True if the operation is successful, false otherwise.
 * @author Yash Chouriya

*/
const startProductTour = () => {
  try {
    // Find the help button in the DOM
    const helpButton = document.querySelector(
      'button[aria-label="help-button"]'
    );

    // If the help button is not found, return false
    if (!helpButton) return false;

    // Click on the help button to open the help menu
    helpButton.click();

    // Find the "Start product tour" element in the DOM
    const startTourElement = findElementInDomByInnerTextAndTagName(
      "li",
      "Start product tour"
    );

    // If the "Start product tour" element is not found, return false
    if (!startTourElement) return false;

    // Click on the "Start product tour" element to start the tour
    startTourElement.click();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
;const fileList = [
  "./flows/active-or-pause-campaign.js",
  "./flows/export-campaign-file.js",
  "./flows/open-campaign-analytics.js",
  "./flows/update-campaign-name.js",
  "./flows/add-new-campaign.js",
  "./flows/forgot-password-request.js",
  "./flows/open-campaign-leads.js",
  "./flows/update-users-email.js",
  "./flows/add-new-member-in-workspace.js",
  "./flows/get-shareable-campaign-link.js",
  "./flows/open-campaign-options.js",
  "./flows/update-users-name.js",
  "./flows/connect-imap-or-smtp-email-account.js",
  "./flows/index.js",
  "./flows/open-campaign-schedule.js",
  "./flows/update-users-password.js",
  "./flows/delete-campaign.js",
  "./flows/login.js",
  "./flows/open-campaign-sequences.js",
  "./flows/update-workspace-name.js",
  "./flows/download-campaign-analytics.js",
  "./flows/logout.js",
  "./flows/open-email-setting.js",
  "./flows/duplicate-campaign.js",
  "./flows/navigate-to-side-menu.js",
  "./flows/sign-up.js",
  "./flows/enable-or-disable-email-warmup.js",
  "./flows/open-billings-page.js",
  "./flows/start-product-tour.js",
];

let flowMappings = {
  login: {
    func: login,
    number_of_args: "2",
    description: "Function to log in to the system.",
    args_ask_message:
      "Please share your email and password in the following format:\n\njohn@example.com,kahnak@ak#",
    url: "https://app.instantly.ai/auth/login",
  },
  logout: {
    func: logout,
    number_of_args: "0",
    description: "Function to log out of the system.",
    args_ask_message: "Do you want to log out? Enter Yes or No.",
    url: "https://app.instantly.ai/app/accounts",
  },
  addNewCampaign: {
    func: addNewCampaign,
    number_of_args: "1",
    description: "Function to add or create a new campaign.",
    args_ask_message: "Please enter a campaign name",
    url: "https://app.instantly.ai/app/campaigns",
  },
  deleteCampaign: {
    func: deleteCampaign,
    number_of_args: "1",
    description: "Function to delete a campaign.",
    args_ask_message: "Please enter a campaign id",
    url: "https://app.instantly.ai/app/campaigns",
  },
  downloadCampaignAnalytics: {
    func: downloadCampaignAnalytics,
    number_of_args: "1",
    description: "Function to download campaign analytics.",
    args_ask_message: "Please enter a campaign name",
    url: "https://app.instantly.ai/app/campaigns",
  },
  enableOrDisableEmailWarmup: {
    func: enableOrDisableEmailWarmup,
    number_of_args: "1",
    description: "Function to enable or disable email warm-up.",
    args_ask_message: "Please enter an email",
    url: "https://app.instantly.ai/app/accounts",
  },
  exportCampaignFile: {
    func: exportCampaignFile,
    number_of_args: "1",
    description: "Function to export a campaign file.",
    args_ask_message: "Please enter a campaign name",
    url: "https://app.instantly.ai/app/campaigns",
  },
  forgotPasswordRequest: {
    func: forgotPasswordRequest,
    number_of_args: "1",
    description: "Function to request a new password.",
    args_ask_message: "Please enter an email",
    url: "https://app.instantly.ai/auth/login",
  },
  getShareableCampaignLink: {
    func: getShareableCampaignLink,
    number_of_args: "1",
    description: "Function to get a shareable campaign link.",
    args_ask_message: "Please enter a campaign name",
    url: "https://app.instantly.ai/app/campaigns",
  },
  openBillingsPage: {
    func: openBillingsPage,
    number_of_args: "0",
    description: "Function to open the billing page.",
    args_ask_message: "Do you want to open the billing page? Enter Yes or No.",
    url: "https://app.instantly.ai/app/accounts",
  },
  openEmailSetting: {
    func: openEmailSetting,
    number_of_args: "1",
    description: "Function to open email settings.",
    args_ask_message: "Please enter an email",
    url: "https://app.instantly.ai/app/accounts",
  },
  startProductTour: {
    func: startProductTour,
    number_of_args: "0",
    description: "Function to start a product tour.",
    args_ask_message: "Do you want to start the product tour? Enter Yes or No.",
    url: "https://app.instantly.ai/app/accounts",
  },
  updateCampaignName: {
    func: updateCampaignName,
    number_of_args: "1",
    description: "Function to update a campaign name.",
    args_ask_message: "Please enter a campaign name",
    url: "https://app.instantly.ai/app/campaigns",
  },
  updateUsersEmail: {
    func: updateUsersEmail,
    number_of_args: "1",
    description: "Function to update the user's email.",
    args_ask_message: "Please enter an email",
    url: "https://app.instantly.ai/app/accounts",
  },
  updateUsersName: {
    func: updateUsersName,
    number_of_args: "2",
    description: "Function to update the user's name.",
    args_ask_message:
      "Please share your first name and last name in the following format:\n\njohn,Doe",
    url: "https://app.instantly.ai/app/accounts",
  },
  updateCurrentWorkspaceName: {
    func: updateCurrentWorkspaceName,
    number_of_args: "1",
    description: "Function to update the current workspace name.",
    args_ask_message: "Please enter a workspace name",
    url: "https://app.instantly.ai/app/accounts",
  },
  addNewMemberInWorkspace: {
    func: addNewMemberInWorkspace,
    number_of_args: "1",
    description: "Function to add or create a new member in the workspace.",
    args_ask_message: "Please enter an email for the new member",
    url: "https://app.instantly.ai/app/accounts",
  },
};

console.log("!!FLOW MAPPING LOADED!!");
;const BACKEND_BASE_URL = "http://127.0.0.1:5000";
// const BACKEND_BASE_URL = "https://ai.getpermian.com";
let CHAT_HISTORY = [];
let CHAT_BOT_ID = null;

const runScript = () => {
  console.log("permian-config", window.permianBotConfig);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const localStorageWrapper = {
    get: (keys) => {
      return new Promise((resolve, reject) => {
        try {
          const data = {};
          for (const key of keys) {
            const value = localStorage.getItem(key);
            if (value) {
              try {
                data[key] = JSON.parse(value);
              } catch (error) {
                data[key] = value;
              }
            }
          }
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },

    set: (items) => {
      return new Promise((resolve, reject) => {
        try {
          for (const key in items) {
            let value;
            try {
              value = JSON.stringify(items[key]);
            } catch (error) {
              value = items[key];
            }
            localStorage.setItem(key, value);
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    remove: (keys) => {
      return new Promise((resolve, reject) => {
        try {
          for (const key of keys) {
            localStorage.removeItem(key);
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  };

  const botPopupModel = `
  <div class="bot-modal-dialog bot-modal-dialog-centered">
    <div style="position:relative;">
      <span id="hamburgerMenu"></span>
      <div class="tabs" id="tabs">
        <div class="tab active" id="chatTab">
          <span class="tab-text">Chat</span>
        </div>
        <div class="tab" id="executeTab">
          <span class="tab-text">Execute</span>
        </div>
      </div>
      <div class="bot-modal-content">
        <div class="chat-section" id="chat-section"></div>
        <div id="commands-container">
          <span class="command-text">SUGGESTED INSTRUCTIONS</span>
          <span class="command-icon"></span>
        </div>
        <div class="messageBox">
          <textarea
            class="messageBoxTextArea"
            id="botTextarea"
            type="text"
            placeholder="Type your query here..."
          ></textarea>
          <span class="messageBoxSpan" id="messageBoxSend">
            <span class="send-arrow" id="send-arrow"></span>
            <span id="send-button-message"></span>
          </span>
        </div>
        <div class="poweredByBubblez">
          <small
            >Powered by
            <span style="text-decoration: underline; color: #620091"
              >Permian</span
            ></small
          >
        </div>
      </div>
    </div>
  </div>
`;

  const defaultChatMessages = [
    {
      text: "Hi, how can i help you?",
      by: "bot",
      feedback_submitted: true,
      feedback: "Yes",
    },

    ...CHAT_HISTORY,
  ];

  const defaultExecuteMessages = [
    {
      text: "Hi, how can i help you?",
      by: "bot",
      feedback_submitted: true,
      feedback: "Yes",
    },
  ];

  const getActiveTab = () => {
    const chatTab = document.getElementById("chatTab");
    return chatTab.classList.contains("active") ? "chat" : "execute";
  };

  // appending the html to the root element start
  let botTriggerDiv = document.createElement("div");
  botTriggerDiv.className = "bot-icon-text-container";
  botTriggerDiv.innerHTML = `
  <div id="bot-trigger-div"></div>
  <div style="color:white;font-size:16px; font-weight:bold;font-family: 'Inter';text-align:center;">Ctrl+k</div>
  `;
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    const modal = document.getElementById("myBotModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  botTriggerDiv.addEventListener("click", () => {
    const modal = document.getElementById("myBotModal");
    if (modal.style.display === "none" || !modal.style.display) {
      modal.style.display = "block";
      modal.style.opacity = "1";
      return true;
    }
    modal.style.display = "none";
    modal.style.opacity = "0";
    return false;
  });

  let popupModal = document.createElement("div");
  popupModal.className = "bot-modal fade";
  popupModal.setAttribute("id", "myBotModal");
  popupModal.innerHTML = botPopupModel;
  document.body.appendChild(botTriggerDiv);
  document.body.appendChild(popupModal);
  // appending the html to the root element end

  // tab change logic start

  const executeTab = document.getElementById("executeTab");
  const chatTab = document.getElementById("chatTab");
  const commandsContainer = document.getElementById("commands-container");
  const chatSection = document.getElementById("chat-section");
  const botTextarea = document.getElementById("botTextarea");
  const messageBoxSpan = document.getElementById("messageBoxSend");

  const feedbackHandler = (index, feedback) => {
    console.log("feedback", index);
    const messagesDataArray =
      getActiveTab() === "chat" ? defaultChatMessages : defaultExecuteMessages;
    messagesDataArray[parseInt(index)] = {
      ...messagesDataArray[parseInt(index)],
      feedback_submitted: true,
      feedback,
    };
    chatSection.innerHTML = updateChat(messagesDataArray);
  };

  const regenerateResponse = async (index) => {
    index = parseInt(index);
    let data = {};
    const messagesDataArray =
      getActiveTab() === "chat" ? defaultChatMessages : defaultExecuteMessages;
    const temp = messagesDataArray;
    for (const message of temp.reverse()) {
      if (message.by === "human") {
        data = message;
        break;
      }
    }
    messagesDataArray.reverse();
    messagesDataArray[index] = {
      ...messagesDataArray[index],
      feedback_submitted: true,
      feedback: "No",
    };
    chatSection.innerHTML = updateChat(messagesDataArray);
    botTextarea.value = data.text;
    await handleUserMessageSubmit();
  };

  const tabChangeHandler = (tabName) => {
    if (tabName === "chat") {
      chatTab.setAttribute("class", "tab active");
      executeTab.setAttribute("class", "tab");
      commandsContainer.style.display = "none";
      chatSection.style.height = "540px";
      chatSection.innerHTML = updateChat(defaultChatMessages);
    } else {
      chatTab.setAttribute("class", "tab");
      executeTab.setAttribute("class", "tab active");
      // if (defaultExecuteMessages.length === 1) {
      commandsContainer.style.display = "flex";
      chatSection.style.height = "495px";
      // }
      chatSection.innerHTML = updateChat(defaultExecuteMessages);
    }

    return true;
  };

  executeTab.addEventListener("click", () => {
    tabChangeHandler("execute");
  });
  chatTab.addEventListener("click", () => {
    tabChangeHandler("chat");
  });

  // tab change logic end

  // const closePopupButton = document.getElementById("closeButton");
  // closePopupButton.addEventListener("click", () => {
  //   const modal = document.getElementById("myBotModal");
  //   modal.style.display = "none";
  // });

  const updateChat = (chatData) => {
    let chatSectionInnerHtml = "";
    for (const [index, message] of chatData.entries()) {
      const showFeedback = message.by === "bot" && !message?.feedback_submitted;

      const feedbackDiv = `
      <div data-index="${index}">
        <div class="chat-message-bot">
            <div class="bot-icon-holder">
              <div class="bot-svg"></div>
            </div>
            <div class="bot-head-reply">
              <div class="inner-chat-text bot-text-align">Was this response helpful?</div>
            </div>
            
        </div>
        <div class="feedback-button-container">
          <div class="feedback-buttons" data-index="${index}" id="feedbackYes">Yes</div>
          <div class="feedback-buttons" data-index="${index}" id="feedbackNo">No</div>
          <div class="feedback-buttons" data-index="${index}" id="regenerate">
            <span>Regenerate response</span>
            <img src="https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/reload.svg"></img>
          </div>
        </div>
      </div>
      `;

      if (message.text) {
        chatSectionInnerHtml += `
        <div>
          <div class="chat-message-${message.by}">
              <div class="${message.by}-icon-holder">
                <div class="${message.by}-svg"></div>
              </div>
              <div class="${message.by}-head-reply">
                <div class="inner-chat-text ${message.by}-text-align">${message.text
          }</div>
              </div>
          </div>
          <div style="display:${showFeedback ? "inherit" : "none"
          }">${feedbackDiv}</div>
        </div>
        `;
      } else {
        const loader = `<div class="loader"></div>`;
        chatSectionInnerHtml += `
        <div style="padding: 20px 0">
            <div class="loader-container">
                ${loader}
            </div>
            <div class="loader-text">Searching documentation. This may take a second!</div>
        </div>
        `;
      }
    }
    chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;
    return chatSectionInnerHtml;
  };

  chatSection.innerHTML =
    getActiveTab() === "chat"
      ? updateChat(defaultChatMessages)
      : updateChat(defaultExecuteMessages);

  chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;

  const handleLoading = (isEnable) => {
    const botTextarea = document.getElementById("botTextarea");
    const sendButtonIcon = document.getElementById("send-arrow");
    const sendButtonText = document.getElementById("send-button-message");
    if (isEnable) {
      botTextarea.setAttribute("readonly", "true");
      sendButtonIcon.style.display = "none";
      messageBoxSpan.style.backgroundColor = "#CACCCC";
      // sendButtonText.innerText = "Generating";
    } else {
      botTextarea.removeAttribute("readonly");
      sendButtonIcon.style.display = "inline-flex";
      messageBoxSpan.style.backgroundColor = "#620091";
      sendButtonText.innerText = "";
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("myBotModal");
    modal.style.display = "none";
  };

  const handleUserMessageSubmit = async () => {
    if (!botTextarea.value) return;
    const message = botTextarea.value;
    botTextarea.value = "";
    handleLoading(true);
    const isChatTabEnabled = getActiveTab() === "chat";

    const messagesDataArray = isChatTabEnabled
      ? defaultChatMessages
      : defaultExecuteMessages;

    // if (!isChatTabEnabled && messagesDataArray.length === 1) {
    //   commandsContainer.style.display = "flex";
    // } else {
    //   commandsContainer.style.display = "none";
    // }

    messagesDataArray.push({
      text: message,
      by: "human",
    });

    chatSection.innerHTML = updateChat(messagesDataArray);
    chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;

    if (!isChatTabEnabled) {
      try {
        const storedData = await localStorageWrapper.get(["command"]);

        if (storedData?.command) {
          if (
            message.toLowerCase() === "no" ||
            message.toLowerCase() === "nope"
          ) {
            await localStorageWrapper.remove(["command"]);
            messagesDataArray.push({
              text: "Okay",
              by: "bot",
              feedback_submitted: true,
              feedback: "Yes",
            });

            chatSection.innerHTML = updateChat(messagesDataArray);
            chatSection.scrollTop =
              chatSection.scrollHeight - chatSection.clientHeight;
            handleLoading(false);
            return;
          }

          const argArray = message.split(",");
          const commandData = storedData.command;
          commandData.args = argArray;
          await localStorageWrapper.remove("command");
          await localStorageWrapper.set({ command: commandData });
          handleLoading(false);

          const currentPath = window.location.href;
          if (!currentPath.includes(commandData.url.split("/").at(-1))) {
            window.location.href = commandData.url;
          } else {
            await localStorageWrapper.remove("command");
            const func = flowMappings[commandData.func]["func"];
            await func(...argArray);
            await localStorageWrapper.remove(["command"]);
            messagesDataArray.push({
              text: "Done",
              by: "bot",
              feedback_submitted: true,
              feedback: "Yes",
            });

            chatSection.innerHTML = updateChat(messagesDataArray);
            chatSection.scrollTop =
              chatSection.scrollHeight - chatSection.clientHeight;
            handleLoading(false);
            return;
          }
          return;
        } else {
          const result = await fetch(`${BACKEND_BASE_URL}/find-function`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: message,
            }),
          });
          const resultJson = await result.json();
          await localStorageWrapper.set({
            command: resultJson.data,
          });

          messagesDataArray.push({
            text: resultJson.data.args_ask_message,
            by: "bot",
            feedback_submitted: true,
            feedback: "Yes",
          });

          chatSection.innerHTML = updateChat(messagesDataArray);
          chatSection.scrollTop =
            chatSection.scrollHeight - chatSection.clientHeight;
          handleLoading(false);
          return;
        }
      } catch (error) {
        await localStorageWrapper.remove(["command"]);
        messagesDataArray.push({
          text: "Sorry, I don't have capability to do that at the moment?",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });

        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;
        handleLoading(false);
        return;
      }
    }

    messagesDataArray.push({
      text: "",
      by: "bot",
      feedback_submitted: true,
    });

    chatSection.innerHTML = updateChat(messagesDataArray);
    chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;

    const onFailureMessage =
      "Sorry, I'm not able to process your query at the moment. Please try again";

    let botResponseMessage = "";
    let jsonResponse = {};
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/chatbot/${CHAT_BOT_ID}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      jsonResponse = await response.json();
      console.log(jsonResponse);
      botResponseMessage = jsonResponse?.result || onFailureMessage;
      if (jsonResponse.status) {
        const relativeUrls = jsonResponse.relative_urls;
        let temp = "";
        for (const urlData of relativeUrls) {
          temp += `<a class="relativeUrl" href="${urlData.url}">${urlData.title}</a>`;
        }
        botResponseMessage += `<div style="display: inline-block;margin-top: 15px;"><p style="font-family: Inter;font-style: normal;font-weight: 500;font-size: 12px;color:black;">Verified Sources:</p><div>${temp}</div></div>`;
      }
    } catch (error) {
      console.log(error);
    }

    messagesDataArray[messagesDataArray.length - 1] = {
      text: botResponseMessage,
      by: "bot",
      feedback_submitted: !jsonResponse.status,
    };
    handleLoading(false);
    chatSection.innerHTML = updateChat(messagesDataArray);
    chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;

    setTimeout(() => {
      const feedbackYes = document.querySelectorAll('div[id="feedbackYes"]');
      const feedbackNo = document.querySelectorAll('div[id="feedbackNo"]');
      const regenerateButton = document.querySelectorAll(
        'div[id="regenerate"]'
      );

      if (feedbackYes) {
        feedbackYes[feedbackYes.length - 1].addEventListener(
          "click",
          function (event) {
            const index =
              feedbackYes[feedbackYes.length - 1].getAttribute("data-index");
            feedbackHandler(index, "Yes");
          }
        );
      }

      if (feedbackNo) {
        feedbackNo[feedbackNo.length - 1].addEventListener(
          "click",
          function (event) {
            const index =
              feedbackNo[feedbackNo.length - 1].getAttribute("data-index");
            feedbackHandler(index, "No");
          }
        );
      }

      if (regenerateButton) {
        regenerateButton[regenerateButton.length - 1].addEventListener(
          "click",
          async function (event) {
            const index =
              regenerateButton[regenerateButton.length - 1].getAttribute(
                "data-index"
              );
            await regenerateResponse(index);
          }
        );
      }
    }, 1000);
  };

  messageBoxSpan.addEventListener("click", handleUserMessageSubmit);

  botTextarea.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      // Enter key was pressed, do something...
      await handleUserMessageSubmit();
      return;
    }
  });

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      console.log("Ctrl+K pressed");
      const modal = document.getElementById("myBotModal");
      if (modal.style.display === "block") {
        modal.style.display = "none";
        return;
      }
      modal.style.display = "block";
    }
    return true;
  });

  localStorageWrapper.get(["command"]).then(async (result) => {
    console.log("Value retrieved:", result);
    await localStorageWrapper.remove(["command"]);
    if (result.command) {
      await sleep(2000);
      const command = result.command;
      const func = flowMappings[command.func]["func"];
      try {
        await func(...command.args);
      } catch (error) {
        console.log("Failed to execute functions: " + error);
      }
    }
  });
};

setTimeout(async () => {
  try {
    console.log("!!!BOT SCRIPT LOADED!!!");

    if (!window?.permianBotConfig?.chatbotId) {
      return console.error(
        "!!!PERMIAN CHATBOT ID IS NOT FOUND IN GLOBAL VARIABLE 'permianBotConfig'!!!"
      );
    }

    CHAT_BOT_ID = window.permianBotConfig.chatbotId;

    try {
      const oldChatData = await fetch(
        `${BACKEND_BASE_URL}/chatbot/${CHAT_BOT_ID}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const oldChatDataJson = await oldChatData.json();
      CHAT_HISTORY = [...CHAT_HISTORY, ...oldChatDataJson.history];
    } catch (error) {
      console.error("!!!COULD NOT GET CHAT HISTORY!!!", error);
    }

    const styleTag = document.createElement("style");
    styleTag.textContent = GLOBAL_CHATBOT_STYLES;
    document.head.appendChild(styleTag);
    return runScript();
  } catch (error) {
    console.log("ERROR WHILE RUNNING SCRIPT: ", error);
  }
}, 500);

/**

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

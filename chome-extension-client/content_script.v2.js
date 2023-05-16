const runScript = () => {
  console.log("extension loaded successfully", window.location);

  const goToPattern = /go to/i;
  const goToLoggedInMenuCommandPattern =
    /go to\s+(accounts|campaigns|analytics|unibox|settings|accelerator)\b/i;

  const goToLoggedOutMenuCommandPattern =
    /go to\s+(home|pricing|about|reviews|warmup|blog)\b/i;

  const addNewCampaignCommandPattern = /add new campaign/i;
  const addEmailAccountCommandPattern = /add email account/i;

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const chromeStorage = {
    get: (keys) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (data) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(data);
          }
        });
      });
    },

    set: (items) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.set(items, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    },

    remove: (keys) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.remove(keys, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    },
  };

  const insertValuesInInput = (selector, value) => {
    try {
      const inputElement = document.querySelector(selector);
      const triggerInputEvent = new Event("input", { bubbles: true });
      if (!inputElement) return false;
      inputElement.value = value;
      inputElement.dispatchEvent(triggerInputEvent);
      return true;
    } catch (error) {
      return false;
    }
  };

  const triggerClickOnElement = (selector) => {
    try {
      const element = document.querySelector(selector);
      if (!element) return false;
      element.click();
      return true;
    } catch (error) {
      return false;
    }
  };

  const navigateOnInstantlyLoggedIn = (value) => {
    const menus = document.querySelectorAll('[class="pro-item-content"]');
    const baseUrl = "https://app.instantly.ai";
    if (!menus) return false;
    const menuMap = {
      accounts: {
        index: 0,
        path: "/app/accounts",
      },
      campaigns: {
        index: 1,
        path: "/app/campaigns",
      },
      analytics: {
        index: 2,
        path: "/app/analytics/overview",
      },
      unibox: {
        index: 3,
        path: "/app/unibox",
      },
      settings: {
        index: 4,
        path: "/app/settings/profile",
      },
      accelerator: {
        index: 5,
        path: "/app/accelerator",
      },
    };

    let isNavigated = true;
    for (const key in menuMap) {
      if (value.toLowerCase().includes(key)) {
        const index = menuMap[key].index;
        const path = menuMap[key].path;
        if (window.location.host !== "app.instantly.ai") {
          window.location.href = `${baseUrl}${path}`;
          isNavigated = true;
          break;
        } else {
          const menuDiv = menus[index];
          const menuATag = menuDiv.childNodes[0];
          if (!menuATag) {
            continue;
          }
          menuATag.click();
          isNavigated = true;
          break;
        }
      }
      isNavigated = false;
    }
    return isNavigated;
  };

  const navigateOnInstantlyLoggedOut = (value) => {
    const baseUrl = "https://instantly.ai";
    const menuMap = {
      home: "/",
      pricing: "/pricing",
      about: "/about",
      reviews: "/review",
      warmup: "/email-warmup",
      blog: "/blog",
    };

    let isNavigated = true;
    for (const key in menuMap) {
      if (value.toLowerCase().includes(key)) {
        const value = menuMap[key];
        window.location.href = `${baseUrl}${value}`;
        isNavigated = true;
        break;
      }
      isNavigated = false;
    }
    return isNavigated;
  };

  const clickAddNewButton = () => {
    const addNewButton = document.querySelectorAll("button")[9];
    addNewButton.click();
  };

  const addCampaign = (campaignName) => {
    insertValuesInInput(
      'input[placeholder="Give your campaign a name"]',
      campaignName
    );
    triggerClickOnElement('button[class="btn-lg btn btn-primary"]');
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
  // const commandsContainer = document.getElementById("commands-container");
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
      // commandsContainer.style.display = "none";
      chatSection.innerHTML = updateChat(defaultChatMessages);
    } else {
      chatTab.setAttribute("class", "tab");
      executeTab.setAttribute("class", "tab active");
      // if (defaultExecuteMessages.length === 1) {
      //   commandsContainer.style.display = "flex";
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
            <img style="margin: 0.2rem;" src="https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/reload.svg"></img>
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
                <div class="inner-chat-text ${message.by}-text-align">${
          message.text
        }</div>
              </div>
          </div>
          <div style="display:${
            showFeedback ? "inherit" : "none"
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
      if (message === "login") {
        await chromeStorage.set({
          automationEvent: "LOGIN_EVENT",
          command: "ENTER_EMAIL_FOR_LOGIN",
        });
        window.location.href = "https://app.instantly.ai/auth/login";
        return;
      }

      if (goToPattern.test(message)) {
        if (goToLoggedInMenuCommandPattern.test(message)) {
          const isNavigated = navigateOnInstantlyLoggedIn(message);
          if (isNavigated) {
            messagesDataArray.push({
              text: "Done",
              by: "bot",
              feedback_submitted: true,
              feedback: "Yes",
            });
          } else {
            messagesDataArray.push({
              text: "Not able to navigate, Please try again",
              by: "bot",
              feedback_submitted: true,
              feedback: "No",
            });
          }

          handleLoading(false);
          chatSection.innerHTML = updateChat(messagesDataArray);
          chatSection.scrollTop =
            chatSection.scrollHeight - chatSection.clientHeight;
          return;
        } else if (goToLoggedOutMenuCommandPattern.test(message)) {
          const isNavigated = navigateOnInstantlyLoggedOut(message);
          if (!isNavigated) {
            messagesDataArray.push({
              text: "Not able to navigate, Please try again",
              by: "bot",
              feedback_submitted: true,
              feedback: "No",
            });
            handleLoading(false);
            chatSection.innerHTML = updateChat(messagesDataArray);
            chatSection.scrollTop =
              chatSection.scrollHeight - chatSection.clientHeight;
            return;
          }
        } else {
          messagesDataArray.push({
            text: "Not able to navigate, Please try again",
            by: "bot",
            feedback_submitted: true,
            feedback: "No",
          });
          handleLoading(false);
          chatSection.innerHTML = updateChat(messagesDataArray);
          chatSection.scrollTop =
            chatSection.scrollHeight - chatSection.clientHeight;
          return;
        }
      }

      if (
        messagesDataArray.at(-2).text ===
        "What will be the name of the campaign?"
      ) {
        addCampaign(message);
        messagesDataArray.push({
          text: "Campaign added successfully!",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });
        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;
        handleLoading(false);
        closeModal();
        return;
      }

      if (addNewCampaignCommandPattern.test(message)) {
        if (!window.location.href.includes("campaigns")) {
          navigateOnInstantlyLoggedIn("go to campaigns");
          await sleep(500);
        }
        clickAddNewButton();
        handleLoading(false);
        messagesDataArray.push({
          text: "What will be the name of the campaign?",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });

        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;
        return;
      }

      if (addEmailAccountCommandPattern.test(message)) {
        if (!window.location.href.includes("accounts")) {
          navigateOnInstantlyLoggedIn("go to accounts");
          await sleep(500);
        }
        clickAddNewButton();
        handleLoading(false);
        messagesDataArray.push({
          text: "Done",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });

        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;
        closeModal();
        return;
      }
    }

    const automationEvent = await chromeStorage.get([
      "automationEvent",
      "command",
    ]);

    if (
      automationEvent?.command &&
      automationEvent.command === "ENTER_EMAIL_FOR_LOGIN"
    ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(message)) {
        messagesDataArray.push({
          text: "Please enter a valid email address",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });
        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;
        handleLoading(false);
        return;
      } else {
        const isValueAdded = insertValuesInInput(
          'input[name="email"]',
          message
        );
        if (!isValueAdded) {
          messagesDataArray.push({
            text: "Something went wrong while doing login",
            by: "bot",
            feedback_submitted: true,
            feedback: "Yes",
          });
        } else {
          await chromeStorage.set({
            automationEvent: "LOGIN_EVENT",
            command: "ENTER_PASSWORD_FOR_LOGIN",
          });

          messagesDataArray.push({
            text: "Please enter your password",
            by: "bot",
            feedback_submitted: true,
            feedback: "Yes",
          });
        }

        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;

        if (isValueAdded) botTextarea.removeAttribute("readonly");
        sendButtonIcon.style.display = "inline-flex";
        messageBoxSpan.style.backgroundColor = "#620091";
        sendButtonText.innerText = "";
        return;
      }
    } else if (
      automationEvent?.command &&
      automationEvent.command === "ENTER_PASSWORD_FOR_LOGIN"
    ) {
      const isValueAdded = insertValuesInInput(
        'input[name="password"]',
        message
      );
      if (!isValueAdded) {
        messagesDataArray.push({
          text: "Something went wrong while doing login",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });
      } else {
        await chromeStorage.set({
          automationEvent: "LOGIN_EVENT",
          command: "ENTER_PASSWORD_FOR_LOGIN",
        });

        messagesDataArray.push({
          text: "Please enter your password",
          by: "bot",
          feedback_submitted: true,
          feedback: "Yes",
        });

        await chromeStorage.remove(["automationEvent", "command"]);
        const isClicked = triggerClickOnElement('button[form="loginForm"]');
        if (!isClicked) {
          messagesDataArray.push({
            text: "Something went wrong while doing login",
            by: "bot",
            feedback_submitted: true,
            feedback: "Yes",
          });
        }
      }

      handleLoading(false);
      return;
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
      const response = await fetch(
        "http://127.0.0.1:5000/message-response",
        // "https://3.96.250.183/message-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: message,
          }),
        }
      );

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
      return;
    }
  });

  chrome.storage.local.get("automationEvent", async function (result) {
    console.log("Value retrieved:", result, result.automationEvent);
    if (result.automationEvent === "LOGIN_EVENT") {
      defaultExecuteMessages.length = 0;
      defaultExecuteMessages.push({
        text: "Please enter your email address",
        by: "bot",
        feedback_submitted: true,
        feedback: "Yes",
      });
      chatSection.innerHTML = updateChat(defaultExecuteMessages);
      tabChangeHandler("execute");
      return botTriggerDiv.click();
    }
  });
};

setTimeout(() => {
  try {
    console.log("DOMContentLoaded");
    return runScript();
  } catch (error) {
    console.log("ERROR WHILE RUNNING SCRIPT: ", error);
  }
}, 500);

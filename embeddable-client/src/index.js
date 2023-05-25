// const BACKEND_BASE_URL = "http://127.0.0.1:5000";
const BACKEND_BASE_URL = "https://ai.getpermian.com";
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
      const response = await fetch(
        `${BACKEND_BASE_URL}/chatbot/${CHAT_BOT_ID}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
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

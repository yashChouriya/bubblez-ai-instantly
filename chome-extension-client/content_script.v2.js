const runScript = () => {
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

  console.log("extension loaded successfully", window);

  let globalStyles = `
  .bot-icon-text-container{
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
    z-index: 10000000;
    left: 50%;
    top: 50%;
    min-width: 800px;
    transform: translate(-50%, -50%);
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 15px;
    border-radius: 16px;
    font-family: "circular";
    background-color: #fff;
  }

  .bot-modal-dialog {
    margin: auto;
  }

  .bot-modal-content {
    position: relative;
    background-color: #F9FAFB;
    padding-bottom: 0.1rem;
    border-radius: 8px;
  }

  .poweredByBubblez {
    padding: 0.2rem 0.7rem;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  #closeButton {
    cursor: pointer;
    position: absolute;
    right: 0.5%;
    top: 1%;
    color: black;
    background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/close-svgrepo-com.svg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 12px;
    height: 12px;
  }

  .chat-section {
    padding: 0.5rem;
    max-height: 325px !important;
    overflow-y: auto;
    height: 325px;
  }

  .chat-section::-webkit-scrollbar {
    width: 5px;
  }

  .chat-section::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #cacaca;
  }

  .chat-section::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #620091;
  }

  .chat-message-bot {
    display: flex;
    padding: 30px 25px;
  }

  .bot-icon-holder {
    width: 40px;
    height: 40px;
    background-color: #EBECED;
    border-radius: 50%;
    position: relative;
    margin-right: 1rem;
    line-height: 19px;

    .bot-svg {
      background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/chat.svg");
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .bot-head-reply {
    margin-top: 0.3rem;
    color: #3f3f3f;
    position: relative;
    border-radius: 6px;
    white-space: break-spaces;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    max-width: 85%;
  }

  .chat-message-human {
    display: flex;
    padding: 30px 25px;
    flex-direction: row-reverse;
    border-bottom: 0.5px solid #DDDFE2;
    
  }

  .human-icon-holder {
    width: 40px;
    height: 40px;
    background-color: #EBECED;
    border-radius: 50%;
    position: relative;
    margin-left: 1rem;
    
    .human-svg {
      background-image: url("https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/chat.svg");
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .human-head-reply {
    font-size: 16px;
    margin-top: 0.3rem;
    color: #3f3f3f;
    position: relative;
    border-radius: 6px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    max-width: 85%;
  }

  .messageBox {
    margin: 5px !important;
    padding: 0.5rem;
    overflow: hidden;
    width: 97%;
    border-radius: 16px;
    height: 45px;
    position: relative;
    background-color: #F8F9FB;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    .messageBoxTextArea {
      margin: auto;
      width: 88%;
      border: none;
      outline: none;
      font-size: 1rem;
      resize: none;
      border-radius: 16px;
      height: 40px;
      padding: 0.5rem;
      overflow-y: clip;
      background-color: #F8F9FB;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #6C6C6C;

    }
    .messageBoxTextArea:focus {
      outline: none;
      border: none;
    }

    .messageBoxSpan {
      position: absolute;
      right: 1%;
      background-color: #620091;
      z-index: 100000;
      font-weight: bold;
      cursor: pointer;
      padding: 5px 9px;
      gap: 6px;

      border-radius: 8px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      align-items: center;
      color: #FFFFFF;

      .send-arrow{
        background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/upArrow.svg');
        width: 12px;
        height: 12px;
        margin-right: 0.2rem;
        display: inline-flex;
      }


    }

    .messageBoxSpan-disabled {
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

    .messageBoxSpan:hover {
      background-color: #620091;
    }
  }

  .tabs {
    display: flex;
    justify-content: center;

    .tab {
      padding: 0.5rem 1rem;
      margin: 0 0.3rem;
      border-radius: 8px 8px 0px 0px;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.1s 0.1s ease-in-out;

      .tab-icon{
        width: 12px;
        height: 12px;
        margin-right: 0.2rem;
        display: inline-flex;
      }

      .chat{
        background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/chat.svg');
      }

      .execute{
        background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/gear.svg');
      }

      .tab-text{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        vertical-align: text-top;
      }
    }

    .tab.active{
      background-color: #F9FAFB !important;
      border-bottom: 2px solid #620091 !important;
      transition: all 0.1s 0.1s ease-in-out;
    }

  }

  .feedback-container{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 140%;
    padding: 15px 80px;
    .feedback-text{
      margin-bottom: 0.5rem;
    }

    .feedback-button-container{
      display: flex;

      .feedback-buttons{
        margin-right: 0.5rem;
        color: #620091;
        background: #FFFFFF;
        border: 1px solid #DEDFE1;
        border-radius: 8px;
        padding: 6px 10px 4px 10px;
        gap: 10px;
        cursor: pointer;

        .feedback-refresh-icon{
          width: 12px;
          height: 12px;
          margin: 0.3rem;
        }
      }
    }
  }

  #commands-container{
    position: absolute;
    display: none;
    bottom: 20%;
    left: 1%;

    .command{
      background: #E9EAEB;
      cursor: pointer;
      border-radius: 8px;
      padding: 10px;
      gap: 9px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #1E1E1E;
    }
  }
`;

  const loaderStyle = `
  
  .loader {
    width: 15px;
    height: 15px;
    color: #620091;
    background:
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0);
    background-size: 8px 8px;
    background-repeat:no-repeat;
    animation: sh5 1.5s infinite cubic-bezier(0.3,1,0,1);
    margin-left: 50%;
    transform: translateX(-50%);
  }

  @keyframes sh5 {
    0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
    33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%;width:30px;height: 30px}
    66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ;width:30px;height: 30px}
    100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
  }

  .loader-container{
    width: 100%;
    height: 50px;

  }
  .loader-text{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #676969;
    width: 100%;
    text-align: center;
    padding-bottom: 1.5rem;
    border-bottom: 0.5px solid #DDDFE2;
  }
  `;

  globalStyles += loaderStyle;

  // appending the styles to the root element
  const style = document.createElement("style");
  style.innerHTML = globalStyles;
  document.head.appendChild(style);

  const botPopupModel = `
  <div class="bot-modal-dialog bot-modal-dialog-centered">
    <div style="position:relative;">
      <span id="closeButton"></span>
      <div class="tabs" id="tabs">
        <div class="tab active" id="chatTab">
          <span class="tab-icon chat"></span>
          <span class="tab-text">Chat</span>
        </div>
        <div class="tab" id="executeTab">
          <span class="tab-icon execute"></span>
          <span class="tab-text">Execute</span>
        </div>
      </div>
      <div class="bot-modal-content">
        <div class="chat-section" id="chat-section"></div>
        <div id="commands-container" onclick="window.location.href='https://app.instantly.ai/auth/login'">
            <div class="command">Login</div>
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
            <span id="send-button-message">Ask</span>
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
    modal.style.display = "block";
    modal.style.opacity = "1";
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
      chatSection.innerHTML = updateChat(defaultChatMessages);
    } else {
      chatTab.setAttribute("class", "tab");
      executeTab.setAttribute("class", "tab active");
      if (defaultExecuteMessages.length === 1) {
        commandsContainer.style.display = "flex";
      }
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

  const closePopupButton = document.getElementById("closeButton");
  closePopupButton.addEventListener("click", () => {
    const modal = document.getElementById("myBotModal");
    modal.style.display = "none";
  });

  const updateChat = (chatData) => {
    let chatSectionInnerHtml = "";
    for (const [index, message] of chatData.entries()) {
      const showFeedback = message.by === "bot" && !message?.feedback_submitted;

      const feedbackDiv = `
      <div class="feedback-container" style="flex-direction: column;" data-index="${index}">
        <div class="feedback-text">Was this response helpful?</div>
        <div class="feedback-button-container">
          <div class="feedback-buttons" data-index="${index}" id="feedbackYes">Yes</div>
          <div class="feedback-buttons" data-index="${index}" id="feedbackNo">No</div>
          <div class="feedback-buttons" data-index="${index}" id="regenerate">
            <img src="https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/reload.svg"></img>
            <span>Regenerate response</span>
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
              <div class="${message.by}-head-reply">${message.text}</div>
          </div>
          <div style="display:${
            showFeedback ? "inherit" : "none"
          }">${feedbackDiv}</div>
          <div style="border-bottom: 0.5px solid #DDDFE2;"></div>
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

  const handleUserMessageSubmit = async () => {
    if (!botTextarea.value) return;
    const message = botTextarea.value;
    botTextarea.value = "";
    botTextarea.setAttribute("readonly", "true");
    const sendButtonIcon = document.getElementById("send-arrow");
    const sendButtonText = document.getElementById("send-button-message");
    sendButtonIcon.style.display = "none";
    messageBoxSpan.style.backgroundColor = "#CACCCC";
    sendButtonText.innerText = "Generating";
    const messagesDataArray =
      getActiveTab() === "chat" ? defaultChatMessages : defaultExecuteMessages;

    if (getActiveTab() !== "chat" && messagesDataArray.length === 1) {
      commandsContainer.style.display = "flex";
    } else {
      commandsContainer.style.display = "none";
    }

    messagesDataArray.push({
      text: message,
      by: "human",
    });

    chatSection.innerHTML = updateChat(messagesDataArray);
    chatSection.scrollTop = chatSection.scrollHeight - chatSection.clientHeight;

    if (getActiveTab() !== "chat" && defaultExecuteMessages.length === 1) {
      commandsContainer.style.display = "flex";
    } else {
      commandsContainer.style.display = "none";
    }

    if (getActiveTab() !== "chat" && message === "login") {
      await chromeStorage.set({
        automationEvent: "LOGIN_EVENT",
        command: "ENTER_EMAIL_FOR_LOGIN",
      });
      window.location.href = "https://app.instantly.ai/auth/login";
      return;
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
        botTextarea.removeAttribute("readonly");
        sendButtonIcon.style.display = "inline-flex";
        messageBoxSpan.style.backgroundColor = "#620091";
        sendButtonText.innerText = "Ask";
        return;
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
        chatSection.innerHTML = updateChat(messagesDataArray);
        chatSection.scrollTop =
          chatSection.scrollHeight - chatSection.clientHeight;

        const email = document.querySelector('input[name="email"]');
        email.value = message;
        email.dispatchEvent(new Event("change", { bubbles: true }));
        botTextarea.removeAttribute("readonly");
        sendButtonIcon.style.display = "inline-flex";
        messageBoxSpan.style.backgroundColor = "#620091";
        sendButtonText.innerText = "Ask";
        return;
      }
    } else if (
      automationEvent?.command &&
      automationEvent.command === "ENTER_PASSWORD_FOR_LOGIN"
    ) {
      const password = document.querySelector('input[name="password"]');
      const submitButton = document.querySelector('button[form="loginForm"]');
      password.value = message;
      password.dispatchEvent(new Event("change", { bubbles: true }));
      submitButton.click();
      botTextarea.removeAttribute("readonly");
      sendButtonIcon.style.display = "inline-flex";
      messageBoxSpan.style.backgroundColor = "#620091";
      sendButtonText.innerText = "Ask";
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
        // "http://3.96.250.183:5000/message-response",
        "http://127.0.0.1:5000/message-response",
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
    } catch (error) {
      console.log(error);
    }

    messagesDataArray[messagesDataArray.length - 1] = {
      text: botResponseMessage,
      by: "bot",
      feedback_submitted: !jsonResponse.status,
    };
    botTextarea.removeAttribute("readonly");
    sendButtonIcon.style.display = "inline-flex";
    messageBoxSpan.style.backgroundColor = "#620091";
    sendButtonText.innerText = "Ask";
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
    console.log(window);
    console.log("DOMContentLoaded");
    return runScript();
  } catch (error) {
    console.log("ERROR WHILE RUNNING SCRIPT: ", error);
  }
}, 3000);

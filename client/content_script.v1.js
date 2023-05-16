(() => {
  console.log("extension loaded successfully");
  const botPopupModel = `
      <div class="bot-modal-dialog bot-modal-dialog-centered">
          <div class="bot-modal-content">
              <span id="closeButton"></span>
              <div class="chat-section" id="chat-section">
              </div>
              <div class="messageBox">
                  <textarea class="messageBoxTextArea" id="botTextarea" type="text" placeholder="Ask me anything..."></textarea>
                  <span class="messageBoxSpan" id="messageBoxSend">Send</span>
              </div>
              <div class="poweredByBubblez">
                  <small>Powered by <b style="text-decoration:underline;color:#5c89de;">Bubblez</b></small>
              </div>
          </div>
      </div>
  `;
  const globalStyles = `
      #bot-trigger-div {
          background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/dependabot-svgrepo-com.svg');
          width: 60px;
          height: 60px;
          position: absolute;
          bottom: 2%;
          right: 2%;
          cursor: pointer;
          background-repeat: no-repeat;
          background-size: cover;
        //   transform: rotate(0deg) scale(1);
        //   transition: transform 100ms linear, opacity 80ms linear;
          -webkit-animation-duration: 1s;
          animation-duration: 1s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          -webkit-animation-timing-function: ease-in-out;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          -webkit-animation-iteration-count: infinite;
      }
  
      #bot-trigger-div:hover {
          animation-name: bounce;
          -moz-animation-name: bounce;
      }

    @keyframes bounce {
        0%, 100%, 20%, 50%, 80% {
            -webkit-transform: translateY(0);
            -ms-transform:     translateY(0);
            transform:         translateY(0)
        }
        40% {
            -webkit-transform: translateY(-30px);
            -ms-transform:     translateY(-30px);
            transform:         translateY(-30px)
        }
        60% {
            -webkit-transform: translateY(-15px);
            -ms-transform:     translateY(-15px);
            transform:         translateY(-15px)
        }
    }
  
      .bot-modal {
          display: none;
          position: absolute;
          z-index: 1050;
          left: 50%;
          top: 50%;
          min-width: 800px;
          transform: translate(-50%,-50%);
          overflow-x: hidden;
          overflow-y: auto;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          padding: 15px;
          border-radius: 16px;
          font-family: 'circular';
      }
      
      .bot-modal-dialog {
          margin: auto;
      }
      
      .bot-modal-content {
          position: relative;
          border-radius: 5px;
          background-color: rgb(249 250 251 / 1);
          padding-bottom: 0.1rem;
          // height: 400px
      }
  
      .poweredByBubblez{
          padding: 0.2rem 0.5rem;
          font-size: 10px;
      }
  
      #closeButton{
          cursor: pointer;
          position: absolute;
          right: 0.5%;
          top: 1%;
          color: black;
          background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/close-svgrepo-com.svg');
          background-repeat: no-repeat;
          background-size: cover;
          width: 12px;
          height: 12px;
      }
  
      .chat-section{
          padding: 0.5rem;
          max-height: 325px !important;
          overflow-y: auto;
          width: 100%;
          height: 325px;
      }
  
      .chat-section::-webkit-scrollbar {
          width: 5px;
      }
      
      .chat-section::-webkit-scrollbar-track {
          // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
          border-radius: 10px;
          background-color: #cacaca;
      }
      
      .chat-section::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #5c89de
      }
  
      .chat-message-bot{
          display: flex;
          width: 98%;
          // margin-left: 1rem;
      }
  
      .bot-icon-holder{
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 50%;
          position: relative;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
          margin-right: 1rem;
          .bot-svg{
              background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/dependabot-svgrepo-com.svg');
              width: 35px;
              height: 35px;
              background-repeat: no-repeat;
              background-size: cover;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
          }
      }
  
      .bot-head-reply{
          font-size: 16px;
          margin-top: 0.5rem;
          max-width: 500px;
          color: #3f3f3f;
          padding: 20px;
          position: relative;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          max-width: 550px;
          font-family: 'circular';
          white-space: break-spaces;
      }
  
      .bot-head-reply:before {
          content: "";
          width: 0px;
          height: 0px;
          position: absolute;
          border-left: 10px solid transparent;
          border-right: 10px solid #fff;
          border-top: 10px solid #fff;
          border-bottom: 10px solid transparent;
          left: -19px;
          top: 6px;
        }
  
      
  
      .chat-message-human{
          display: flex;
          width: 98%;
          flex-direction: row-reverse;
      }
  
      .human-icon-holder{
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 50%;
          position: relative;
          box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
          margin-left: 1rem;
          .human-svg{
              background-image: url('https://bubblez-dev.s3.ca-central-1.amazonaws.com/icons/avatar-cap-fashion-svgrepo-com.svg');
              width: 35px;
              height: 35px;
              background-repeat: no-repeat;
              background-size: cover;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
          }
      }
  
      .human-head-reply{
          font-size: 16px;
          margin-top: 0.5rem;
          color: #3f3f3f;
          padding: 20px;
          position: relative;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          max-width: 550px;
          font-family: 'circular';
          white-space: break-spaces;
      }
  
      .human-head-reply:before {
          content: "";
          width: 0px;
          height: 0px;
          position: absolute;
          border-left: 10px solid #fff;
          border-right: 10px solid transparent;
          border-top: 10px solid #fff;
          border-bottom: 10px solid transparent;
          right: -20px;
          top: 6px;
        }
      
      .messageBox{
          margin: 5px !important;
          padding: 0.5rem;
          overflow: hidden;
          width: 97%;
          border-radius: 16px;
          height: 30px;
          background-color: #fff;
          position: relative;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  
  
          .messageBoxTextArea{
              margin: auto;
              width: 88%;
              border:none;
              outline: none;
              font-size: 1rem;
              resize: none;
              border-radius: 16px;
              height: 40px;
              color: #686868 !important;
              padding: 0.5rem;
              overflow-y: clip;
          }
          .messageBoxTextArea:focus{
              outline: none;
              border:none;
          }
  
          .messageBoxSpan{
              position: absolute;
              right: 1%;
              // top: 22%;
              background-color: #5c89de;
              color: white;
              padding: 0.5rem 1rem;
              font-size: 0.8rem;
              z-index: 100000;
              border-radius: 8px;
              font-weight: bold;
              cursor: pointer;
          }
  
          .messageBoxSpan-disabled{
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
              background-color: #487ce0;
          }
      }
  
      .loader3 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .circle1 {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin: 0 2px;
          background-color: #333;
          animation: circle1 1s ease-in-out infinite;
        }
        
        .circle1:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .circle1:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .circle1:nth-child(4) {
          animation-delay: 0.6s;
        }
        
        .circle1:nth-child(5) {
          animation-delay: 0.8s;
        }
        
        @keyframes circle1 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
        
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
  
  `;

  // "How to write a sales email on instantly.ai"

  const style = document.createElement("style");
  // add a CSS rule to the style element
  style.innerHTML = globalStyles;
  // add the style element to the head of the document
  document.head.appendChild(style);

  let botTriggerDiv = document.createElement("div");
  botTriggerDiv.setAttribute("id", "bot-trigger-div");

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
  });

  let popupModal = document.createElement("div");
  popupModal.className = "bot-modal fade";
  popupModal.setAttribute("id", "myBotModal");
  popupModal.innerHTML = botPopupModel;
  document.body.appendChild(botTriggerDiv);
  document.body.appendChild(popupModal);

  const closePopupButton = document.getElementById("closeButton");
  closePopupButton.addEventListener("click", () => {
    const modal = document.getElementById("myBotModal");
    modal.style.display = "none";
  });

  const defaultChatMessages = [
    {
      text: "Hi, how can i help you?",
      by: "bot",
    },
  ];

  const updateChat = (chatData) => {
    let chatSectionInnerHtml = "";
    for (const message of chatData) {
      const loader = `<div class="loader3"><div class="circle1"></div><div class="circle1"></div><div class="circle1"></div><div class="circle1"></div><div class="circle1"></div></div>`;
      chatSectionInnerHtml += `
          <div class="chat-message-${message.by}">
              <div class="${message.by}-icon-holder">
              <div class="${message.by}-svg"></div>
              </div>
              <div class="${message.by}-head-reply">${
        message.text || loader
      }</div>
          </div>
          `;
    }
    return chatSectionInnerHtml;
  };

  const chatSection = document.getElementById("chat-section");
  chatSection.innerHTML = updateChat(defaultChatMessages);

  const botTextarea = document.getElementById("botTextarea");
  const messageBoxSpan = document.getElementById("messageBoxSend");

  const handleUserMessageSubmit = async () => {
    if (!botTextarea.value) return console.log("Textarea value is missing");
    const message = botTextarea.value;
    botTextarea.value = "";
    botTextarea.setAttribute("disabled", "true");
    messageBoxSpan.setAttribute("class", "messageBoxSpan-disabled");
    defaultChatMessages.push({
      text: message,
      by: "human",
    });

    defaultChatMessages.push({
      text: "",
      by: "bot",
    });

    chatSection.innerHTML = updateChat(defaultChatMessages);
    const onFailureMessage =
      "Sorry, I'm not able to process your query at the moment. Please try again";

    let botResponseMessage = "";
    try {
      const response = await fetch("http://localhost:5000/chat-async", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
        }),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      const taskResponse = await fetch(
        `http://localhost:5000/result/${jsonResponse.task_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const taskJsonResponse = await taskResponse.json();
      console.log(taskJsonResponse);
      botResponseMessage = taskJsonResponse?.result || onFailureMessage;
    } catch (error) {
      console.log(error);
    }

    botTextarea.removeAttribute("disabled");
    messageBoxSpan.setAttribute("class", "messageBoxSpan");
    defaultChatMessages[defaultChatMessages.length - 1] = {
      text: botResponseMessage,
      by: "bot",
    };
    chatSection.innerHTML = updateChat(defaultChatMessages);
  };

  messageBoxSpan.addEventListener("click", handleUserMessageSubmit);

  botTextarea.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      // Enter key was pressed, do something...
      await handleUserMessageSubmit();
    }
  });
})();

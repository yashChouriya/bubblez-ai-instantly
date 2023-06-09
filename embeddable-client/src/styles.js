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

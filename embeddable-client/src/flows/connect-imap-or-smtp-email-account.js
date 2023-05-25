const addNewImapSmtpEmailAccount = async (
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

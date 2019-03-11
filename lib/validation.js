const errorMessages = {
  emailRequired: "E-Mail is required",
  emailInvalid: "E-Mail is invalid",
  passwordRequired: "Password is required"
};

const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

export const validateEmail = email => {
  if (!email) {
    return errorMessages.emailRequired;
  }

  if (!email.match(EMAIL_REGEX)) {
    return errorMessages.emailInvalid;
  }

  return "";
};

export const validatePassword = password => {
  if (!password) {
    return errorMessages.passwordRequired;
  }

  return "";
};

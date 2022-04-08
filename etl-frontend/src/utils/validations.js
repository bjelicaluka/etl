// Minimum one character before and after '@', minimum two characters after '.'
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Minimum eight characters, at least one letter, one number and one special character
export function validatePassword(password) {
  return !!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
}

// Minimum three characters
export function validateText(text) {
  text = text?.trim();
  return !!(text && (text.length >= 3));
}

// Whole number
export function validateInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

// Valid text and !( . / \ _ ' " + )
export function validateProperty(property) {
  const forbiddenCharacters = ['.', '\\', '/', '_', '+', '\'', '"'];
  return validateText(property) && forbiddenCharacters.reduce((acc, char) => acc && !property.includes(char), true);
}

// All comma separated values must have a character
export function validateEnumerationValues(values) {
  if (!!values) {
    const valuesList = values.split(",");
    return valuesList.length > 1 && valuesList.reduce((acc, curr) => !!acc && !!curr.trim(), true);
  }
  return false;
}

// No same values in a list, and same as enumeration values, including text validation
export function validatePropertyValues(values) {
  if (!!values) {
    const valuesList = values.split(",").map(v => v.trim());
    return valuesList.length > 1
      // validate each property
      && valuesList.reduce((acc, currProp) => !!acc && validateProperty(currProp), true)
      // no same properties in one list
      && !valuesList.reduce((acc, currProp) => acc || valuesList.filter(p => p.trim() === currProp.trim()).length > 1, false);
  }
  return false;
}

// Validate only the scheme name, ://, spaces and double quotes
export function validateHttpRequestUrl(url) {
  if (validateText(url)) {
    const re = /^(http|https):\/\/[^ "]+$/;
    return re.test(url);
  }
  return false
}
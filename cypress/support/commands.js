// This extends .should for convenient color comparison
const compareColor = (color, property, message) => targetElement => {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  tempElement.style.display = 'none'; // make sure it doesn't actually render
  document.body.appendChild(tempElement); // append so that `getComputedStyle` actually works

  const tempColor = getComputedStyle(tempElement).color;
  const targetColor = getComputedStyle(targetElement[0])[property];

  document.body.removeChild(tempElement); // remove it because we're done with it

  expect(tempColor, message).to.equal(targetColor);
};

const addCustomCommands = (originalFn, subject, expectation, ...args) => {
  const cssColorProperties = [
    'color',
    'borderColor',
    'backgroundColor',
    'borderBottomColor',
    'borderTopColor',
    'borderRightColor',
    'borderLeftColor',
    'outlineColor',
  ];
  if (cssColorProperties.find(property => expectation === `have.${property}`)) {
    const [color, message] = args;
    const propertyName = expectation.slice('have.'.length); // get rid of prefix "have"
    return originalFn(subject, compareColor(color, propertyName, message));
  }

  return originalFn(subject, expectation, ...args);
};

Cypress.Commands.overwrite('should', addCustomCommands);
Cypress.Commands.overwrite('and', addCustomCommands);

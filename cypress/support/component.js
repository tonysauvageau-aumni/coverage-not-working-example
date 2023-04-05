import "./commands";
import "./assertions";
import "@cypress/code-coverage/support";
import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);

Cypress.Keyboard.defaults({ keystrokeDelay: 0 });

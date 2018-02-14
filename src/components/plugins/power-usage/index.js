// DEFINE PLUGIN COMPONENTS AND NAME
// By importing as sidebar and toolbar you can overwrite them
import settings from './Settings'
import main from './Main'

// MANDATORY!
const id = "powerUsage"; // SHOULD BE UNIQUE
const name = "Power Usage";
const icon = "fa-bolt";
const route = "/power-usage";
const link = "/power-usage";
const hidden = false;

// STORE IS USED TO SAVE SETTINGS TO
// MAKE SURE YOU DEFINE THE RIGHT TYPE E.G. OBJECT, STRING ETC.
const store = {
  "defaultDevice": {}
}

// MAKE SURE YOU EXPORT ALL YOUR COMPONENTS, VARS AND OBJECTS!
export default {
  id,
  name,
  icon,
  route,
  link,
  hidden,
  store,
  settings,
  main
}

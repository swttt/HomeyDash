// COMPONENTS
import main from './Main' // REQUIRED!
import settings from './Settings'

// VARS
const icon = "fa-bolt";
const enabled = true;
const route = "/PLUGIN_ID";

// NORMALLY YOU DON'T NEED TO TOUCH THESE!
const id = "PLUGIN_ID"; // SHOULD BE UNIQUE!
const name = "PLUGIN_NAME";
const link = "/PLUGIN_ID";


// STORE IS USED TO SAVE SETTINGS TO
// MAKE SURE YOU DEFINE THE RIGHT TYPE E.G. OBJECT, STRING ETC.
// E.g. "defaultDevice" = "" <- STRING or defaultDevice" = {} <- OBJECT
const store = {
 "test": "a settings string!"
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

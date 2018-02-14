// DEFINE PLUGIN COMPONENTS AND NAME
// By importing as sidebar and toolbar you can overwrite them
import main from './Main'
import sidebar from './Sidebar'

// MANDATORY!
const id = "devices"; // SHOULD BE UNIQUE
const name = "Devices";
const icon = "power";
const route = "/devices/:zone?";
const link = "/devices"

// STORE IS USED TO SAVE SETTINGS TO
// MAKE SURE YOU DEFINE THE RIGHT TYPE E.G. OBJECT, STRING ETC.
const store = {

}

// MAKE SURE YOU EXPORT ALL YOUR COMPONENTS, VARS AND OBJECTS!
export default {
  id,
  name,
  icon,
  route,
  link,
  store,
  main,
  sidebar
}

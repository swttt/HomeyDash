// DEFINE PLUGIN COMPONENTS AND NAME
// By importing as sidebar and toolbar you can overwrite them
import main from './Main'

// MANDATORY!
const id = "alarm"; // SHOULD BE UNIQUE
const name = "Alarm";
const icon = "security";
const route = "/alarm";
const link = "/alarm";

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
  main
}

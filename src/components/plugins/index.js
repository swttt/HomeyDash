// IMPORT PLUGIN FOLDERS
// VAR SHOULD BE THE SAME AS YOUR ID
import powerUsage from './power-usage/'; // USE YOUR PLUGIN ID
import devices from './devices/';
import alarm from './alarm/';


// EXPORT YOUR PLUGIN HERE
export default {
  devices,
  alarm,
  powerUsage
}

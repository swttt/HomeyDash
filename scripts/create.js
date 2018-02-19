#!/usr/bin/env node

const shell = require('shelljs');
const prompt = require('prompt');
const colors = require("colors/safe");

var type = "";
var name = "";
var id = "";

prompt.start();

console.log(colors.cyan('Hello, do you like Kibbeling?'));
console.log(colors.cyan('... Ok, what can i do for you?'));
console.log(colors.cyan('Aaah, you want me to scaffold something.'));
console.log(colors.cyan('So this are your options:'));
console.log(colors.red('1. ') + colors.black('Scaffold a plugin'));
console.log(colors.red('2. ') + colors.black('Scaffold a widget'));

prompt.message = colors.cyan("");
prompt.delimiter = colors.cyan("");

var type = ""

prompt.get([{
  name: 'type',
  description: 'What do you want me to scaffold?',
  type: 'string',
  required: true,
  pattern: /^[1-2]{1}$/,
  message: 'You need to fill in one of the numbers from the types above!',
  before: function(value) {
    if(value == 1){
      return "plugin";
    } else {
      return "widget";
    }
  }
}], (err, result) => {
  type = result.type;
  if(type == "widget"){
    // WIDGETS NOT SUPPORTED YET!
    console.log(colors.red("I am sooooo sorry...but widgets aren't supported yet!"));
  }
  else{
  console.log(colors.cyan('Okay, so you want to create a ' + type + "...now let's get started!"));
  prompt.get([
  {
    name: 'name',
    description: "So..how are you going to name it?",
    type: 'string',
    required: true,
    message: "Oooh...you didn't entered a name!"
  },
  {
    name: 'id',
    description: "Now i need an " + colors.red("unique ID") + " for your awesome upcoming creation:",
    type: 'string',
    pattern: /^(?:(?![-._])\w)+$/i,
    required: true,
    message: "Your id can't contain any special characters or spaces...just alphanumeric."
  }], (err, result) => {
    name = result.name;
    id = result.id;
    console.log(colors.cyan("So..here is a summary:"));
    console.log(colors.grey("You are going to create a ") + colors.green(type));
    console.log(colors.grey("Not sure if it's the best name, but you named it ") + colors.green( name ) );
    console.log(colors.grey("It should have the unique id ") + colors.green(id));
    prompt.get([
      {
        name: 'correct',
        description: "Allmost done! Does the above info seems correct? [yes or no]",
        type: 'string',
        required: true,
        pattern: /^(?:Yes|No)$/i,
        message: "Normally people reply with yes or no on such a question!?!"
      }], (err, result) => {
          //WIDGETS NOT WORKING YET!
          if(result.correct.toLowerCase() == "yes"){
            console.log(colors.cyan("Cool! You can find your " + type + " in /src/components/" + type + "-system/" + type + "s/" + id));
            console.log(colors.cyan("Happy coding! <3"));
            scaffold();
          }
          else{
            console.log(colors.cyan("Well, thats a waste of time..."));
          }
      });
  });
}
});


function scaffold(){
  shell.cp('-R', 'scripts/templates/'+type+'/', 'src/components/plugin-system/'+type+'s/'+id);
  shell.sed('-i', 'PLUGIN_ID', id , 'src/components/plugin-system/'+type+'s/'+id+'/plugin.json');
  shell.sed('-i', 'PLUGIN_NAME', name , 'src/components/plugin-system/'+type+'s/'+id+'/plugin.json');
  shell.sed('-i', 'PLUGIN_NAME', name , 'src/components/plugin-system/'+type+'s/'+id+'/Main.vue');
}

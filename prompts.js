var inquirer = require('inquirer');
// const alphabet = "abcdefghijklmnopqrstuvwxyz";

const questions = [{
type: 'input',
name: 'github',
message: 'Please enter your GitHub username!'
// validate: gitCheck()
},
{
type: 'rawlist',
name: 'favColor',
message: 'which of these colors is your favorite?',
choices: ['blue', 'red', 'pink', 'green'],
}];
const promptUser = prompts => inquirer.prompt(prompts)
.then(function(answers){
console.log(answers);
});
var exportObj ={
    q: questions,
    promptfunct: promptUser,
};
exports.exportObj;

// promptUser(questions);  <div class="wrapper">
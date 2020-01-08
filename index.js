var inquirer = require('inquirer');
const axios =require('axios');
const fs = require('fs');
const convertFactory = require('electron-html-to');
const util = require("util");

// questions 
const questions = [{
    type: 'input',
    name: 'github',
    message: 'Please enter your GitHub username!'
    },
    {
    type: 'rawlist',
    name: 'color',
    message: 'which of these colors is your favorite?',
    choices: ['green', 'blue', 'pink', 'red'],
    }];
// displays prompts

const promptUser = prompts => {return inquirer.prompt(prompts)};

// api call

const apiCall = function(username){ 
    return new Promise(function(resolve,reject){
        axios.get("https://api.github.com/users/"+username)
        .then(response => {
            return resolve(response);
        })
        .catch(err=>{
            return reject(err);
        })
    })
};
const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

const generateHTML = function(response,data) {
    // console.log(answers);
    var html=  `<!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
          <title>Document</title>
          <style>
              @page {
                margin: 0;
              }
             *,
             *::after,
             *::before {
             box-sizing: border-box;
             }
             html, body {
             padding: 0;
             margin: 0;
             }
             html, body, .wrapper {
             height: 100%;
             }
             .wrapper {
             background-color: ${colors[data.color].wrapperBackground};
             padding-top: 100px;
             }
             body {
             background-color: white;
             -webkit-print-color-adjust: exact !important;
             font-family: 'Cabin', sans-serif;
             }
             main {
             background-color: #E9EDEE;
             height: auto;
             padding-top: 30px;
             }
             h1, h2, h3, h4, h5, h6 {
             font-family: 'BioRhyme', serif;
             margin: 0;
             }
             h1 {
             font-size: 3em;
             }
             h2 {
             font-size: 2.5em;
             }
             h3 {
             font-size: 2em;
             }
             h4 {
             font-size: 1.5em;
             }
             h5 {
             font-size: 1.3em;
             }
             h6 {
             font-size: 1.2em;
             }
             .photo-header {
             position: relative;
             margin: 0 auto;
             margin-bottom: -50px;
             display: flex;
             justify-content: center;
             flex-wrap: wrap;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             padding: 10px;
             width: 95%;
             border-radius: 6px;
             }
             .photo-header img {
             width: 250px;
             height: 250px;
             border-radius: 50%;
             object-fit: cover;
             margin-top: -75px;
             border: 6px solid ${colors[data.color].photoBorderColor};
             box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
             }
             .photo-header h1, .photo-header h2 {
             width: 100%;
             text-align: center;
             }
             .photo-header h1 {
             margin-top: 10px;
             }
             .links-nav {
             width: 100%;
             text-align: center;
             padding: 20px 0;
             font-size: 1.1em;
             }
             .nav-link {
             display: inline-block;
             margin: 5px 10px;
             }
             .workExp-date {
             font-style: italic;
             font-size: .7em;
             text-align: right;
             margin-top: 10px;
             }
             .container {
             padding: 50px;
             padding-left: 100px;
             padding-right: 100px;
             }
    
             .row {
               display: flex;
               flex-wrap: wrap;
               justify-content: space-between;
               margin-top: 20px;
               margin-bottom: 20px;
             }
    
             .card {
               padding: 20px;
               border-radius: 6px;
               background-color: ${colors[data.color].headerBackground};
               color: ${colors[data.color].headerColor};
               margin: 20px;
             }
             
             .col {
             flex: 1;
             text-align: center;
             }
    
             a, a:hover {
             text-decoration: none;
             color: inherit;
             font-weight: bold;
             }
    
             @media print { 
              body { 
                zoom: .75; 
              } 
             }
          </style>
        </head>
        <body>
        <div class="wrapper">
            <div class="container">
                <div class="row thick2">
                    <div class="col-sm-1">
                        <p></p>
                    </div>
                    <div class="photo-header col-sm-10">
                        <div class="row photo-header img">
                            <img src="${response.data.avatar_url}" alt="profile picture" height="60px" width="60px">
                        </div>
                        <div class="photo-header h1">
                            <h1>${response.data.login}</h1>
                        </div>
                        <div class="link-nav">
                            <a href="${response.data.location}" class="nav-link">location</a>
                            <a href="${response.data.url}" class="nav-link">github</a>
                            <a href="${response.data.blog}"class="nav-link">blog</a>
                        </div>
                    </div>
                </div>
                <div class="row thick1">
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-7 info">
                        <div class="row">
                            <div class="bio">
                                <p>${response.data.bio}</p>
                            </div>
                        </div>
                        <div class="row" id="repo-follower">
                            <div class="repo card col-sm-6 bg-blue">
                                <div class="row">
                                    <p>Public Repositories</p>
                                </div>
                                <div class="row">
                                    <p>${response.data.public_repos}</p>
                                </div>
        
                            </div>
                            <div class="follower card col-sm-6">
        
                                <div class="row">
                                    <p>Followers</p>
        
                                </div>
                                <div class="row">
                                    <p>${response.data.followers}</p>
        
                                </div>
                            </div>
                        </div>
                        <div class="row" id="stars-following">
                            <div class="stars card col-sm-6">
                                <div class="row">
                                    <p>Stars</p>
                                </div>
                                <div class="row">
                                    <p>stars</p>
                                </div>
                            </div>
                            <div class="following card col-sm-6">
                                <div class="row">
                                    <p>Following</p>
                                </div>
                                <div class="row">
                                    <p>${response.data.following}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2">
                    </div>
                </div>
                <div class="row thick2">
                    <p></p>
                </div>
            </div>
            </div>
            <script>
            </script>
        </body>
        
        </html>`
    return html;
  }
  

async function start() {
    try{
        const answers = await promptUser(questions);
        const response= await apiCall(answers.github);
        const html = generateHTML(response,answers);
//cut straight from electron documentation 
        var conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
          });
    
          conversion(html, function(err, result) {
            if (err) {
              return console.error(err);
            }
            let fileName= response.data.login + ".pdf";
                        result.stream.pipe(fs.createWriteStream(fileName));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
          });
    } catch(err){
        console.log(err)
    }
}

start();

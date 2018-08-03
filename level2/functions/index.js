// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {
  dialogflow,
  BasicCard,
  Permission,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
const URL = 'https://time4action.herokuapp.com/api/';
const fetch = require('isomorphic-fetch');
// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'
// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('Symptoms', (conv, { symptoms }) => {
  const luckyNumber = symptoms.length;
  console.log(symptoms);
  const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
 
    console.log(symptoms);
    return fetch(URL + "/symptoms/" + symptoms)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((json) => {
        // Grab random quote data from JSON.
        /*conv.close(new SimpleResponse({
          text: json.symptoms[0]
      }));*/
      var count = Object.keys(json).length;
      var res = ""
      for(var i = 0; i < count; i++) {
        res += json[i].name + ", " 
      }
      conv.ask(`<speak>Your symptoms are ${symptoms}.` +
      `<audio src="${audioSound}"></audio>` +
      `Your may be suffering from : ` + res + `</speak>`);
    });
});  

app.intent('Diseases', (conv, { disease }) => {
  const luckyNumber = disease.length;
  console.log(disease);
  const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
   
    console.log(disease);
    var d = disease[0].charAt(0).toUpperCase() + disease[0].slice(1)
    return fetch(URL + "/disease/" + d)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((json) => {
        // Grab random quote data from JSON.
        /*conv.close(new SimpleResponse({
          text: json.symptoms[0]
      }));*/
      var count = Object.keys(json[0].symptoms).length;
      var res = ""
      for(var i = 0; i < count; i++) {
        res += json[0].symptoms[i] + ", " 
      }
      conv.ask(`<speak>Your disease is ${disease}.` +
      `<audio src="${audioSound}"></audio>` +
      `Your may notice these symptoms : ` + res + `</speak>`);
    });
  
});

// Define a mapping of fake color strings to basic card objects.
/*const colorMap = {
    'indigo taco': new BasicCard({
      title: 'Indigo Taco',
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
        accessibilityText: 'Indigo Taco Color',
      },
      display: 'WHITE',
    }),
    'pink unicorn': new BasicCard({
      title: 'Pink Unicorn',
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDbFVfTXpoaEE5Vzg/style-color-uiapplication-palette2.png',
        accessibilityText: 'Pink Unicorn Color',
      },
      display: 'WHITE',
    }),
    'blue grey coffee': new BasicCard({
      title: 'Blue Grey Coffee',
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDZUdpeURtaTUwLUk/style-color-colorsystem-gray-secondary-161116.png',
        accessibilityText: 'Blue Grey Coffee Color',
      },
      display: 'WHITE',
    }),
    };
    
    app.intent('favorite fake color', (conv, {fakeColor}) => {
      conv.close(`Here's the color`, colorMap[fakeColor]);
    }); */



// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
// Handle the Dialogflow intent named 'Default Welcome Intent'.
/*app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME'
  }));
});
// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. What's your favorite color?`);
  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.data.userName}. What's your favorite color?`);
  }
});*/

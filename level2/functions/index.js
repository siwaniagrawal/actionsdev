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

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'
// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('Diseases', (conv, {disease}) => {
    const luckyNumber = disease.length;
    const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
    if (conv.data.userName) {
      // If we collected user name previously, address them by name and use SSML
      // to embed an audio snippet in the response.
      conv.ask(`<speak>${conv.data.userName}, your lucky number is ` +
        `${luckyNumber}.<audio src="${audioSound}"></audio>` +
        `Would you like to hear some fake colors?</speak>`);
    } else {
      conv.ask(`<speak>Your lucky number is ${luckyNumber}.` +
        `<audio src="${audioSound}"></audio>` +
        `Would you like to hear some fake colors?</speak>`);
    }
   });


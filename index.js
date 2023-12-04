const path = require('path');
const { Botkit } = require('botkit');
const express = require('express');

require('dotenv').config();

const controller = new Botkit({
  webhook_uri: '/api/messages',
});

const { initGithubWebhook } = require('./github'); // Import the initGithubWebhook function

controller.webserver.get('/', (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});

// Set up the GitHub webhook route using the imported function
controller.webserver.post('/github/webhook', initGithubWebhook(controller));

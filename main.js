"use strict";
import { configuration } from './config.js';
import { ChatBot } from './chatbot.js';

const chat = document.querySelector('#chat');
const chatInput = document.querySelector('#chatinput');
const submitButton = document.querySelector('#chatsubmit');

const chatbot = new ChatBot(configuration);


function addBotMessage(newMsg) {
    const element = document.createElement('div');
    element.className = 'msg botmsg';

    newMsg.split('\n').forEach((line) => {
        const lineElement = document.createElement('div');
        lineElement.textContent = line;
        element.append(lineElement);
    });

    const cont = document.createElement('div');
    const arrow = document.createElement('div');

    cont.className = 'msgcont botmsgcont';
    arrow.className = 'arrow arrow-left';

    cont.append(element);
    cont.append(arrow);

    chat.append(cont);
    element.scrollIntoView(false, { smooth: true });
}


function addUserMessage(newMsg) {
    const element = document.createElement('div');
    element.className = 'msg usermsg';
    element.textContent = newMsg;

    const cont = document.createElement('div');
    const arrow = document.createElement('div');

    cont.className = 'msgcont usermsgcont';
    arrow.className = 'arrow arrow-right';

    cont.append(element);
    cont.append(arrow);

    chat.append(cont);

    element.scrollIntoView(false, { smooth: true });

    // Bot response
    setTimeout(() => {
        const response = chatbot.respond(newMsg);
        addBotMessage(response);

    }, (Math.random() / 2 + 1) * 1000);
}


submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const msg = chatInput.value;
    chatInput.value = '';

    if (msg.length > 0) {
        addUserMessage(msg, true);
    }
});

addBotMessage(chatbot.reset());

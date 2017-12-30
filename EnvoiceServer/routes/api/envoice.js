const router = require('express').Router();
import google from "googleapis";
import pdfService from "../../service/pdfService";

function listMessagesConfig(auth) {
  return {
    auth: auth,
    maxResults: 10,
    userId: 'me',
    q: 'to:me has:attachment after:2017/11/24 before:2017/12/24'
  };
}

function getMessagesConfig(userId, auth, messageId) {
  return {
    userId: userId,
    auth: auth,
    id: messageId
  };
}

function getMessageAttachmentConfig(userId, auth, messageId, attachment) {
  return {
    userId: userId,
    auth: auth,
    messageId: messageId,
    id: attachment.body.attachmentId
  };
}

function listMessages(auth) {
  const gmail = google.gmail('v1');
  gmail.users.messages.list(listMessagesConfig(auth), (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    const messages = response.messages;
    if (messages.length === 0) {
      console.log('No messages found.');
    }
    else {
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        getMessage(gmail, auth, 'me', message.id);
      }
    }
  });
}

function getMessage(gmail, auth, userId, messageId) {
  gmail.users.messages.get(getMessagesConfig(userId, auth, messageId), (err, response) => {
    response.payload.parts.forEach(attachment => {
      if (attachment.mimeType === 'application/pdf') {
        gmail.users.messages.attachments.get(getMessageAttachmentConfig(userId, auth, messageId, attachment), (err, response) => {
          if (!err) {
            pdfService.convertToText(response.data);
          }
        });
      }
    });
  });
}

module.exports = router;
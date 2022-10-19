const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
let response;

/**
 * Sample Lambda function
 */
exports.handler = async (event, context) => {
  try {
    const ret = await axios(url);
    const greeting = "Hallo Welt";

    if (!("greetings" in event)) event = { greetings: [] };
    event.greetings.push(greeting);
    event.isGermanFirst = event.greetings[0] === greeting;
    event.location = ret.data.trim();

    response = {
      statusCode: 200,
      body: event
    }

  } catch (err) {
    console.log(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({ err : err })
    }
  }

  return response;
}
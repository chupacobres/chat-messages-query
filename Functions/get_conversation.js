exports.handler = async function (context, event, callback) {

    const response = new Twilio.Response();

    const client = context.getTwilioClient();
    const channelSid = event.channelSid;
    console.log(channelSid)

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    //replace with your Chat Instance Sid
    client.chat.services('ISXXXXXXXXXXXXXXXX')
        .channels(channelSid)
        .messages
        .list({ limit: 20 })
        .then(messages => {

            const results = messages.map(m => {
                const author = m.from
                const message = m.body
                const mObj = { author: author, message: message }
                return mObj
            })
            const jsonresult = JSON.stringify(results);
            response.setHeaders(headers);
            response.setBody(jsonresult);
            return callback(null, response)
        })
        .catch((error) => {
            console.error(error);
            return callback(error);
        });
}

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Divide the following project into 3 milestones task : \"Build an android app\" ",
        //maxTokens: 64,
        temperature: 0,
        max_tokens: 64,
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();
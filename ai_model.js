const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (noOftasks, task) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Divide the following project into" + noOftasks + "milestone tasks :" + task + ". Give output in following format : \"1 : task 1 , 2 : task 2, 3 : task 3  \" ",
        temperature: 0,
        max_tokens: 64,
    });
    // console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text; // returns string
    
}

runCompletion(3, "Build an android app");

module.exports = {
    runCompletion
}

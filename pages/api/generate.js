// import { Configuration, OpenAIApi } from 'openai';
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// console.log("key is: ", process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = "";
const basePromptPrefix = `
Write a 200 words description on the following topic:

Topic:
`

const generateContent = async (req, res) => {
    // Run first prompt
    // console.log("req: ", req);
    console.log(`API: ${basePromptPrefix}${req.body.prompt}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.prompt}`,
        temperature: 0.8,
        max_tokens: 300,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt = `
    From the topic below:
    
    Topic: ${req.body.prompt} 

    We generated the following description:

    Description: ${basePromptOutput.text}
    
    Descend this description into nouns and adjectives separated by ',', to be used as image prompts.

    Image prompt:
    `

    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.9,
        max_tokens: 200,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // res.status(200).json({ output: basePromptOutput });
    res.status(200).json({ output: secondPromptOutput });
};

export default generateContent;

// module.exports = {
//     generateContent,
// };


// const openai = require('openai');
// //require('dotenv').config();
// // use the openai JS library to fetch the API key from the dotenv file



// openai.apiKey = process.env.OPENAI_API_KEY;
// console.log("the key is: ", openai.apiKey);



// const generateContent = async (prompt) => {
//     console.log("here is the prompt", prompt)
// };
// const generateContent = async (prompt) => {
//     try {
//         console.log("here is the prompt", prompt)
//         const response = await openai.createCompletion({
//             model: 'text-davinci-003',
//             prompt: prompt,
//             temperature: 0.7,
//             max_tokens: 256,
//         });
//         return response.choices[0].text;
//     } catch (error) {
//         console.error(error);
//         return error;
//     }
//
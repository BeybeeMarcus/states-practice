const { Configuration, OpenAIApi } = require('openai');

const createOpenAiCompletion = async (apiKey, model, one_shot_prompt, temperature, maxTokens) => {
    
    const configuration = new Configuration({
        apiKey: apiKey
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: model,
        prompt: one_shot_prompt,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["END"],
    });
    
    //OPENAI completion
    return completion;
}

module.exports = { createOpenAiCompletion }
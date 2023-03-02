const cohere = require("cohere-ai");

const createCohereCompletion = async (apiKey, model, one_shot_prompt, temperature, maxTokens) => {
    
    cohere.init(apiKey);
    let completion = null;
    
    completion = await cohere.generate({
            model: model,
            prompt: one_shot_prompt,
            max_tokens: maxTokens,
            temperature: temperature,
            k: 0,
            p: 0.75,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop_sequences: [],
    });
    
    //Cohere completion
    //console.log(`Prediction: ${response.body.generations[0].text}`);
    return completion;
}

module.exports = { createCohereCompletion }
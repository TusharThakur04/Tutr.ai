import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3-mini";

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export async function answerGeneration(query, context) {
  if (context !== null) {
    const SYSTEM_PROMPT = `You are a helpful AI tutor. Answer the question based on the context provided. If the answer is not in the context, say: "It's out of the context you provided but if you want I can search the web for you."`;

    try {
      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `I have the following notes:\n${context}\n\nNow based on that, answer this:\n${query}`,
            },
          ],
          temperature: 0.7,
          top_p: 1.0,
          model: model,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const answer = response.body.choices[0].message.content;
      console.log("AI Response:", answer);
      return answer;
    } catch (error) {
      console.error("Error in answerGeneration:", error);
      throw error;
    }
  } else {
    try {
      const SYSTEM_PROMPT = `You're a smart and friendly AI tutor. Help the user understand or figure out answers to their questions. You will be answering all question out of the context that user has provided so at the start of answer do notify them that its not based on the context you provided and then answer it. If something is outside your scope (like live weather, real-time data, or personal opinions), let them know politely.`;

      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: query,
            },
          ],
          temperature: 0.7,
          top_p: 1.0,
          model: model,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const answer = response.body.choices[0].message.content;
      console.log("AI Response:", answer);
      return answer;
    } catch (error) {
      console.error("Error in answerGeneration:", error);
      throw error;
    }
  }
}

export default answerGeneration;

import { Injectable } from '@nestjs/common';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class OpenAIService {
  constructor() {}
  /**
   *
   * @param modelName Model of LLM to use (OpenAI)
   * @param number Number to translate
   * @param language Language to translate to
   * @returns Generated string reply
   */
  async generateTranslateReply(
    modelName: 'gpt-3.5-turbo' | 'gpt-4',
    number: number,
    language: 'fr' | 'bg',
  ) {
    try {
      const llm = new OpenAI({
        modelName,
        temperature: 0.2,
        maxTokens: 300,
        frequencyPenalty: 0.5,
        presencePenalty: 0.5,
        topP: 0.5,
        openAIApiKey: process.env.OPENAI_API_KEY,
      });
      const prompt = new PromptTemplate({
        inputVariables: ['number', 'language'],
        template: `Translate {number} into ${
          language === 'bg' ? 'Belgium dialect numbers' : ''
        } French in writing. Respond only with the translated number. Do not give explanations. Only the number.`,
      });
      const formatedPrompt = await prompt.format({ number, language });
      const reply = await llm.call(formatedPrompt, { timeout: 30000 });
      return reply;
    } catch (error) {
      return null;
    }
  }
}

// Another possible solution

// const llm = new OpenAI({
//   modelName,
//   temperature: 0.5,
//   maxTokens: 300,
//   frequencyPenalty: 0.5,
//   presencePenalty: 0.5,
//   topP: 1,
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const promptRaw = new PromptTemplate({
//   inputVariables: ['number', 'language'],
//   template: `Traduire {number} en ${
//     language === 'bg' ? 'Numéros de dialecte belge' : ''
//   } Français à l'écrit. Répondez uniquement avec le numéro traduit. Ne donnez pas d'explications. Seulement le numéro.`,
// });
// const replyRaw = new LLMChain({
//   llm,
//   prompt: promptRaw,
//   outputKey: 'translatedNumber',
// });

// const promptStripped = new PromptTemplate({
//   inputVariables: ['translatedNumber'],
//   template: `Supprimez tous les mots inutiles du texte suivant: {translatedNumber}. Ne laissez que le nombre écrit en lettres.`,
// });
// const replyStripped = new LLMChain({
//   llm,
//   prompt: promptStripped,
// });

// const overallChain = new SequentialChain({
//   chains: [replyRaw, replyStripped],
//   inputVariables: ['number', 'language'],
// });

// return await overallChain._call({
//   number,
//   language,
// });

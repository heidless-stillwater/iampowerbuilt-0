'use server';

/**
 * @fileOverview A fitness question answering AI agent.
 *
 * - answerFitnessQuestions - A function that answers fitness-related questions.
 * - AnswerFitnessQuestionsInput - The input type for the answerFitnessQuestions function.
 * - AnswerFitnessQuestionsOutput - The return type for the answerFitnessQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFitnessQuestionsInputSchema = z.object({
  question: z.string().describe('The fitness-related question to answer.'),
});
export type AnswerFitnessQuestionsInput = z.infer<typeof AnswerFitnessQuestionsInputSchema>;

const AnswerFitnessQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the fitness-related question.'),
});
export type AnswerFitnessQuestionsOutput = z.infer<typeof AnswerFitnessQuestionsOutputSchema>;

export async function answerFitnessQuestions(input: AnswerFitnessQuestionsInput): Promise<AnswerFitnessQuestionsOutput> {
  return answerFitnessQuestionsFlow(input);
}

const needsClarificationTool = ai.defineTool({
  name: 'needsClarification',
  description: 'Use this tool when the question is ambiguous or lacks sufficient detail to provide a helpful answer. The tool will ask the user for more information.',
  inputSchema: z.object({
    reason: z.string().describe('The reason why the question needs clarification.'),
  }),
  outputSchema: z.literal('Clarification needed.'),
},
async () => {
  return 'Clarification needed.';
});

const answerDirectlyTool = ai.defineTool({
    name: 'answerDirectly',
    description: 'If you have enough context to answer the question, call this tool to answer the question directly.',
    inputSchema: z.object({
      answer: z.string().describe('The full answer to the question.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    // Simply return the answer provided in the input
    return input.answer;
  }
);

const prompt = ai.definePrompt({
  name: 'answerFitnessQuestionsPrompt',
  input: {schema: AnswerFitnessQuestionsInputSchema},
  output: {schema: AnswerFitnessQuestionsOutputSchema},
  tools: [needsClarificationTool, answerDirectlyTool],
  prompt: `You are a personal fitness assistant. Use your knowledge of fitness and nutrition to answer the following question: {{{question}}}. 

  If the question is unclear or ambiguous, use the needsClarification tool to ask for more information. 
  If you have enough information to provide a helpful answer, use the answerDirectly tool. `,
});

const answerFitnessQuestionsFlow = ai.defineFlow(
  {
    name: 'answerFitnessQuestionsFlow',
    inputSchema: AnswerFitnessQuestionsInputSchema,
    outputSchema: AnswerFitnessQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Determine if a tool was called and handle the response accordingly
    if (output === 'Clarification needed.') {
      return { answer: 'Please provide more details so I can assist you better.' };
    } else {
      return { answer: output! };
    }
  }
);

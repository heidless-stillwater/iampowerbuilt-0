'use server';

/**
 * @fileOverview Implements a Genkit flow to clarify ambiguous fitness-related questions from users.
 *
 * - clarifyAmbiguousQuery - A function that takes an ambiguous query as input and returns a refined question.
 * - ClarifyAmbiguousQueryInput - The input type for the clarifyAmbiguousQuery function.
 * - ClarifyAmbiguousQueryOutput - The return type for the clarifyAmbiguousQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClarifyAmbiguousQueryInputSchema = z.object({
  query: z.string().describe('The ambiguous fitness-related question from the user.'),
});
export type ClarifyAmbiguousQueryInput = z.infer<typeof ClarifyAmbiguousQueryInputSchema>;

const ClarifyAmbiguousQueryOutputSchema = z.object({
  refinedQuery: z.string().describe('A more specific and clear fitness-related question to answer.'),
});
export type ClarifyAmbiguousQueryOutput = z.infer<typeof ClarifyAmbiguousQueryOutputSchema>;

export async function clarifyAmbiguousQuery(input: ClarifyAmbiguousQueryInput): Promise<ClarifyAmbiguousQueryOutput> {
  return clarifyAmbiguousQueryFlow(input);
}

const clarifyAmbiguousQueryPrompt = ai.definePrompt({
  name: 'clarifyAmbiguousQueryPrompt',
  input: {schema: ClarifyAmbiguousQueryInputSchema},
  output: {schema: ClarifyAmbiguousQueryOutputSchema},
  prompt: `You are an AI assistant designed to help users with fitness-related questions. The user has provided the following question which seems ambiguous and you need to ask for clarification.

  Ambiguous Question: {{{query}}}

  Please provide a single, clear, and specific question to the user that will help you better understand their needs and provide a relevant answer. The response MUST be a question to the user.
  `,
});

const clarifyAmbiguousQueryFlow = ai.defineFlow(
  {
    name: 'clarifyAmbiguousQueryFlow',
    inputSchema: ClarifyAmbiguousQueryInputSchema,
    outputSchema: ClarifyAmbiguousQueryOutputSchema,
  },
  async input => {
    const {output} = await clarifyAmbiguousQueryPrompt(input);
    return output!;
  }
);

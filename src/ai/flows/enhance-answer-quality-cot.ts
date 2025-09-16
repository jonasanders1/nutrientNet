'use server';
/**
 * @fileOverview This file defines a Genkit flow that enhances the quality and faithfulness of LLM answers
 * by analyzing user prompts and rephrasing them using a Chain of Thought (CoT) approach when appropriate.
 *
 * - enhanceAnswerQualityWithCoT - A function that takes a user prompt as input and returns an enhanced answer.
 * - EnhanceAnswerQualityWithCoTInput - The input type for the enhanceAnswerQualityWithCoT function.
 * - EnhanceAnswerQualityWithCoTOutput - The return type for the enhanceAnswerQualityWithCoT function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceAnswerQualityWithCoTInputSchema = z.object({
  userPrompt: z.string().describe('The original user prompt.'),
});
export type EnhanceAnswerQualityWithCoTInput = z.infer<typeof EnhanceAnswerQualityWithCoTInputSchema>;

const EnhanceAnswerQualityWithCoTOutputSchema = z.object({
  enhancedPrompt: z.string().describe('The rephrased prompt, or the original prompt if no rephrasing was needed.'),
  reasoning: z.string().optional().describe('The reasoning behind the rephrasing, if any.'),
});
export type EnhanceAnswerQualityWithCoTOutput = z.infer<typeof EnhanceAnswerQualityWithCoTOutputSchema>;

export async function enhanceAnswerQualityWithCoT(input: EnhanceAnswerQualityWithCoTInput): Promise<EnhanceAnswerQualityWithCoTOutput> {
  return enhanceAnswerQualityWithCoTFlow(input);
}

const analyzePromptPrompt = ai.definePrompt({
  name: 'analyzePromptPrompt',
  input: {schema: EnhanceAnswerQualityWithCoTInputSchema},
  output: {schema: z.object({shouldRephrase: z.boolean().describe('Whether the prompt should be rephrased using CoT.')})},
  prompt: `You are an AI prompt analyzer. Your task is to determine if a given user prompt would benefit from being rephrased using a Chain of Thought (CoT) approach to improve the quality and faithfulness of the LLM's answer.\n\nConsider these factors:\n- Does the prompt require complex reasoning or multi-step inference?\n- Is the prompt likely to lead to a vague or unfaithful answer?\n- Would breaking down the problem into smaller steps improve the clarity and accuracy of the response?\n\nBased on your analysis, determine whether the prompt should be rephrased.\n\nUser Prompt: {{{userPrompt}}}\n\nShould Rephrase (true/false):`,
});

const rephrasePromptPrompt = ai.definePrompt({
  name: 'rephrasePromptPrompt',
  input: {schema: EnhanceAnswerQualityWithCoTInputSchema},
  output: {schema: z.object({rephrasedPrompt: z.string().describe('The rephrased prompt using CoT.'), reasoning: z.string().describe('The reasoning behind the rephrasing.')})},
  prompt: `You are an AI prompt rephraser specializing in Chain of Thought (CoT) prompting. Your task is to rephrase a given user prompt to improve the quality and faithfulness of the LLM's answer.\n\nApply the following principles:\n- Break down the problem into smaller, logical steps.\n- Guide the LLM to think step-by-step, explaining its reasoning along the way.\n- Ensure that the rephrased prompt is clear, specific, and focused on eliciting a faithful and accurate response.\n\nUser Prompt: {{{userPrompt}}}\n\nRephrased Prompt (CoT):`,
});

const enhanceAnswerQualityWithCoTFlow = ai.defineFlow(
  {
    name: 'enhanceAnswerQualityWithCoTFlow',
    inputSchema: EnhanceAnswerQualityWithCoTInputSchema,
    outputSchema: EnhanceAnswerQualityWithCoTOutputSchema,
  },
  async input => {
    const {output: analysisResult} = await analyzePromptPrompt(input);

    if (analysisResult && analysisResult.shouldRephrase) {
      const {output: rephraseResult} = await rephrasePromptPrompt(input);
      return {
        enhancedPrompt: rephraseResult!.rephrasedPrompt,
        reasoning: rephraseResult!.reasoning,
      };
    } else {
      return {
        enhancedPrompt: input.userPrompt,
      };
    }
  }
);

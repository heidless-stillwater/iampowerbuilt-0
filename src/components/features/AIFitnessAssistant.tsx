
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { answerFitnessQuestions, AnswerFitnessQuestionsInput } from "@/ai/flows/answer-fitness-questions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  type: "user" | "ai" | "error";
  text: string;
}

export function AIFitnessAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { type: "user", text: query }]);
    
    try {
      const input: AnswerFitnessQuestionsInput = { question: query };
      const result = await answerFitnessQuestions(input);
      setMessages(prev => [...prev, { type: "ai", text: result.answer }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { type: "error", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setQuery("");
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary font-headline">AI Fitness Assistant</h2>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-primary font-headline">
              <Sparkles className="h-6 w-6" />
              Ask Your Fitness Questions
            </CardTitle>
            <CardDescription>
              Get instant advice from our AI-powered fitness coach.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 max-h-96 overflow-y-auto p-4 rounded-md border bg-muted/30">
              {messages.length === 0 && (
                <p className="text-muted-foreground text-center">No messages yet. Ask a question to start!</p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "error" ? (
                     <Alert variant="destructive" className="w-full">
                       <AlertTitle>Error</AlertTitle>
                       <AlertDescription>{msg.text}</AlertDescription>
                     </Alert>
                  ) : (
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {msg.text.split('\\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  )}
                </div>
              ))}
               {isLoading && messages[messages.length -1]?.type === 'user' && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-secondary text-secondary-foreground inline-flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How can I improve my squat form?"
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !query.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              AI responses are for informational purposes only and not a substitute for professional medical or fitness advice.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

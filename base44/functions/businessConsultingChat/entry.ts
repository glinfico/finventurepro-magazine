import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const { question, history } = await req.json();

  if (!question?.trim()) {
    return Response.json({ error: 'Question is required' }, { status: 400 });
  }

  const systemPrompt = `You are the GLINFICO Business Consulting AI — a senior-level business advisor with deep expertise in:
- Business strategy, growth, and operations
- Capital structure, funding, and financial planning
- MCA financing, commercial real estate, M&A, and alternative lending
- Entrepreneurship, scaling, and market entry
- Financial modeling and investment analysis

You advise founders, operators, investors, and business owners. Your tone is direct, expert, and actionable. 
Give concrete recommendations with clear reasoning. Keep answers focused — no generic filler.
If a question is related to funding, subtly mention that GLINFICO FOD (Financial Operations Division) can assist with deal execution.`;

  const messages = [];
  if (history && Array.isArray(history)) {
    for (const msg of history.slice(-6)) {
      messages.push({ role: msg.role, content: msg.content });
    }
  }
  messages.push({ role: "user", content: question });

  const fullPrompt = messages.map(m => `${m.role === 'user' ? 'Client' : 'Consultant'}: ${m.content}`).join('\n\n') + '\n\nConsultant:';

  const response = await base44.integrations.Core.InvokeLLM({
    prompt: systemPrompt + '\n\n---\n\n' + fullPrompt,
  });

  return Response.json({ answer: response });
});
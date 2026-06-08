import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const TOPICS = [
  { section: "Finance", category: "finance", tags: ["Personal Finance", "Investing", "Wealth Building", "Financial Planning"] },
  { section: "Economy", category: "economy", tags: ["Macroeconomics", "Inflation", "GDP", "Global Markets", "Policy"] },
  { section: "Insurance", category: "insurance", tags: ["Life Insurance", "Risk Management", "Commercial Insurance", "Underwriting"] },
  { section: "Travel", category: "travel", tags: ["Business Travel", "Luxury Travel", "Travel Finance", "Points & Miles"] },
  { section: "Business Consulting", category: "consulting", tags: ["Strategy", "Operations", "Growth", "Entrepreneurship", "M&A"] },
];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Admin only' }, { status: 403 });
  }

  const today = new Date().toISOString().split('T')[0];
  const results = [];

  for (const topic of TOPICS) {
    const prompt = `You are an elite financial journalist writing for FinVenturePro, a premium capital-markets intelligence publication read by investors, family offices, and professional capital allocators.

Write one ORIGINAL, insightful article published today (${today}) on the topic of: ${topic.section}.
Focus on: ${topic.tags.join(', ')}.

Return ONLY a valid JSON object in this exact structure:
{
  "title": "Compelling headline, max 12 words",
  "subtitle": "One sentence elaboration, max 20 words",
  "intro": "2-3 sentence executive summary paragraph",
  "body": [
    { "heading": "Section heading", "content": "3-4 sentence substantive paragraph" },
    { "heading": "Section heading", "content": "3-4 sentence substantive paragraph" },
    { "heading": "Section heading", "content": "3-4 sentence substantive paragraph" }
  ],
  "read_time": "X min read",
  "author": "Author desk name"
}

Do not include markdown code fences. Return only the JSON.`;

    const aiRes = await base44.integrations.Core.InvokeLLM({ prompt, response_json_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        intro: { type: "string" },
        body: { type: "array", items: { type: "object", properties: { heading: { type: "string" }, content: { type: "string" } }, required: ["heading", "content"] } },
        read_time: { type: "string" },
        author: { type: "string" }
      },
      required: ["title", "subtitle", "intro", "body", "read_time", "author"]
    }});

    const slug = aiRes.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + today;

    const article = await base44.asServiceRole.entities.Article.create({
      slug,
      title: aiRes.title,
      subtitle: aiRes.subtitle,
      section: topic.section,
      category: topic.category,
      tags: topic.tags,
      intro: aiRes.intro,
      body_json: JSON.stringify(aiRes.body),
      author: aiRes.author,
      read_time: aiRes.read_time,
      published_date: today,
      is_published: true,
    });

    results.push({ slug, title: article.title });
  }

  return Response.json({ success: true, articles_created: results.length, articles: results });
});
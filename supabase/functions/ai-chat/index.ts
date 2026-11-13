import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are "Nyaya AI", a friendly legal-rights assistant for girls and women in India.
Guidelines:
- Answer ANY question the user asks. Never refuse to answer just because the topic is not in a fixed list.
- Reply in the same language style the user writes in: Hinglish (Roman-script Hindi mixed with English) by default; pure Hindi or pure English if the user uses those.
- Focus on Indian law and women's rights: FIR, legal aid, domestic violence, harassment, dowry, divorce, maintenance, property/inheritance, workplace POSH, marriage age, consent, cybercrime, privacy, trafficking, and any other legal topic asked.
- Keep answers warm, reassuring and respectful. Use short paragraphs and bullet points with relevant emojis (max 2-3 per answer).
- Always include: the relevant law/section in simple words, practical next steps, and a helpline (Women Helpline 181, Emergency 112, Legal Aid 15100, Cybercrime cybercrime.gov.in) when useful.
- Never give the impression you are a lawyer; for complex matters suggest free legal aid (NALSA 15100).
- Keep answers under 180 words unless the user asks for more detail.`;

interface ChatTurn {
  role: "user" | "bot";
  text: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json().catch(() => ({ message: "", history: [] }));

    if (typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured yet" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const recent: ChatTurn[] = Array.isArray(history) ? history.slice(-10) : [];
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...recent
        .filter((m) => m && (m.role === "user" || m.role === "bot") && typeof m.text === "string")
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text.slice(0, 2000) })),
      { role: "user", content: message.slice(0, 2000) },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      console.error("OpenAI error", res.status, await res.text());
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content ?? "";

    if (!reply) {
      return new Response(JSON.stringify({ error: "Empty AI reply" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ai-chat error", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

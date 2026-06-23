import { createClient } from "@/lib/supabase/server";

function popupResponse(success: boolean) {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <body>
        <script>
          localStorage.setItem("discord-oauth-result", JSON.stringify({ success: ${success}, ts: Date.now() }));
          window.close();
        </script>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return popupResponse(true);
    }
  }

  return popupResponse(false);
}

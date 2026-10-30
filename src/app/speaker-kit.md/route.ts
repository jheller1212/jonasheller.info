import { speakerKitMarkdown } from "@/lib/speakerKit";

export const dynamic = "force-static";

export function GET() {
  return new Response(speakerKitMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

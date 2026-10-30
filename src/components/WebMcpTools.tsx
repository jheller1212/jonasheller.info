"use client";

import { useEffect } from "react";

type ToolResult = { content: { type: "text"; text: string }[] };

interface ModelContext {
  registerTool(
    tool: {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute(input: Record<string, unknown>): Promise<ToolResult>;
    },
    options: { signal: AbortSignal }
  ): void;
}

const text = (value: unknown): ToolResult => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value) }],
});

/**
 * Read-only WebMCP tools. Renders nothing and does nothing in browsers without
 * WebMCP. The API is still in origin trial and sources disagree on whether it
 * lives on document or navigator, hence both. Data is imported on first call so
 * the publication list stays out of the page bundle.
 */
export default function WebMcpTools() {
  useEffect(() => {
    const context = ((document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext);
    if (typeof context?.registerTool !== "function") return;

    const controller = new AbortController();
    const readOnly = { readOnlyHint: true };
    try {
      context.registerTool(
        {
          name: "list_keynote_topics",
          description: "List Dr. Jonas Heller's keynote topics, each with its audience outcome.",
          inputSchema: { type: "object", properties: {} },
          annotations: readOnly,
          execute: async () => text((await import("@/lib/speakerKit")).keynoteTopics),
        },
        { signal: controller.signal }
      );
      context.registerTool(
        {
          name: "list_publications",
          description:
            "List Dr. Jonas Heller's publications with authors, venue, year and DOI. Optionally filter by a word in the title or venue, and by earliest year.",
          inputSchema: {
            type: "object",
            properties: {
              topic: { type: "string", description: "Word to find in the title or venue" },
              year_from: { type: "integer", description: "Earliest publication year" },
            },
          },
          annotations: readOnly,
          execute: async ({ topic, year_from }) => {
            const { publications } = await import("@/data/publications");
            const needle = typeof topic === "string" ? topic.toLowerCase() : "";
            const from = typeof year_from === "number" ? year_from : 0;
            return text(
              publications
                .filter((p) => (p.year ?? 0) >= from)
                .filter((p) => `${p.title} ${p.venue ?? ""}`.toLowerCase().includes(needle))
                .map(({ title, authors, venue, year, doi }) => ({ title, authors, venue, year, doi }))
            );
          },
        },
        { signal: controller.signal }
      );
      context.registerTool(
        {
          name: "get_speaker_kit",
          description: "Get the canonical speaker kit as Markdown: bios, headshot, topics, languages and how to book.",
          inputSchema: { type: "object", properties: {} },
          annotations: readOnly,
          execute: async () => text(await (await fetch("/speaker-kit.md")).text()),
        },
        { signal: controller.signal }
      );
    } catch {
      // An experimental API must never be able to break the page.
    }
    return () => controller.abort();
  }, []);

  return null;
}

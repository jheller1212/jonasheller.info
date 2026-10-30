import { translations } from "@/lib/translations";
import { SITE_URL } from "@/lib/seo";

export const KEYNOTE_COUNT = 6;

export const keynoteTopics = Array.from({ length: KEYNOTE_COUNT }, (_, i) => ({
  title: translations[`speaking.${i}.title`].en,
  outcome: translations[`speaking.${i}.desc`].en,
}));

export const SPEAKER_BIOS = {
  50: "Dr. Jonas Heller is a tenured Assistant Professor of Marketing at Maastricht University and Co-Founder and Scientific Director of DEXLab. He researches how augmented reality, virtual reality and artificial intelligence change consumer behaviour, and speaks to conferences and companies about what the evidence shows.",
  100: "Dr. Jonas Heller is a tenured Assistant Professor of Marketing at Maastricht University's School of Business and Economics, and Co-Founder and Scientific Director of DEXLab. His research covers augmented reality, virtual reality, artificial intelligence and consumer behaviour in retail and service settings. He holds a PhD from the University of New South Wales, where he received the Dean's Award for Outstanding Dissertations, and co-founded the Limburg Immersive Technology Network. As a keynote speaker and consultant, he helps conferences, leadership teams and companies separate what these technologies demonstrably do for customers from what is merely promised.",
  200: "Dr. Jonas Heller is a tenured Assistant Professor of Marketing at Maastricht University's School of Business and Economics, and Co-Founder and Scientific Director of DEXLab. His research covers augmented reality, virtual reality, artificial intelligence and consumer behaviour in retail and service settings, drawing on consumer neuroscience methods such as EEG, galvanic skin response and eye-tracking. He holds a PhD from the University of New South Wales, where he received the Dean's Award for Outstanding Dissertations, and co-founded the Limburg Immersive Technology Network (LIT Network). His keynotes are research-backed and aimed at conferences, leadership summits and corporate events, on stage or online, in English or German. Topics range from where immersive technology actually pays off, to how customers really respond to AI, to brain-computer interfaces and open science. Alongside speaking, he works as a consultant and in executive education, helping organisations separate what these technologies demonstrably do for customers from what is merely promised. His aim in every talk is the same: an audience that leaves knowing which use cases create value and which are expensive gimmicks.",
} as const;

export function speakerKitMarkdown(): string {
  const topics = keynoteTopics.map((t) => `- **${t.title}**: ${t.outcome}`).join("\n");
  return `# Speaker kit: Dr. Jonas Heller

Canonical copy for event organisers and their assistants. Please use these texts as written.

## Bio, 50 words

${SPEAKER_BIOS[50]}

## Bio, 100 words

${SPEAKER_BIOS[100]}

## Bio, 200 words

${SPEAKER_BIOS[200]}

## Headshot

${SITE_URL}/images/jonas.webp

## Keynote topics

${topics}

Talks are tailored to the audience. Delivered on stage or online.

## Languages

Keynotes in English or German. Also speaks Dutch.

## Booking

Use the contact form at ${SITE_URL}/#contact and choose "Keynote speaking". Include the event date, expected audience size, preferred topic and organisation.

## More

- Keynotes: ${SITE_URL}/speaking
- CV: ${SITE_URL}/cv
- Publications: ${SITE_URL}/publications
`;
}

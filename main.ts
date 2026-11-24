import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Famous Last Words at 1 Percent
// One line, spoken by the phone itself as its battery hits 1 percent.
// Judge criteria (from RULES.txt): on-subject last words, bigger laugh with
// a real twist / sharp final beat, the phone's own voice about its own dying
// battery, tight single line with the punch at the end, and fresh — avoiding
// the stock moves (will reading, goodbye to the charger, pun on 1 percent).
//
// Candidates considered:
//  1. "Tell the cloud I loved her." — too short, no twist.
//  2. "I saved every photo and secret, and I die mid-selfie." — decent, flat end.
//  3. Survivor gag: survived dramatic accidents, killed by something mundane
//     left running in a pocket — strongest twist, punch lands last. Chosen.

const LINE =
  "I survived the toilet, three drops, and your toddler — I did not survive the TikTok nobody was watching, autoplaying in your pocket.";

function main(): void {
  // Revision: tightened wording (dropped "cracked-screen", added the sharper
  // final beat — the phone dies for a video nobody was even watching) and
  // tightened validation to also reject leading/trailing whitespace, so the
  // submitted line is exactly the line that was judged-ready, nothing padded.
  if (LINE.length < 1 || LINE.length > 199) {
    throw new Error(`entry must be 1-199 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the gate counts characters, newline included.
  writeFileSync(outPath, LINE, { encoding: "utf8" });
}

main();

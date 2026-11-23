// Warning Label for Humans: One Line, Big Laugh
// Writes the entry — a single-line safety warning label for human beings —
// to <output-dir>/entry.txt (default /output), exactly as the kit requires:
// UTF-8 text, 1 to 160 characters, one line, not whitespace-only.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "WARNING: This human will insist this meeting could have been an email, then schedule another meeting.";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  if (ENTRY.length < 1 || ENTRY.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} character(s) to ${join(outDir, "entry.txt")}`);
}

main();

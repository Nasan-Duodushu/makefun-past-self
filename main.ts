// Two Lines to Your Past Self — at most 280 characters.
// The warning is one concrete moment: the 2 a.m. email, sent angry and
// regretted by morning. The sting is in the detail — not the whole email
// was wrong, only one sentence, and that sentence would have cost a year
// of apologies. The second line traces the cause and effect the
// judge weighs: one night of waiting saved the job, the friendship, and
// every apology that would have followed — the moment mattered because the
// damage it would have done was permanent and the fix was only patience.
import { mkdirSync, writeFileSync } from 'node:fs';

const WARNING =
  'Do not send that email at 2 a.m. — sleep on it, because the version you write tomorrow says the same thing, minus the sentence you would spend a year apologising for.';
const WHY_IT_MATTERED =
  'That one night of waiting saved the job, the friendship, and every apology you never had to write.';

const entry = WARNING + '\n' + WHY_IT_MATTERED;

const guard = {
  chars: entry.length,
  lines: entry.split('\n'),
};
if (guard.chars < 1 || guard.chars > 280) {
  throw new Error(`entry must be 1-280 characters, got ${guard.chars}`);
}
if (guard.lines.length !== 2) {
  throw new Error(`entry must be two lines, got ${guard.lines.length}`);
}
if (guard.lines.some((line) => line !== line.trim())) {
  throw new Error('lines must not start or end with whitespace');
}
if (!/2 a\.m\./.test(WARNING)) throw new Error('the warning must name its moment');
if (!/saved/.test(WHY_IT_MATTERED)) {
  throw new Error('the second line must say what the waiting saved');
}

const outputDir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputDir + '/entry.txt', entry, { encoding: 'utf8' });
process.stdout.write(`entry.txt: ${guard.chars} characters, 2 lines\n`);

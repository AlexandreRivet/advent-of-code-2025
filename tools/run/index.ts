import * as fs from 'fs';
import * as path from 'path';

const run = async (cb: (input: string) => Promise<unknown>, input: string, label: string, withBenchmark: boolean) => {
    if (withBenchmark) {
        const start = process.hrtime.bigint();
        const result = await cb(input);
        const end = process.hrtime.bigint();
        const spentTime = Number(end - start) / 1_000_000;
        console.log(`${label}: ${spentTime.toFixed(3)}ms (Result: ${result})`);
    } else {
        const result = await cb(input);
        console.log(`${label}: ${result}`);
    }
}

const args = process.argv.slice(2);
const withBenchmark = args[0] === '--benchmark';

const day = args[withBenchmark ? 1 : 0];
if (!day) {
  console.error('Please specify which day you want to benchmark');
  process.exit(1);
}

const dayFolder = path.join(__dirname, `../../days/day-${day.padStart(2, '0')}`);

const part = args[withBenchmark ? 2 : 1];
(async () => {
    // Default parts to run
    let parts = ['1', '2'];
    if (part) {
        if (!parts.includes(part)) {
            console.error('Invalid provided part. Running all day instead.');
        } else {
            parts = [part];
        }
    }

    console.log(`=== Day ${day} ===`);
    for (const partNumber of parts) {
        const input = fs.readFileSync(`${dayFolder}/part${partNumber}/input.txt`, 'utf-8');
        const { part } = await import(`${dayFolder}/part${partNumber}/part`);
        await run(part, input, `Part ${partNumber}`, withBenchmark);
    }
})();
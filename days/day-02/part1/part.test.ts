import { part } from './part';
import * as fs from 'fs';

describe('part 1', () => {
    it('example', async () => {
        const example = fs.readFileSync(__dirname + '/example.txt', 'utf-8');
        expect(await part(example)).toBe(1227775554);
    });

    it('input', async () => {
        const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8');
        expect(await part(input)).toBe(15873079081);
    });
});
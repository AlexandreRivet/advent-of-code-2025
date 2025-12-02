/**
 * Return all file lines in one array
 * @param input Input file content
 * @returns Array of file lines
 */
export const inputToLines = (input: string) => input.trim().split('\n');

/**
 * Return an array of chunkCount substring
 * @param input 
 * @param chunkCount 
 * @returns 
 */
export const splitInChunks = (input: string, chunkCount: number) => {
    if (input.length % chunkCount !== 0) {
        return [input];
    }

    const chunkSize = input.length / chunkCount;
    const chunks: string[] = [];

    for (let i = 0; i < input.length; i += chunkSize) {
        chunks.push(input.slice(i, i + chunkSize));
    }

    return chunks;
}
import { splitInChunks } from "@utils";

export const getLineRanges = (input: string): [number, number][] => 
    input
        .split(',')
        .map((range) => 
            (range
                .split('-')
                .map((str) => +str)) as [number, number]
        )

export const getRanges = (input: string[]): [number, number][] => input.flatMap(getLineRanges);

export const getIDsInRange = (range: [number, number]) => {
    return Array.from({
        length: range[1] - range[0] + 1
    }).map((_, index) => range[0] + index)
}

const getOccurrencesCount = (idStr: string, chunkCount: number): Map<string, number> => {
    const splittedId = splitInChunks(idStr, chunkCount);

    const occurrencesCount = new Map<string, number>();
    splittedId.forEach((subId) => {
        occurrencesCount.set(subId, (occurrencesCount.get(subId) ?? 0) + 1)
    });

    return occurrencesCount;
}

const isSplittedIDInvalid = (idStr: string, chunkCount: number) => {
    const occurrencesCount = getOccurrencesCount(idStr, chunkCount);
    const values = [...occurrencesCount.values()];
    // Only one value is repeated and at least 2 times
    return values.length === 1 && values.some((occurrencesCount) => occurrencesCount >= 2);
}

export const isIDInvalid = (id: number, maxChunkCount?: number) => {
    const idStr = `${id}`;
    const fMaxChunkCount = maxChunkCount ?? idStr.length;

    // We need at least 2 chunks count to process
    let currentChunkCount = 2;
    let isInvalid = false;

    while (!isInvalid && currentChunkCount <= fMaxChunkCount) {
        isInvalid = isSplittedIDInvalid(idStr, currentChunkCount++);
    }

    return isInvalid;
}
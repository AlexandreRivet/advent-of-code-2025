import { inputToLines, negativeModulo } from '@utils';

const getMoveOffset = (move: string) => {
    const direction = move.charAt(0) === 'L' ? -1 : 1;
    return parseInt(move.substring(1)) * direction;
}

export const part = async (input: string): Promise<number> => {
    const lines = inputToLines(input);
    const valuesCount = 100;

    return lines.reduce((acc, v) => {
        const newPointingValue = negativeModulo(acc.currentDial + getMoveOffset(v), valuesCount);

        return {
            currentDial: newPointingValue,
            numOfZero: acc.numOfZero + (newPointingValue === 0 ? 1 : 0)
        };
    }, { currentDial: 50, numOfZero: 0 }).numOfZero;
}
import { inputToLines, negativeModulo } from '@utils';
import { getMoveOffset } from '../shared';

const countZeroCrossings = (initialValue: number, offset: number, valuesCount) => {
    // No movement
    if (offset === 0) {
        return 0;
    }

    // Positive movement
    if (offset > 0) {
        const stepsToDoAtLeastOneLoop = initialValue === 0 ? valuesCount : valuesCount - initialValue;
        if (offset < stepsToDoAtLeastOneLoop) {
            return 0;
        }

        // At least one loop + floored loops (retrieve first delta for first loop)
        return 1 + Math.floor((offset - stepsToDoAtLeastOneLoop) / valuesCount);
    }

    // Negative movement
    if (offset < 0) {
        const stepsToDoAtLeastOneLoop = initialValue === 0 ? valuesCount : initialValue;
        const absoluteOffset = Math.abs(offset);
        if (absoluteOffset < stepsToDoAtLeastOneLoop) {
            return 0;
        }

        // At least one loop + floored loops (retrieve first delta for first loop)
        return 1 + Math.floor((absoluteOffset - stepsToDoAtLeastOneLoop) / valuesCount);
    }

}

export const part = async (input: string): Promise<number> => {
    const lines = inputToLines(input);
    const valuesCount = 100;

    return lines.reduce((acc, v) => {
        const offset = getMoveOffset(v);
        return {
            currentDial: negativeModulo(acc.currentDial + offset, valuesCount),
            numOfZero: acc.numOfZero + countZeroCrossings(acc.currentDial, offset, valuesCount),
        };
    }, { currentDial: 50, numOfZero: 0 }).numOfZero;
}
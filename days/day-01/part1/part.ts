import { inputToLines, negativeModulo } from '@utils';
import { getMoveOffset } from '../shared';

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
import { inputToLines } from '@utils';
import { getIDsInRange, getRanges, isIDInvalid } from '../shared';

export const part = async (input: string): Promise<number> => {
    const lines = inputToLines(input);
    const ranges = getRanges(lines);
    const rangeIds = ranges.map(getIDsInRange);
    
    return rangeIds
        .reduce(
            (globalInvalid, ids) => 
                ids
                    .reduce(
                        (localInvalid, id) => localInvalid + (isIDInvalid(id, 2) ? id : 0),
                        globalInvalid
                    ),
            0
        );
}
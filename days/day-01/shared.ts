export const getMoveOffset = (move: string) => {
    const direction = move.charAt(0) === 'L' ? -1 : 1;
    return parseInt(move.substring(1)) * direction;
}
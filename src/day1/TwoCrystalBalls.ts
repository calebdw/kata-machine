// O(sqrt(N))
export default function two_crystal_balls(breaks: boolean[]): number {
    let jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;

    for (; i < breaks.length; i += jump) {
        if (breaks[i]) break;
    }

    i -= jump;

    for (let j = i; j < Math.min(i + jump, breaks.length); j++) {
        if (breaks[j]) return j;
    }

    return -1;
}

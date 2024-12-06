export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    // needle is not in the array
    if (haystack[0] > needle || haystack[high-1] < needle) {
        return false;
    }

    do {
        let mid = Math.floor(low + (high - low)/2);

        if (haystack[mid] === needle) {
            return true;
        } else if (haystack[mid] > needle) {
            high = mid;
        } else {
            low = mid + 1;
        }
    } while (low < high);

    return false;
}

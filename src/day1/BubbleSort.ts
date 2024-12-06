export default function bubble_sort(arr: number[]): void {
    for (let j = 0; j < arr.length; j++) {
        let swapped = false;

        for (let i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] <= arr[i+1]) continue;

            swapped = true;
            let tmp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = tmp;
        }

        if (! swapped) break;
    }
}

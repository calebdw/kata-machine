function qs_hi(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }

    const pivotIdx = partition_hi(arr, lo, hi);

    qs_hi(arr, lo, pivotIdx - 1);
    qs_hi(arr, pivotIdx + 1, hi);
}

function partition_hi(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];

    let idx = lo - 1;

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] =  pivot;

    return idx;
}

function qs_mid(arr: number[], lo: number, hi: number): void {
    if (lo >= hi || lo < 0 || hi < 0) {
        return;
    }

    const pivotIdx = partition_mid(arr, lo, hi);
    qs_mid(arr, lo, pivotIdx);
    qs_mid(arr, pivotIdx + 1, hi);
}

function partition_mid(arr: number[], lo: number, hi: number): number {
    const pivot = arr[Math.floor((lo + hi)/2)];

    let i = lo - 1;
    let j = hi + 1;

    while (true) {
        do i++; while (arr[i] < pivot)
        do j--; while (arr[j] > pivot)

        if (i >= j) break;

        const tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }

    return j;
}

export default function quick_sort(arr: number[]): void {
    qs_hi(arr, 0, arr.length - 1);
    qs_mid(arr, 0, arr.length - 1);
}

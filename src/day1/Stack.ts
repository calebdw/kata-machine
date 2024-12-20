type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = {value: item} as Node<T>;
        this.length++;
        node.next = this.head;
        this.head = node;
    }
    pop(): T | undefined {
        if (!this.head) return undefined;

        this.length--;
        const node = this.head;
        this.head = node.next;

        return node.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}

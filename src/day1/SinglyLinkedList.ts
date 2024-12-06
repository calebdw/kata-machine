type Node<T> = {
    value: T,
    next?: Node<T>,
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        }

        let prev = this.find(idx - 1)
        if (!prev?.next) {
            this.append(item);
            return;
        }

        const node = { value: item } as Node<T>;
        this.length++;

        node.next = prev.next;
        prev.next = node;
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        let value = undefined;
        let prev = undefined;

        while (curr) {
            let next = curr.next;

            if (curr.value === item) {
                value = this.removeNode(prev, curr);
                prev = curr;
            } else {
                prev = curr;
            }

            curr = next;
        }

        return value;
    }
    get(idx: number): T | undefined {
        return this.find(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        if (!this.head) return undefined;

        if (idx === 0) {
            return this.removeNode(undefined, this.head);
        }

        let prev = this.find(idx - 1);

        return prev?.next ? this.removeNode(prev, prev.next) : undefined;
    }
    private removeNode(prev: Node<T> | undefined, node: Node<T>): T {
        this.length--;

        if (prev) {
            prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (!node.next) {
            this.tail = prev;
        }

        node.next = undefined;

        return node.value;
    }
    private find(idx: number): Node<T> | undefined {
        if (idx < 0) return undefined;

        let curr = this.head;

        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr;
    }
}

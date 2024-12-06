type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>,
}

export default class DoublyLinkedList<T> {
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
        this.head.prev = node;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        let curr = this.find(idx);

        if (!curr?.prev) {
            this.append(item);
            return;
        }

        const node = { value: item } as Node<T>;
        this.length++;

        curr.prev.next = node;
        node.prev = curr.prev;
        curr.prev = node;
        node.next = curr;
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        let value = undefined;

        while (curr) {
            let next = curr.next;

            if (curr.value === item) {
                value = this.removeNode(curr);
            }

            curr = next;
        }

        return value;
    }
    get(idx: number): T | undefined {
        return this.find(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        let curr = this.find(idx);

        return curr ? this.removeNode(curr) : undefined;
    }
    private removeNode(node: Node<T>): T {
        this.length--;

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        node.prev = node.next = undefined;

        return node.value;
    }
    private find(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr;
    }
}

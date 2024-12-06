type Node = {
    children: (Node | null)[],
    isWord: boolean,
}

export default class Trie {
    private head: Node;
    private charA: number;

    constructor() {
        this.charA = "a".charCodeAt(0);
        this.head = this.createNode();
    }

    insert(item: string): void {
        let curr = this.head;

        for (let c of item) {
            let idx = this.idx(c);

            if (curr.children[idx] === null) {
                curr.children[idx] = this.createNode();
            }

            curr = curr.children[idx] as Node;
        }

        curr.isWord = true;
    }
    delete(item: string): void {
        this.deleteWord(this.head, item);
    }
    find(partial: string): string[] {
        let curr = this.head;

        for (let c of partial) {
            let idx = this.idx(c);

            if (curr.children[idx] === null) {
                throw new Error("Node does not exist.");
            }

            curr = curr.children[idx] as Node;
        }

        let matches = [] as string[];

        this.completeWord(curr, partial, matches);

        return matches;
    }
    private completeWord(curr: Node, partial: string, matches: string[]): void {
        if (curr.isWord) {
            matches.push(partial);
        }

        for (let i = 0; i < curr.children.length; i++) {
            if (curr.children[i] === null) continue;

            this.completeWord(
                curr.children[i] as Node,
                partial + this.char(i),
                matches,
            );
        }
    }
    private createNode(): Node {
        return {
            children: new Array(26).fill(null) as (Node | null)[],
            isWord: false,
        } as Node;
    }
    private deleteWord(curr: Node, item: string): void {
        if (item.length === 0) {
            curr.isWord = false;
            return;
        }

        let idx = this.idx(item);

        if (curr.children[idx] === null) {
            throw new Error("Node does not exist.");
        }

        this.deleteWord(curr.children[idx] as Node, item.substring(1));

        if (curr.children[idx]?.children.every(c => c === null)) {
            curr.children[idx] = null;
        }
    }
    private idx(str: string): number {
        return str.charCodeAt(0) - this.charA;
    }
    private char(idx: number): string {
        return String.fromCharCode(idx + this.charA);
    }
}

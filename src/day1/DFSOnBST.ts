export default function dfs(head: BinaryNode<number> | null, needle: number): boolean {
    if (!head) return false;

    if (head.value === needle) {
        return true;
    } else if (head.value < needle) {
        return dfs(head.right, needle);
    }

    return dfs(head.left, needle);
}

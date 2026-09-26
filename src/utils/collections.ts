// more data structures in ts

export class LRU<K, V> {
  private map = new Map<K, V>();
  private readonly capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity;
  }
  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const v = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }
  set(key: K, value: V): void {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value!);
  }
  keys(): K[] {
    return [...this.map.keys()];
  }
}

export class PriorityQueue<T> {
  private heap: T[] = [];
  private readonly less: (a: T, b: T) => boolean;
  constructor(less: (a: T, b: T) => boolean) {
    this.less = less;
  }
  get size(): number {
    return this.heap.length;
  }
  push(item: T): void {
    const h = this.heap;
    h.push(item);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(h[i], h[p])) break;
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  }
  pop(): T | undefined {
    const h = this.heap;
    if (h.length === 0) return undefined;
    const top = h[0];
    const last = h.pop()!;
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < h.length && this.less(h[l], h[m])) m = l;
        if (r < h.length && this.less(h[r], h[m])) m = r;
        if (m === i) break;
        [h[i], h[m]] = [h[m], h[i]];
        i = m;
      }
    }
    return top;
  }
}

export type WeightedGraph = Record<string, Record<string, number>>;

export function dijkstra(g: WeightedGraph, start: string): Record<string, number> {
  const dist: Record<string, number> = { [start]: 0 };
  const pq = new PriorityQueue<[string, number]>((a, b) => a[1] < b[1]);
  pq.push([start, 0]);
  while (pq.size) {
    const [v, d] = pq.pop()!;
    if (d > (dist[v] ?? Infinity)) continue;
    for (const [w, cost] of Object.entries(g[v] ?? {})) {
      if (d + cost < (dist[w] ?? Infinity)) {
        dist[w] = d + cost;
        pq.push([w, dist[w]]);
      }
    }
  }
  return dist;
}

export class Trie {
  private root: Map<string, unknown> = new Map();
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.has(ch)) node.set(ch, new Map());
      node = node.get(ch) as Map<string, unknown>;
    }
    node.set("$", true);
  }
  startsWith(prefix: string): string[] {
    let node = this.root;
    for (const ch of prefix) {
      const next = node.get(ch);
      if (!next) return [];
      node = next as Map<string, unknown>;
    }
    const out: string[] = [];
    const walk = (n: Map<string, unknown>, acc: string) => {
      for (const [k, v] of n) k === "$" ? out.push(acc) : walk(v as Map<string, unknown>, acc + k);
    };
    walk(node, prefix);
    return out.sort();
  }
}

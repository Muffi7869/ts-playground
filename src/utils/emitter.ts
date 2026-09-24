// strongly typed event emitter

export type Listener<T> = (payload: T) => void;

export class Emitter<Events extends Record<string, unknown>> {
  private listeners: { [K in keyof Events]?: Set<Listener<Events[K]>> } = {};
  on<K extends keyof Events>(event: K, fn: Listener<Events[K]>): () => void {
    (this.listeners[event] ??= new Set()).add(fn);
    return () => this.off(event, fn);
  }
  off<K extends keyof Events>(event: K, fn: Listener<Events[K]>): void {
    this.listeners[event]?.delete(fn);
  }
  emit<K extends keyof Events>(event: K, payload: Events[K]): number {
    const set = this.listeners[event];
    set?.forEach((fn) => fn(payload));
    return set?.size ?? 0;
  }
}

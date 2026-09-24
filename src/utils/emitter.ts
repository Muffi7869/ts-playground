// strongly typed event emitter

export type Listener<T> = (payload: T) => void;

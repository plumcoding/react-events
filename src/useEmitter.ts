import {find, Topic} from "./state";

type TypedEmitter<T> = [(data?: T) => void]
type GenericEmitter<T> = [(topic: Topic, data?: T) => void]

export function useEmitter<T>(): GenericEmitter<T>;
export function useEmitter<T>(topic: string): TypedEmitter<T>;

export function useEmitter<T>(topic?: string): TypedEmitter<T> | GenericEmitter<T> {
    const _emit = <T>(topic: Topic, data?: T) => {
        const subscribers = find<T>(topic);
        subscribers.forEach((subscriber) => subscriber?.subscription?.(data));
    };

    debugger
    const emit = topic !== undefined
        ? <T>(data?: T) => _emit(topic, data)
        : <T>(topic: Topic, data?: T) => _emit(topic, data);

    return [emit];
}

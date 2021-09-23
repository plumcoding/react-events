import {find, Topic} from "./state";

export function useGlobalEmitter() {
    const emit = <T>(topic: Topic, data: T) => {
        const subscribers = find<T>(topic);
        subscribers.forEach((subscriber) => subscriber?.subscription?.(data));
    };

    return [emit];
}
export function useEmitter<T>(topic: string) {
    const [_emit] = useGlobalEmitter();
    const emit = (data: T) => _emit<T>(topic, data);

    return [emit];
}

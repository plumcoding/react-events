import {find, Topic} from "./state";

export const useGlobalEmitter = () => {
    const emit = <T>(topic: Topic, data: T) => {
        const subscribers = find(topic);
        subscribers.forEach((subscriber) => subscriber?.subscription?.(data));
    };

    return [emit];
}
export const useEmitter = <T>(topic: string) => {
    const [_emit] = useGlobalEmitter();
    const emit = (data: T) => _emit<T>(topic, data);

    return [emit];
};

export default useEmitter;

import {useEffect} from 'react';
import {subscribe, Subscriber, Topic} from "./state";

export function useListener<T>(topic: Topic, subscriber: Subscriber<T>) {
    useEffect(() => {
        const { unsubscribe } = subscribe<T>(topic, subscriber);
        return unsubscribe;
    }, [topic]);
}

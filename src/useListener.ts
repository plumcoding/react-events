import {useEffect} from 'react';
import {subscribe, Subscriber, Topic} from "./state";

export const useListener = <T>(topic: Topic, subscriber: Subscriber<T>) => {
    useEffect(() => {
        const { unsubscribe } = subscribe(topic, subscriber);
        return unsubscribe;
    }, [topic]);
};

export default useListener;

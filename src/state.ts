export type Topic = string;
export type Subscriber<T> = (data: T) => any;
type Subjects = {
    [topic: string]: {
        [id: string]: Subscriber<any>
    }
}
export type Subscription<T> = {
    id: string;
    unsubscribe(): void;
}

const SUBJECTS: Subjects = {};

function isSubjectExists(topic: Topic): boolean {
    return !!SUBJECTS?.[topic];
}
function createSubject(topic: Topic): void {
    if (isSubjectExists(topic)) return;
    SUBJECTS[topic] = {};
}
export function subscribe<T>(topic: Topic, subscriber: Subscriber<T>): Subscription<T> {
    if (!isSubjectExists(topic)) createSubject(topic);

    const id = Math.random().toString(16).slice(2);
    SUBJECTS[topic][id] = subscriber;

    const unsubscribe = () => {
        delete SUBJECTS?.[topic]?.[id];
    };

    return {
        id,
        unsubscribe: () => unsubscribe()
    };
}

function entries(o: {[key: string]: any}) {
    return Object.keys(o).map((k) => [k, o[k]]);
}

export function find<T>(topic: Topic): {id: string, subscription(data: T): void}[] {
    return entries(SUBJECTS?.[topic] || {}).map(([id, subscription]) => ({ id, subscription }));
}

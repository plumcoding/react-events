export type Topic = string;
export type Subscriber<T> = (data: T) => any;
export type Subjects = {
    [topic: Topic]: {
        [id: string]: Subscriber<any>
    }
}

const SUBJECTS: Subjects = {};

const isSubjectExists = (topic: Topic) => !!SUBJECTS?.[topic];
export const createSubject = (topic: Topic) => {
    if (isSubjectExists(topic)) return;
    SUBJECTS[topic] = {};
};
export const subscribe = <T>(topic: Topic, subscriber: Subscriber<T>) => {
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
};

type ObjectType = {[key: string]: any};
const values = (o: ObjectType) => Object.keys(o).map((k) => o[k]);
const entries = (o: ObjectType) => Object.keys(o).map((k) => [k, o[k]]);

export const findSubscribers = (topic: Topic) => values(SUBJECTS?.[topic] || {});
export const find = (topic: Topic) => entries(SUBJECTS?.[topic] || {}).map(([id, subscription]) => ({ id, subscription }));

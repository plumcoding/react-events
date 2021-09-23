# @plumcode/react-events
Lightweight event processor for React

**Note, this is beta package. Currently, only functional components are supported.**

## Install
### with npm
`npm i @plumcode/react-events`
### with yarn
`yarn add @plumcode/react-events`

## Usage
Simply put hook into your functional component:

```typescript jsx
import {useEffect} from 'react';
import {useEmitter, useListener, useGlobalEmitter} from '@plumcode/react-events'

type Foo = {
    bar: string;
}

const EmittingComponent = () => {
    // you can emit values using one-type emitter
    const [emitFoo] = useEmitter<Foo>('FOO_EVENT');

    // you can also emit values by passing event type each time 
    const [emitGlobal] = useGlobalEmitter();
    
    const emitRandomNumber = () => emitGlobal<number>('RANDOM_NUMBER', Math.random())
    const emitRandomString = () => emitGlobal<string>('RANDOM_STRING', Math.random().toString(16).slice(2))

    return <>
        <button onClick={() => emitFoo({bar: 'baz'})}>
            Emit foo
        </button>

        <button onClick={() => emitRandomNumber()}>
            Emit some number
        </button>
        <button onClick={() => emitRandomString()}>
            Emit some string
        </button>
    </>
}

const ConsumingComponent = () => {
    const [foo, setFoo] = useState<Foo>();
    const [randomNumber, setRandomNumber] = useState<number>();
    const [randomString, setRandomString] = useState<string>();

    // consume event by passing event type and subscriber function
    useListener<Foo>('FOO_EVENT', (foo) => setFoo(foo));
    useListener<Foo>('RANDOM_NUMBER', setRandomNumber);
    useListener<Foo>('RANDOM_STRING', setRandomString);

    return <>
        <span>Foo: {JSON.stringify(foo)}</span>
        <span>Random number: {randomNumber}</span>
        <span>Random string: {randomString}</span>
    </>
}
```

# @plumcode/react-events
Lightweight & fast event processor for React

**Note, this is beta package. Currently, only functional components are supported.**

## Install
### with npm
`npm i @plumcode/react-events`
### with yarn
`yarn add @plumcode/react-events`

## Usage
Simply put hook into your functional component:

```jsx
import {useEffect} from 'react';
import {useEmitter, useListener} from '@plumcode/react-events'

const EmittingComponent = () => {
    // you can emit values using one-type emitter
    const [emitFoo] = useEmitter('FOO_EVENT');

    // you can also emit values by passing event type each time 
    const [emitGlobal] = useEmitter();
    
    const emitRandomNumber = () => emitGlobal('RANDOM_NUMBER', Math.random())
    const emitRandomString = () => emitGlobal('RANDOM_STRING', Math.random().toString(16).slice(2))

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
    const [foo, setFoo] = useState();
    const [randomNumber, setRandomNumber] = useState();
    const [randomString, setRandomString] = useState();

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

### TypeScript
TypeScript is supported

For example, for type `Foo`
```typescript
type Foo = {
    bar: string
}
```

you can use typed emitter and listener:

```typescript jsx
import {useState} from "react";
import {useEmitter, useListener} from '@plumcode/react-events'

const FooComponent = () => {
    const [foo, setFoo] = useState<Foo | undefined>();
    const [emitFoo] = useEmitter<Foo>('FOO_EVENT');
    const handleFoo = (foo: Foo) => setFoo(foo);
    useListener<Foo>('FOO_EVENT', handleFoo);

    const onEmitButtonClick = () => emitFoo({bar: 'baz'});

    return <>
        <span>{JSON.stringify(foo)}</span>
        <button onClick={onEmitButtonClick}>Emit foo</button>
    </>
}
```

and global, generic emitter:

```typescript jsx
import {useState} from 'react';
import {useEmitter, useListener} from '@plumcode/react-events'

const FooComponent = () => {
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const [randomString, setRandomString] = useState<string>('');

    useListener<number>('RANDOM_NUMBER', setRandomNumber);
    useListener<string>('RANDOM_STRING', setRandomString);
    
    const [emit] = useEmitter();
    const emitRandomNumber = () => emit<number>('RANDOM_NUMBER', Math.random())
    const emitRandomString = () => emit<string>('RANDOM_STRING', Math.random().toString(16).slice(2))
    
    return <>
        <span>Random number: {randomNumber}</span>
        <span>Random string: {randomString}</span>
        
        <button onClick={emitRandomNumber}>
            Emit number
        </button>
        <button onClick={emitRandomString}>
            Emit string
        </button>
    </>
}
```

import {useListener} from "./useListener";
import {useEmitter} from "./useEmitter";

function useGlobalEmitter<T>() {
    console.warn('`useGlobalEmitter` is deprecated and will be removed in future release!')
    return useEmitter<T>();
}

export {
    useGlobalEmitter,
    useEmitter,
    useListener,
}

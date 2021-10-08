# Changelog

## [0.4.4](https://github.com/plumcoding/react-events/releases/tag/v0.4.4) (2021-10-08)

**Fixed bugs:**
- React dependency version now points to earliest as possible

## [0.4.3](https://github.com/plumcoding/react-events/releases/tag/v0.4.3) (2021-10-08)

**Deprecations:**
- `useGlobalEmitter` is now replaced by additional signature of `useEmitter`

**Fixed bugs:**
- React dependency version now points to earliest as possible

## [0.3.1](https://github.com/plumcoding/react-events/releases/tag/v0.3.1) (2021-10-07)

**Fixed bugs:**
- Dropped dependency to `react@17.0.2` allows using other versions of `react`

## [0.3.0](https://github.com/plumcoding/react-events/releases/tag/v0.3.0) (2021-09-23)

**Features:**
- `useEmitter` can be used to emit events with specific topic
- `useGlobalEmitter` can be used to emit any event by specifying topic on each emit call
- `useListener` can be used to listen events produced by `useEmitter` and `useGlobalEmitter`
- Added typings

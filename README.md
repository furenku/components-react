# React Components

- Test
- Video
- ImageContainer
- Gallery

## dev

### install
```
bun i
```

Build is performed on pre-commit hook using husky.


## Usage

### Install

```sh
bun install https://github.com/furenku/components-react.git
```

### Configuration

Add to client project tailwind.config.ts

```ts
export default {
    // ...
    content: [
        // ... keep other directories
        './node_modules/components-react/**/*.{js,ts,jsx,tsx}' // add this
    ],
  // ... 
}
```

### Updating
```sh
bun update components-react
```

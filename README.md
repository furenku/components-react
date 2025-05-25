# Next.js Components

A set of custom components developed for some of my Next.js projects.

- ImageContainer
- ImageCarousel
- Gallery
- Video




## Install

Inside a Next.js project:

```sh
bun install https://github.com/furenku/components-react.git
```


### Tailwind CSS Configuration

**Important**: Add the following to your project's `tailwind.config.js` or `tailwind.config.ts`:


```ts
export default {
    // ...
    content: [
      // ... your existing paths
      './node_modules/components-react/**/*.{js,ts,jsx,tsx}'
    ],
  // ... 
}
```


## Usage

Importing components in a Next.js project:

```ts
import { Video } from 'components-react';

const Wrapper = () => {
  return <Video />;
};

```

### Updating
```sh
bun update components-react
```




## dev

### install
```
bun i
```

Build is performed on pre-commit hook using husky.


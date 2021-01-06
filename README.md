# About

Experimental renderer plugin for Hexo that bundles js/jsx/ts/tsx files through [ESBuild](https://esbuild.github.io/), a javascript transpiler and bundler written in Go that substantially outperforms webpack, parcel & browserify.

# Install

```sh
cd my-blog
yarn add hexo-renderer-esbuild 
# or 
npm install hexo-renderer-esbuild
```

Now any javascript file in source directly will be bundled as part of hexo's build process.

# Configuration

This renderer does not need any configuration and works out of the box.

However, you can pass any configuration options to esbuild through esbuild property in _config.yml.

# Note: 

- ESbuild supports typescript but does not do any type checking. You will need to run tsc for type-checking.

# License

MIT

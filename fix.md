# step to fix issue

## step one

> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. 
  (found in <MyFilter>)
  
fix: not to use `vue.runtime.esm.js`, you can use `vue.esm.js` or `vue.common.js`.  

You can see [https://github.com/vuejs-templates/webpack/issues/215](https://github.com/vuejs-templates/webpack/issues/215) for more info.

## step two

If you use `vue.esm.js` and `webpack.ProvidePlugin`, and you haven't use `import vue from 'vue'` statement:

````
resolve: {
  alias: {
    vue$: 'vue/dist/vue.esm.js'
  }
}
plugins: [
  new webpack.ProvidePlugin({
    Vue: vue
  })
]
````

If not, you can skip this step and step into step 3 and the following content you can ignore.

You can see the line 9243 code of `vue.esm.js`:
````
export default Vue$3;
````
Because this file use the es6 module grammar, so you must use `babel-loader` to convert it into a syntax that the browser can recognize.

fix: use `babel-loader` to parse `vue.esm.js`:
````
{
  test: /\.esm.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve('node_modules', 'vue/dist')
  ]
}
````

## step 3

If you use `vue.common.js`, even if you use `webpack.ProvidePlugin`, everything will be ok.

## step 4

Add `babel-plugin-add-module-exports` package and add this plugin to `.babelrc`. You can read more info at
https://github.com/59naga/babel-plugin-add-module-exports for why use it.
({
  appDir: './',
  baseUrl: './js',
  dir: './build/www-raw',
  fileExclusionRegExp: /^node_modules$/,
  optimizeCss: 'standard',
  inlineText: true,

  pragmaOnSave: {
        excludeHbsParser : true,
        excludeHbs: true,
        excludeAfterBuild: true
  },
  mainConfigFile: 'js/main.js',
  modules: [
    {
      name: "main"
    }
  ]
})

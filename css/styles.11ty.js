
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const cssnano = require('cssnano')
const properties = require('postcss-custom-properties')
const easyImport = require('postcss-easy-import')
const calc = require('postcss-calc')
const fs = require('fs')
const path = require('path')


module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../_includes/postcss/index.css`);
    return {
      permalink: `css/styles.css`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render (data) {
    console.log(data)
    const { rawCss, rawFilepath } = data
    return await postcss([
      easyImport,
      properties(),
      calc(),
      autoprefixer,
      cssnano({
        preset: 'default'
      })
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}
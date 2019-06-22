module.exports = {
  assetsDir: process.env.NODE_ENV === 'production'
    ? 'https://cptspacetoaster.github.io/pkmntcg-decklist/'
    : '/',
  lintOnSave: true,
  configureWebpack: config => {
    return {
      resolve: {
        alias: {
          '@style': '@/assets/styles',
          '@font': '@/assets/fonts',
          '@img': '@/assets/img',
          '@svg': '@/assets/img/svg-compiled',
        }
      }
    }
  },
  devServer: {
  }
}

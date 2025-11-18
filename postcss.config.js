module.exports = {
  plugins: [
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './*.html', // Caminho para o arquivo HTML na raiz
        './js/**/*.js' // Caminho para os arquivos JS na pasta 'js'
      ],
      safelist: [
        /^bg-/, // Para manter todas as classes que começam com 'bg-'
        /^text-/ // Para manter todas as classes que começam com 'text-'
      ]
    })
  ]
}

module.exports = {
  plugins: [
    // Aqui você adicionará o PurgeCSS
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],  // Diretórios onde o PurgeCSS vai buscar as classes usadas
      safelist: [/^bg-/, /^text-/]  // Se você quiser manter algumas classes (por exemplo, classes de fundo ou de texto)
    }),
  ],
};

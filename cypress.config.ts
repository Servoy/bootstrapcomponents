import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      webpackConfig: {
        module: {
            rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }],
        },
      },
    },
    specPattern: "**/*.cy.ts",
  },
});

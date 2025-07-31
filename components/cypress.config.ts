import { defineConfig } from "cypress";
import * as path from 'path';

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      webpackConfig: {
        module: {
            rules: [{
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, './node_modules/@eonasdan/tempus-dominus/dist/css/tempus-dominus.css'),
                    path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css'),
                ],
                use: ['style-loader', 'css-loader'],
            }],
        },
      },
    },
    specPattern: "**/*.cy.ts",
  },
});

import express from 'express';
import bindRoutes from './routes.mjs';

// Initialise Express instance
const app = express();
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Expose the files stored in the public folder
app.use(express.static('public'));
// Expose the files stored in the distribution folder
app.use(express.static('dist'));

// Set up Webpack in dev env
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {

  // conditionally / dynamically import the webpack libraries we need in the dev environment
  // a dynamic import syntax is called as a function and returns a promise
  // use await so that every line is executed in order
  // see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_import

  // destructure the default import and name the variable
  // see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#importing_defaults
  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);

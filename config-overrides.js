// This file overrides webpack config settings in create-react-app
module.exports = function override(config, env) {
  // Override webpack-dev-server configuration to address deprecation warnings
  const devServerOptions = {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      
      return middlewares;
    }
  };

  // This ensures our configuration overrides any internal CRA configuration
  config.devServer = {
    ...config.devServer,
    ...devServerOptions
  };
  
  return config;
};
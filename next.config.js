/** @type {import('next').NextConfig} */
/** @type {import('webpack').Configuration} */
const TerserPlugin = require('terser-webpack-plugin');
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.externals.push("sequelize");
    config.externals.push("sequelize-typescript");
    if (!isServer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer instanceof TerserPlugin) {
          minimizer.options.terserOptions.compress.drop_console = false;
        }
      });
      config.module.rules.push({
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"],
          },
        },
      });
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/profile/:userID",
        destination: "/profile/:userID/stats/overview", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;

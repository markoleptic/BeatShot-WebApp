/** @type {import('next').NextConfig} */
/** @type {import('webpack').Configuration} */

const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.externals.push("sequelize");
		config.externals.push("sequelize-typescript");
		if (!isServer) {
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
				destination: "/profile/:userID/stats/overview",
				permanent: true,
			},
			{
				source: "/login/steam",
				destination: "/api/login/steam",
				permanent: true,
			},
			{
				source: "/steamlink",
				destination: "/api/steamlink",
				permanent: true,
			},
			{
				source: "/sendfeedback",
				destination: "/api/sendfeedback",
				permanent: true,
			},
		];
	},
	output: "standalone",
};
module.exports = nextConfig;

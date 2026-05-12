/** @type {import('next').NextConfig} */
/** @type {import('webpack').Configuration} */

const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
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
				source: "/sendfeedback",
				destination: "/api/sendfeedback",
				permanent: true,
			},
		];
	},
	output: "standalone",
};
module.exports = nextConfig;

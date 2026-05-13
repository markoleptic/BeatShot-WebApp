import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
	images: {
		qualities: [75, 100],
	},
};

export default nextConfig;

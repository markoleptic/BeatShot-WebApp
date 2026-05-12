import React from "react";

import { Metadata } from "next";
import { Montserrat, Roboto, Roboto_Mono } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import SEO from "@/components/SEO";

import "@/styles/Global.scss";
import "@/styles/Utility.scss";

export const metadata: Metadata = SEO({
	title: "BeatShot",
	type: "website",
	isRoot: true,
});

const montserrat = Montserrat({
	weight: ["400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
	fallback: ["--font-roboto"],
});

const roboto = Roboto({
	weight: ["400", "500", "700", "900"],
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
	fallback: ["--font-montserrat"],
});

const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${montserrat.variable} ${roboto.variable} ${roboto_mono.variable}`}>
			<body>
				<script
					data-goatcounter="https://beatshot.goatcounter.com/count"
					async
					src="//gc.zgo.at/count.js"
				></script>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}

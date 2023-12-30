import Navbar from "../components/Core/NavBar";
import Footer from "../components/Core/Footer";
import { AuthProvider } from "../components/Auth/AuthContext";
import { Metadata } from "next";
import SEO from "@/components/SEO";
import { Roboto, Roboto_Mono, Montserrat } from "next/font/google";
import React from "react";
import "./globals.css";

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
				<AuthProvider>
					<Navbar />
					{children}
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}

"use client";
import { useState, useEffect, useRef, RefObject } from "react";

let options = {
	root: null,
	rootMargin: "-71px 0px 0px 0px",
	trackVisibility: true,
	threshold: 0,
	delay: 100,
};

export default function useOnScreen(ref: RefObject<Element>) {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const [isOnScreen, setIsOnScreen] = useState(false);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting), options);
	}, []);

	useEffect(() => {
		const node = ref?.current;

		if (!node) return;

		observerRef?.current?.observe(node);

		return () => {
			observerRef?.current?.disconnect();
		};
	}, [ref]);

	return isOnScreen;
}

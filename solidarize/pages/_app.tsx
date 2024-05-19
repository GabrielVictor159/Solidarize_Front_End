import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/Domain/config/fonts";
import {useRouter} from 'next/router';
import "@/styles/globals.css";
import { SizeProportionProvider } from "@/layouts/sizeProportionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/Provider/Store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

	return (
		<>
		<Provider store={store}>
		<SizeProportionProvider>
			<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<Component {...pageProps} />
			</NextThemesProvider>
		</NextUIProvider>
		</SizeProportionProvider>
		<ToastContainer />
		</Provider>
		</>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};

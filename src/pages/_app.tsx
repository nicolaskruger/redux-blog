import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../store";
import { NavBar } from "../components/navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </Provider>
  );
}

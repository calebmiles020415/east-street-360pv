// External Dependencies
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Internal Dependencies
import "../../styles/globals.css";
import { AppLayout } from "../components/layouts";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppLayout>	
			<Component {...pageProps} />
			<ToastContainer
				position="bottom-center"
				autoClose={false}
			/>
		</AppLayout>
	);
}

export default MyApp;

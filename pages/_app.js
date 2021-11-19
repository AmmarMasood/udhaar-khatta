import "../styles/globals.scss";
import "antd/dist/antd.css";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <UserMenuProvider> */}
      <Component {...pageProps} />
      {/* </UserMenuProvider> */}
    </AuthProvider>
  );
}

export default MyApp;

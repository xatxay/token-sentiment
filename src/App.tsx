import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TwitterHomePage from "./homepage/twitterHomePage";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "@emotion/react";
import GlobalStyle from "./globalStyle/globalStyle";
import HomepageHeader from "./homepage/homepageHeader";
import YoutubeHomePage from "./homepage/youtubeHomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TiktokHomepage from "./homepage/tiktokHomepage";

ReactModal.setAppElement("#root");
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Global styles={GlobalStyle} />
          <HomepageHeader />
          <Routes>
            <Route path="/" element={<Navigate to="/twitter" replace />} />
            <Route path="/twitter" element={<TwitterHomePage />} />
            <Route path="/youtube" element={<YoutubeHomePage />} />
            <Route path="/tiktok" element={<TiktokHomepage />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;

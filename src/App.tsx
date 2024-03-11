import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TwitterHomePage from "./homepage/twitterHomePage";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Global } from "@emotion/react";
import GlobalStyle from "./globalStyle/globalStyle";
import YoutubeHomePage from "./homepage/youtubeHomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TiktokHomepage from "./homepage/tiktokHomepage";
import RedditHomePage from "./homepage/redditHomepage";
import Login from "./login/loginPage";
import { useState } from "react";
import AuthenticatedRoute from "./login/authenticateRoute";

ReactModal.setAppElement("#root");
const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Global styles={GlobalStyle} />
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/"
              element={
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <Navigate to="/youtube" replace />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/youtube"
              element={
                <YoutubeHomePage setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/twitter"
              element={
                <TwitterHomePage setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/tiktok"
              element={
                <TiktokHomepage setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/reddit"
              element={
                <RedditHomePage setIsAuthenticated={setIsAuthenticated} />
              }
            />
            {/* <Route
              path="/polls"
              element={
                <PollsHomepage setIsAuthenticated={setIsAuthenticated} />
              }
            /> */}
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

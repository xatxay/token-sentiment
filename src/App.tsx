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
import { useEffect, useState } from "react";
import AuthenticatedRoute from "./login/authenticateRoute";

ReactModal.setAppElement("#root");
const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [twitterName, setTwitterName] = useState("");
  const [twitterPfp, setTwitterPfp] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const handleRowClicked = (coin: string) => {
    selectedCoin === coin ? setSelectedCoin(null) : setSelectedCoin(coin);
  };

  useEffect(() => {
    console.log("isauthenticated: ", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Global styles={GlobalStyle} />
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  setTwitterName={setTwitterName}
                  setTwitterPfp={setTwitterPfp}
                />
              }
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
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <YoutubeHomePage
                    twitterName={twitterName}
                    twitterPfp={twitterPfp}
                    handleRowClicked={handleRowClicked}
                    selectedCoin={selectedCoin || ""}
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/twitter"
              element={
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <TwitterHomePage
                    twitterName={twitterName}
                    twitterPfp={twitterPfp}
                    handleRowClicked={handleRowClicked}
                    selectedCoin={selectedCoin || ""}
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/tiktok"
              element={
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <TiktokHomepage
                    twitterName={twitterName}
                    twitterPfp={twitterPfp}
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/reddit"
              element={
                <AuthenticatedRoute isAuthenticated={isAuthenticated}>
                  <RedditHomePage
                    twitterName={twitterName}
                    twitterPfp={twitterPfp}
                  />
                </AuthenticatedRoute>
              }
            />
            {/* <Route
              path="/polls"
              element={
                <PollsHomepage twitterName={twitterName} twitterPfp={twitterPfp} />
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

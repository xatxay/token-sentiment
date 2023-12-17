import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Homepage from "./homepage/homepage";
import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactModal.setAppElement("#root");
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Homepage />
      </QueryClientProvider>
    </>
  );
}

export default App;

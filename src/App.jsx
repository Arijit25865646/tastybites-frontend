import AppRoutes from "./Routes/Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </>
  );
}

export default App;
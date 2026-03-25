import "@/app/styles/App.css";
import {StoreProvider} from "./providers/StoreProvider";
import {DrawPage} from "@/pages/DrawPage.tsx";

function App() {
  return (
    <StoreProvider>
      <DrawPage/>
    </StoreProvider>
  );
}

export default App;

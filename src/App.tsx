import { BrowserRouter, Route, Routes } from "react-router-dom";
import Folders from "./pages/Folders";
import { PlayerProvider } from "./player/PlayerProvider";
import { SozaiProvider } from "./sozai/SozaiProvider";

const App: React.FC = () => {
  return (
    <SozaiProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Folders />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </SozaiProvider>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { MainLayou } from "./layout/main-layou";
import { Home } from "./pages/home/home";
import { SingIn } from "./pages/sing-in/sing-in";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="app" element={<MainLayou />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

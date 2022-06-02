import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { HashRouter as Router } from "react-router-dom";
import "./globalCss/resets.css";
import "./globalCss/variables.css";
import ToogleTheme from "./components/toogleTheme/ToogleTheme";
import ShopRoutes from "./Routes/ShopRoutes";
import BackgroundThemeHelper from "./components/backgroundThemeHelper/BackgroundThemeHelper";
import { Theme } from "./sharedTypes/theme";
const App = () => {
  const [theme, setTheme] = useState<Theme>("light");
  console.log(theme);
  return (
    <div data-theme={theme}>
      <Router>
        <Navbar />
        <ShopRoutes />
        <ToogleTheme setTheme={setTheme} theme={theme} />
        <BackgroundThemeHelper />
      </Router>
    </div>
  );
};

export default App;

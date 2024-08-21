import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Dapps from "./pages/Dapps";


interface AppRouterProps {
 
  _setWalletOpen: (value: boolean) => void;
}


const AppRouter: React.FC<AppRouterProps> = ({ _setWalletOpen }) => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dapps  _setWalletOpen={_setWalletOpen} />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;
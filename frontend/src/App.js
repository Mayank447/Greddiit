import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './Pages/Signup.js';
import LoginPage from './Pages/Login.js';
import OpeningPage from './Pages/OpeningPage.js';
import ProfilePage from './Pages/ProfilePage.js';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import MySubGreddiits from "./Pages/MySubGreddiitPage.js";
import SubGreddiitPage from "./Pages/SubGreddiitPage.js";
import Report from "./Components/SubGreddiit/Report/Report.js";
import GreddiitPage from "./Pages/GreddiitPage.js";
import SavedPosts from "./Pages/SavedPosts.js";
import Greddiits from "./Pages/Greddiits.js";

function App(){
  return(
  <>
  {/* <QueryClientProvider client={queryClient}> */}
    <div className="centerElements">
      <div className='Width'>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/home" element={<OpeningPage/>} />
              <Route path="/" element={<OpeningPage/>} />
              <Route path="/Login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignupPage/>} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/profilepage" element={<ProfilePage />} />
              <Route path="/mySubGreddiit" element={<MySubGreddiits />} />
              <Route path="/SubGreddiitPage" element={<SubGreddiitPage />} />
              <Route path="/report" element={<Report reported="may" reported_by="tanno" text="goel" concern="mayank"/>} />
              <Route path="/greddiitpage" element={<GreddiitPage />} />
              <Route path="/greddiits" element={<Greddiits />} />
              <Route path="/savedPosts" element={<SavedPosts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  {/* </QueryClientProvider> */}
  </>
  )
}

export default App;

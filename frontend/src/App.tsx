import Container from './container.tsx'
import LoginPage from './pages/auth_pages/login_page/LoginPage.tsx'
import HomePage from './pages/home_page/Home.tsx'
import SignupPage from './pages/auth_pages/signup_page/SignupPage.tsx'
import LandingPage from './pages/landing_page/LandingPage.tsx'
import NotFound from './pages/404/NotFound.tsx'
import WaitlistPage from './pages/auth_pages/waitlist_page/WaitlistPage.tsx'
// import DashBoard from './pages/DashBoard.tsx'
import {Routes, Route} from 'react-router';
import {AuthProvider} from './context/AuthContext.tsx'

// Pre-launch waiting-list mode: set VITE_WAITLIST_MODE=on to swap the signup
// and login routes for the waiting-list sheet and hide the auth nav chips.
// Flip the flag off (and redeploy) the day real accounts open. See WAITLIST.md.
const WAITLIST_MODE = import.meta.env.VITE_WAITLIST_MODE === 'on'

function App() {
  return (
    <>

    <AuthProvider>

    
        <Container>
    
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/login"
                element={WAITLIST_MODE ? <WaitlistPage /> : <LoginPage />}
              />
              <Route
                path="/signup"
                element={WAITLIST_MODE ? <WaitlistPage /> : <SignupPage />}
              />
              <Route path="/home" element={<HomePage />}  />
              <Route path="*" element={<NotFound />} />
            </Routes>

        </Container>


    </AuthProvider>

    </>
  )
}

export default App

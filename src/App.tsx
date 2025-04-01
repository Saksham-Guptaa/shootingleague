import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import DashboardRouter from "./components/dashboard/DashboardRouter";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import { useEffect } from "react";
import Pricing from "./components/pages/pricing";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import { useLocation } from "react-router-dom";
import ShootingRanges from "./components/pages/ranges";
import Athletes from "./components/pages/shooters";
import ParallaxScrollPage from "./components/pages/media";
import ContactUs from "./components/pages/contact";
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("Private Route - User:", user);
    console.log("Private Route - Loading:", loading);
  }, [user, loading]);

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranges" element={<ShootingRanges />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/shooters" element={<Athletes />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/media" element={<ParallaxScrollPage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardRouter />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;

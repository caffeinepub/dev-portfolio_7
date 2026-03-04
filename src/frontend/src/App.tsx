import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useCallback, useState } from "react";

import BackgroundEffect from "./components/BackgroundEffect";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";

import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";

// ─── Route definitions ───────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/$id",
  component: ProjectDetail,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  projectDetailRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── Root Layout ─────────────────────────────────────────────────────────────

function RootLayout() {
  return (
    <>
      <BackgroundEffect />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderDone = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only (CSS hides on touch) */}
      <Cursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* First-load splash */}
      {loading && <Loader onDone={handleLoaderDone} />}

      {/* Router */}
      <RouterProvider router={router} />
    </>
  );
}

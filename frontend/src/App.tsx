import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clothing from './pages/Clothing';
import Mehndi from './pages/Mehndi';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const clothingRoute = createRoute({ getParentRoute: () => rootRoute, path: '/clothing', component: Clothing });
const mehndiRoute = createRoute({ getParentRoute: () => rootRoute, path: '/mehndi', component: Mehndi });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutUs });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });

const routeTree = rootRoute.addChildren([homeRoute, clothingRoute, mehndiRoute, aboutRoute, contactRoute]);
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

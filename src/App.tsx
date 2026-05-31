import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "./components/error-boundary";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Loader } from "./components/loader";
import { Box } from "./components/box/Box";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const ComplementosPage = lazy(() => import("./pages/ComplementosPage").then((m) => ({ default: m.ComplementosPage })));

type Page = "home" | "complementos";

function getPageFromHash(): Page | null {
  const hash = window.location.hash.replace("#", "");
  if (hash === "home" || hash === "complementos") return hash;
  return null;
}

function App() {
  const [page, setPage] = useState<Page>(() => {
    const p = getPageFromHash();
    if (p) return p;
    window.location.hash = "home";
    return "home";
  });

  useEffect(() => {
    const onHashChange = () => {
      const p = getPageFromHash();
      if (p) {
        setPage(p);
      } else {
        window.location.hash = "home";
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = `edukuk | ${page}`;
  }, [page]);

  const navigate = (p: Page) => {
    if (p === page) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = p;
    }
  };

  return (
    <ErrorBoundary onReset={() => { window.location.hash = "home"; }}>
      <Navbar currentPage={page} onNavigate={navigate} />
      <Box style={{ flex: 1 }}>
        <Suspense fallback={<Box style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader size="lg" /></Box>}>
          {page === "home" ? (
            <HomePage key="home" onNavigate={navigate} />
          ) : (
            <ComplementosPage key="complementos" />
          )}
        </Suspense>
      </Box>
      <Footer onNavigate={navigate} />
    </ErrorBoundary>
  );
}

export default App;

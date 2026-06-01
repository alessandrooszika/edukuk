import { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "./components/error-boundary";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Loader } from "./components/loader";
import { Box } from "./components/box/Box";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const ComplementosPage = lazy(() => import("./pages/ComplementosPage").then((m) => ({ default: m.ComplementosPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

type Page = "home" | "complementos" | "404";

function getPageFromHash(): Page {
  const hash = window.location.hash.replace("#", "");
  if (hash === "" || hash === "home") return "home";
  if (hash === "complementos") return "complementos";
  return "404";
}

function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const descriptions: Record<Page, string> = {
      home: "edukuk — Biblioteca de componentes UI moderna con React 19, TypeScript y CSS Modules.",
      complementos: "Explorá los más de 50 componentes UI de edukuk: botones, inputs, layouts, displays, overlays y más.",
      "404": "Página no encontrada — edukuk",
    };
    const title = page === "404" ? "edukuk | 404" : `edukuk | ${page}`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[page]);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", descriptions[page]);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", descriptions[page]);
  }, [page]);

  const navigate = (p: Page) => {
    if (p === "404") return;
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
          ) : page === "complementos" ? (
            <ComplementosPage key="complementos" />
          ) : (
            <NotFoundPage key="404" />
          )}
        </Suspense>
      </Box>
      <Footer onNavigate={navigate} />
    </ErrorBoundary>
  );
}

export default App;

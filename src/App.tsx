import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "./components/error-boundary";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Loader } from "./components/loader";
import { Box } from "./components/box/Box";
import { HomePage } from "./pages/HomePage";
import { OnlineBanner } from "./components/online-banner";

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
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const descKey = `app.meta_description_${page}` as const;
    const desc = t(descKey);
    const title = `edukuk | ${t(`app.title_${page}`)}`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", desc);
  }, [page, i18n.language, t]);

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
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar currentPage={page} onNavigate={navigate} />
      <OnlineBanner />
      <main id="main-content" style={{ flex: 1 }}>
        <Suspense fallback={<Box style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader size="lg" /></Box>}>
          {page === "home" ? (
            <HomePage key="home" onNavigate={navigate} />
          ) : page === "complementos" ? (
            <ComplementosPage key="complementos" />
          ) : (
            <NotFoundPage key="404" />
          )}
        </Suspense>
      </main>
      <Footer onNavigate={navigate} />
    </ErrorBoundary>
  );
}

export default App;

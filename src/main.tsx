import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { useAuthStore } from "./stores/authStore.ts";
import { useCatalogStore } from "./stores/catalogStore.ts";

function AppWithAuth() {
  const initialize = useAuthStore((state) => state.initialize);
  const bootstrapped = useAuthStore((state) => state.bootstrapped);
  const fetchProducts = useCatalogStore((state) => state.fetchProducts);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!bootstrapped) return;
    fetchProducts({ silent: catalogHasData() });
  }, [bootstrapped, fetchProducts]);

  return <App />;
}

function catalogHasData() {
  return useCatalogStore.getState().products.length > 0;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWithAuth />
    </Provider>
  </StrictMode>
);

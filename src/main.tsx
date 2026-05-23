import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { useAuthStore } from "./stores/authStore.ts";
import { useCatalogStore } from "./stores/catalogStore.ts";
import { isSupabaseConfigured } from "./lib/supabase/config.ts";

function AppWithAuth() {
  const initialize = useAuthStore((state) => state.initialize);
  const fetchProducts = useCatalogStore((state) => state.fetchProducts);
  const isInitialized = useCatalogStore((state) => state.isInitialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isSupabaseConfigured() || isInitialized) return;
    fetchProducts();
  }, [fetchProducts, isInitialized]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppWithAuth />
    </Provider>
  </StrictMode>
);

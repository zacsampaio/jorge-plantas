import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { Confirmed } from "./pages/Confirmed/index";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmed" element={<Confirmed />} />
      </Route>
    </Routes>
  );
}

import { Outlet } from "react-router-dom";
import { LayoutContainer, MainContent } from "./styled";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SupabaseConfigBanner } from "../../components/SupabaseConfigBanner";


export function DefaultLayout () {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <SupabaseConfigBanner />
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
}

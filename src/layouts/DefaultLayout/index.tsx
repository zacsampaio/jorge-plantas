import { Outlet } from "react-router-dom";
import { LayoutContainer, MainContent } from "./styled";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";


export function DefaultLayout () {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
}

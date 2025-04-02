import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styled";
import { Header } from "../../components/Header";


export function DefaultLayout () {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}

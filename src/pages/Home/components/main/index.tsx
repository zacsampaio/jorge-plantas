import { CardCatalag } from "./components/productCatalog";
import { HeaderMainCatalog, HeaderMainContainer } from "./styled";
import { products } from "../../../../data/products";

export function HeaderMain() {

  return (
    <HeaderMainContainer>
      <h1>Nossas plantas</h1>
      <HeaderMainCatalog>
        {products.map((product) => {
          return (
            <CardCatalag
              key={product.id}
              product={product}
            />
          );
        })}
      </HeaderMainCatalog>
    </HeaderMainContainer>
  );
}

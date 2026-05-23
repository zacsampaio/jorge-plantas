import { CountButton } from "../countButton";
import { CardCartComponents, CardCartComponentsButtons } from "./styled";
import { RemoveButton } from "../removeButton";
import { ProductsType } from "../../redux/cart/types";
import { ProductImage } from "../ProductImage";

interface CardCartProps {
  product: ProductsType;
}

export function CardCart({ product} : CardCartProps) {
  return (
    <CardCartComponents>
      <ProductImage
        name={product.name}
        imagePath={product.imagePath}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <CardCartComponentsButtons>
          <CountButton
            key={product.id}
            product={product}
          />
          <RemoveButton 
            product={product}
          />
        </CardCartComponentsButtons>
      </div>
      <p>R$ {product.price.toFixed(2)}</p>
    </CardCartComponents>
  );
}

import { CountButton } from "../countButton";
import { CardCartComponents, CardCartComponentsButtons } from "./styled";
import { RemoveButton } from "../removeButton";
import { ProductsType } from "../../redux/cart/types";

interface CardCartProps {
  product: ProductsType;
}

export function CardCart({ product} : CardCartProps) {

  const getImage = (name:string) => {
    const imageUrl = `/assets/plants/${name}.jpg`;

    return imageUrl || "/assets/plants/default.jpg";
  };

  return (
    <CardCartComponents>
      <img src={getImage(product.name)} />
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

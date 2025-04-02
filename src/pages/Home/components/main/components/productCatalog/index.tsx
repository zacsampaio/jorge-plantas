import { Cart } from "../../../../../../components/cartCatalog";
import {
  CardCatalagComponents,
  TagDescription,
  TagsComponents,
  TagValue,
  TagValueSpan,
} from "./styles";
import { Tag } from "../tag";
import { CountButton } from "../../../../../../components/countButton";
import { ProductsType } from "../../../../../../redux/cart/types";

interface CardCatalogProps {
  product: ProductsType
}

export function CardCatalag({ product }: CardCatalogProps) {
  const getImage = (name: string) => {
    const imageUrl = `/assets/plants/${name}.jpg`;
    return imageUrl || "/assets/plants/default.jpg";
  };

  

  return (
    <CardCatalagComponents>
      <img src={getImage(product.name)} />
      <TagsComponents>
        {product.tags?.map((tag, index) => (
          <Tag key={index} title={tag} />
        ))}
      </TagsComponents>
      <h3>{product.name}</h3>
      <TagDescription>{product.description}</TagDescription>
      <TagValue>
        <p>
          R$ <TagValueSpan>{product.price.toFixed(2)}</TagValueSpan>
        </p>
        <CountButton
          product={product}
        />
        <Cart $color="gray-100" $background="green-500" />
      </TagValue>
    </CardCatalagComponents>
  );
}

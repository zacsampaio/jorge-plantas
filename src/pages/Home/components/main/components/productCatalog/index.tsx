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
import { ProductImage } from "../../../../../../components/ProductImage";

interface CardCatalogProps {
  product: ProductsType;
}

export function CardCatalag({ product }: CardCatalogProps) {
  return (
    <CardCatalagComponents>
      <ProductImage
        name={product.name}
        imagePath={product.imagePath}
        alt={product.name}
        loading="lazy"
      />
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

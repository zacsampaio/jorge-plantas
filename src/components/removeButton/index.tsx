import { useDispatch } from "react-redux";
import { RemoveButtonComponents, RemoveButtonStyled} from "./styled";
import { Trash } from "phosphor-react";
import { ProductsType } from "../../redux/cart/types";
import { removeProduct } from "../../redux/cart/slice";

interface RemoveButtonProps {
  product: ProductsType
}

export function RemoveButton({ product }: RemoveButtonProps){
  const dispatch = useDispatch()

  function handleRemoveProduct(){
    dispatch(removeProduct(product))
  }

  return (
    <RemoveButtonComponents>
      <RemoveButtonStyled onClick={handleRemoveProduct}>
        <Trash size={16}/>
        <h5>Remover</h5>
      </RemoveButtonStyled>
    </RemoveButtonComponents>
  )
}
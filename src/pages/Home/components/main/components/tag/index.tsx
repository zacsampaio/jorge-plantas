import { TagComponents } from "./styles";

interface TagProps {
  title: string
}

export function Tag({ title }: TagProps){

  return (
    <TagComponents>
      <p>{title}</p>
    </TagComponents>
  )
}
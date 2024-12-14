import { useCardStateContext } from "../contexts/CardContext"
import Card from "./Card"

function CardSection() {

  const {
    width,
    height,
    round,
    imageUrl,
    isOutlineMode
  } = useCardStateContext()

  return (
    <section className="relative h-screen sm:h-full sm:p-4">
      <div className="h-full bg-base-200 rounded-xl flex justify-center items-center">
        <Card 
          width={ width }
          height={ height }
          round={ round }
          imageUrl={ imageUrl }
          isOutlineMode={ isOutlineMode }
        />
      </div>
    </section>
  )
}

export default CardSection
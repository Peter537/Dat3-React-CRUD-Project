import React from "react";
import Card from "./Card";
// https://getbootstrap.com/docs/5.3/components/card/#grid-cards
function CardGrid({ cards, click, button_text }) {
  return (
    <div className="row row-cols-2 row-cols-md-4 g-5">
      {cards.map((card, index) => {
        return (
          <div className="col" key={index}>
            {" "}
            <Card
              key={crypto.getRandomValues(new Uint32Array(1))[0]}
              data={card}
              click={() => click(card.id)}
              button_text={button_text}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardGrid;

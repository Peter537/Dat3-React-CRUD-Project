import React from "react";
import Card from "./Card";

// https://getbootstrap.com/docs/5.3/components/card/#grid-cards
function CardGrid({ cards, click, button_text, max_cards = 100 }) {
  return (
    <div
      className="row row-cols-2 row-cols-sm-4 g-2 justify-content-start"
      style={{ minWidth: "var(--bs-breakpoint-xl)" }}
    >
      {cards.slice(0, max_cards).map((card, index) => {
        return (
          <div className="col col-sm-auto" key={index}>
            <Card
              key={index}
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

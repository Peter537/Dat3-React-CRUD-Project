import React from "react";
import Card from "./Card";
import "https://code.jquery.com/jquery-3.7.1.min.js";
import "https://code.jquery.com/ui/1.13.2/jquery-ui.min.js";

// https://getbootstrap.com/docs/5.3/components/card/#grid-cards
function CardGrid({ cards, click, button_text, max_cards = 100 }) {
  $(".card-grid").sortable({
    opacity: 0.9,
    placeholder: "sortable-placeholder",
    tolerance: "pointer",
  });
  return (
    <div
      className="row row-cols-2 row-cols-sm-4 g-2 justify-content-start card-grid"
      style={{ minWidth: "var(--bs-breakpoint-xl)" }}
      id="card-grid"
    >
      {(cards?.slice(0, max_cards) || [{}]).map((card, index) => {
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

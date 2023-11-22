import React from "react";
import Card from "./Card";
// https://getbootstrap.com/docs/5.3/components/card/#grid-cards
function CardGrid({ cards }) {
  return (
    <div className="row row-cols-2 row-cols-md-4 g-2">
      {cards.map((card, index) => {
        return (
          <div className="col" key={index}>
            {" "}
            <Card key={index} {...card} />
          </div>
        );
      })}
    </div>
  );
}

export default CardGrid;

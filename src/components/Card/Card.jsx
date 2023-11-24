import img from "./placeholder.png";
import { HealthIcon, AttackIcon, ManaIcon } from "./CardIcons";
import "./Card.css";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
></link>;

function Card({ data, click, button_text }) {
  return (
    <>
      <div
        className="card border"
        style={{
          width: "18rem",
          boxShadow: "0px 2px 2px 1.2px black",
          minHeight: "100%",
        }}
      >
        <div>
          <img src={data?.image_url || img} className="card-img-top img"></img>
        </div>
        <div
          className="card-img-overlay"
          style={{ height: "10%", marginTop: "-5%" }}
        >
          <div className="text-end id-number number">
            <label>{data?.id || NaN}</label>
          </div>
          <div className="responsive-background">
            {(Array(data?.cost).fill(1) || [1, 2]).map((index) => {
              return (
                <ManaIcon key={crypto.getRandomValues(new Uint32Array(1))[0]} />
              );
            })}
          </div>
        </div>
        <div className="mt-2 number">
          <HealthIcon />
          <label className="ms-1">{data?.health || 0}</label>

          <AttackIcon />
          <label>{data?.attack || 0}</label>
        </div>
        <div className="card-body">
          <h5 className="card-title">{data?.name || "Card title"}</h5>
          <p className="card-text text">
            {data?.desc ||
              "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
        </div>
        <button
          className="btn btn-cstm-primary"
          onClick={click || (() => alert("No actions"))}
        >
          {button_text || "Go somewhere"}
        </button>
      </div>
    </>
  );
}

export default Card;

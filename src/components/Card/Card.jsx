import img from "./placeholder.svg";
import { HealthIcon, AttackIcon, ManaIcon } from "./CardIcons";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
></link>;

function Card({ data }) {
  return (
    <>
      <div
        className="card border-dark"
        style={{ width: "18rem", boxShadow: "1px 1px 1px 1px black" }}
      >
        <img
          src={data?.image_url || img}
          className="card-img-top"
          alt="..."
        ></img>
        <div className="card-img-overlay" style={{ height: "10%" }}>
          <ManaIcon />
        </div>
        <div className="mt-2">
          <HealthIcon />
          <label>{data?.health || 0}</label>

          <AttackIcon />
          <label>{data?.attack || 0}</label>
        </div>

        <div className="card-body">
          <h5 className="card-title">{data?.title || "Card title"}</h5>
          <p className="card-text">
            {data?.desc ||
              "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          <button
            className="btn btn-primary"
            onClick={data?.click || (() => alert("No actions"))}
          >
            {data?.button_text || "Go somewhere"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;

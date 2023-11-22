import img from "./placeholder.svg";

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
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;

import img from "./placeholder.svg";
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
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
          <label>{data?.health || 0}</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-scissors"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
          </svg>
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

import React from "react";
import "./TrendingCard.css";

function TrendingCard({ image, name, rank }) {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="card">
      <h3>{"#" + rank}</h3>
      <h4>{name}</h4>
    </div>
  );
}

export default TrendingCard;

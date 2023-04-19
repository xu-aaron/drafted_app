import React from "react";
import "./TrendingReel.css";

import TrendingCard from "./TrendingCard";

function TrendingReel() {
  return (
    <div>
      <h2 className="trendingTitle">Trending Athletes (Northeast Region)</h2>
      <div className="trendingReel">
        <TrendingCard image="/assets/maxclark.jpeg" name="Max Clark" rank="1" />
        <TrendingCard image="/assets/mickey.jpeg" name="Mickey Williams" rank="2" />
        <TrendingCard image="/assets/djery.jpeg" name="Djery Baptiste" rank="3" />
        <TrendingCard image="/assets/gabby.jpeg" name="Gabby Chan" rank="4" />
      </div>
    </div>
  );
}

export default TrendingReel;
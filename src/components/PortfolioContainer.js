import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ bought, onDeleteStocks }) {
  const portfolioList = bought.map((stock) => {
    return (
      <Stock key={stock.id} stock={stock} onStockHandle={onDeleteStocks} />
    );
  });
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioList}
    </div>
  );
}

export default PortfolioContainer;

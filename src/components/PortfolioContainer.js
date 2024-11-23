import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.length > 0 ? (
        portfolio.map((stock) => (
          <Stock 
            key={stock.id} 
            stock={stock} 
            onStockClick={onStockClick} 
          />
        ))
      ) : (
        <p>Your portfolio is empty. Start buying stocks!</p>
      )}
    </div>
  );
}

export default PortfolioContainer;
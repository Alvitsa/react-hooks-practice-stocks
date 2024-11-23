import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]); // Store all stocks fetched from the API
  const [portfolio, setPortfolio] = useState([]); // Store purchased stocks
  const [sortCriteria, setSortCriteria] = useState(null); // Sorting criteria: Alphabetically or by Price
  const [filter, setFilter] = useState(""); // Filter type (e.g., Tech, Finance)

  // Fetch stocks data from db.json
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stocks.");
        }
        return response.json();
      })
      .then((data) => setStocks(data))
      .catch((error) => console.error("Error fetching stocks:", error));
  }, []);

  // Add a stock to the portfolio
  const handleBuyStock = (stock) => {
    if (!portfolio.some((item) => item.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  // Remove a stock from the portfolio
  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  };

  // Sort stocks based on criteria
  const sortStocks = (stocksToSort) => {
    if (sortCriteria === "Alphabetically") {
      return [...stocksToSort].sort((a, b) => a.ticker.localeCompare(b.ticker));
    }
    if (sortCriteria === "Price") {
      return [...stocksToSort].sort((a, b) => a.price - b.price);
    }
    return stocksToSort;
  };

  // Filter stocks based on type
  const filterStocks = () => {
    const filtered = filter
      ? stocks.filter((stock) => stock.type === filter)
      : stocks;
    return sortStocks(filtered);
  };

  return (
    <div>
      {/* Search Bar for sorting and filtering */}
      <SearchBar setSortCriteria={setSortCriteria} setFilter={setFilter} />

      <div className="row">
        {/* StockContainer: Display all stocks */}
        <div className="col-8">
          <StockContainer
            stocks={filterStocks()}
            onStockClick={handleBuyStock}
          />
        </div>

        {/* PortfolioContainer: Display purchased stocks */}
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onStockClick={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
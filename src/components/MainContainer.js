import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
const [stocks, setStocks] = useState([])
const [bought, setBought] = useState([])
const [sortBy, setSortBy] = useState("")
const [filterBy, setFilterBy] = useState("Tech")

useEffect(() => {
  fetch("http://localhost:3001/stocks")
  .then(resp => resp.json())
  .then(data => setStocks(data))
}, [])

function handleBoughtStocks (boughtStock) {
  const portfolioStock = bought.find(stock =>
    stock.id === boughtStock.id)
  if (!portfolioStock) {
    setBought([...bought, boughtStock])
  }
}

function handleDeleteStocks (deleteStock) {
  const updatedStocks = bought.filter(stock => {
    return stock.id !== deleteStock.id
  })
  setBought(updatedStocks)
}

function handleSortChange (e) {
  setSortBy(e.target.value)
}

if (sortBy === "Alphabetically") {
  stocks.sort((stock1, stock2) => {
    if (stock1.name < stock2.name) {return -1}
    if (stock1.name > stock2.name) {return 1}
    return 0;
  })
} else if (sortBy === "Price") {
  stocks.sort((stock1, stock2) => {
    return stock1.price-stock2.price
  })
}

function handleFilterChange (e) {
  setFilterBy(e.target.value)
}

const filteredStocks = stocks.filter(stock => {
  return stock.type === filterBy
})

  return (
    <div>
      <SearchBar sortBy={sortBy} onSortChange={handleSortChange} onFilterChange={handleFilterChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBoughtStocks={handleBoughtStocks}/>
        </div>
        <div className="col-4">
          {<PortfolioContainer bought={bought} onDeleteStocks={handleDeleteStocks}/>}
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

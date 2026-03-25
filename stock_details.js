function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);

  if (stock) {
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;

    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}
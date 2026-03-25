function renderPortfolio(user, stocks) {
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';

  user.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const btn = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    btn.innerText = 'View';
    btn.setAttribute('id', symbol);

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(btn);
  });

  // Event delegation for stock view
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}
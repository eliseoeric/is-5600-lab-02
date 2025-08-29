document.addEventListener('DOMContentLoaded', () => {
  // Parse provided JSON strings from data/*.js
  const users  = JSON.parse(userContent);
  const stocks = JSON.parse(stockContent);

  // Optional: map tickers to different logo filenames if your /logos uses another name
  const SYMBOL_TO_LOGO = {
    // 'FB': 'META',
    // 'BRK.B': 'BRK-B',
    // 'BRK.A': 'BRK-A',
  };

  // ----- DOM -----
  const userListEl  = document.querySelector('.user-list');
  const portfolioEl = document.querySelector('.portfolio-list');
  const deleteBtn   = document.querySelector('#btnDelete'); // matches your index.html
  const saveBtn     = document.querySelector('#btnSave');   // matches your index.html
  const formEl      = document.querySelector('.userEntry');

  formEl?.addEventListener('submit', (e) => e.preventDefault());

  const f = {
    id:      document.querySelector('#userID'),
    first:   document.querySelector('#firstname'),
    last:    document.querySelector('#lastname'),
    address: document.querySelector('#address'),
    city:    document.querySelector('#city'),
    email:   document.querySelector('#email')
  };

  const stockName     = document.querySelector('#stockName');
  const stockSector   = document.querySelector('#stockSector');
  const stockIndustry = document.querySelector('#stockIndustry');
  const stockAddress  = document.querySelector('#stockAddress');
  const stockLogo     = document.querySelector('#logo');

  // Helpers to show/hide the <img> cleanly
  function hideLogo() {
    if (!stockLogo) return;
    stockLogo.removeAttribute('src');
    stockLogo.alt = '';
    stockLogo.style.display = 'none';
  }
  function showLogo(src, altText) {
    if (!stockLogo) return;
    stockLogo.src = src;
    stockLogo.alt = altText || '';
    stockLogo.style.display = ''; // show
  }

  // ----- Renderers -----
  function generateUserList(usersArray) {
    userListEl.innerHTML = '';
    usersArray.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.textContent = `${user.lastname}, ${user.firstname}`;
      li.setAttribute('id', id);
      userListEl.appendChild(li);
    });
  }

  function populateForm(data) {
    const { user, id } = data;
    if (f.id)      f.id.value = id;
    if (f.first)   f.first.value = user.firstname ?? '';
    if (f.last)    f.last.value = user.lastname ?? '';
    if (f.address) f.address.value = user.address ?? '';
    if (f.city)    f.city.value = user.city ?? '';
    if (f.email)   f.email.value = user.email ?? '';
  }

  function renderPortfolioHeader() {
    const h1 = document.createElement('h3'); h1.textContent = 'Symbol';
    const h2 = document.createElement('h3'); h2.textContent = '# Shares';
    const h3 = document.createElement('h3'); h3.textContent = 'Actions';
    portfolioEl.append(h1, h2, h3);
  }

  function renderPortfolio(user) {
    portfolioEl.innerHTML = '';
    renderPortfolioHeader();

    user.portfolio.forEach(({ symbol, owned }) => {
      const sym    = document.createElement('p');
      const shares = document.createElement('p');
      const btn    = document.createElement('button');

      sym.textContent = symbol;
      shares.textContent = owned;
      btn.textContent = 'View';
      btn.setAttribute('data-symbol', symbol);

      portfolioEl.append(sym, shares, btn);
    });
  }

  // ----- Stock details + logo (show only if the file exists) -----
  function viewStock(symbol) {
    const stock = stocks.find(s => s.symbol == symbol);
    if (!stock) return;

    stockName.textContent     = stock.name ?? '';
    stockSector.textContent   = stock.sector ?? '';
    stockIndustry.textContent = stock.subIndustry ?? '';
    stockAddress.textContent  = stock.address ?? '';

    loadLogoIfExists(symbol, stock?.name);
  }

  // Try a small set of sensible filename variants and only set src when one loads.
  // No placeholder, no broken icon. If none found → hide the image.
  function loadLogoIfExists(symbol, companyName) {
    if (!stockLogo) return;

    hideLogo(); // reset first

    // Build symbol variants: original, dot→dash, and lowercase versions
    const override = SYMBOL_TO_LOGO[symbol] || symbol;
    const dotToDash = String(override).replace(/\./g, '-');
    const symbolVariants = Array.from(new Set([
      override,
      dotToDash,
      String(override).toLowerCase(),
      String(dotToDash).toLowerCase()
    ]));

    // Optional: a couple name-based guesses, in case your /logos uses company names
    const nameVariants = (companyName ? [
      String(companyName).replace(/[^a-zA-Z0-9]/g, '').toLowerCase(), // "mcdonaldscorp" -> "mcdonaldscorp"
      String(companyName).split(/\s+/).join('')                        // "McDonald's Corp." -> "McDonaldsCorp"
    ] : []);

    // Keep it lean to avoid lots of 404s; most labs ship SVGs
    const exts  = ['svg'];
    const bases = ['logos', '/logos'];

    const candidates = [];
    for (const base of bases) {
      for (const v of [...symbolVariants, ...nameVariants]) {
        for (const ext of exts) {
          candidates.push(`${base}/${v}.${ext}`);
        }
      }
    }

    let i = 0;
    const probe = new Image();
    probe.onload = () => showLogo(probe.src, symbol);
    probe.onerror = () => {
      i++;
      if (i < candidates.length) {
        probe.src = candidates[i];
      } else {
        hideLogo(); // nothing found → keep hidden
      }
    };
    probe.src = candidates[i];
  }

  // ----- Events -----
  userListEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    const userId = e.target.id;
    const selected = users.find(x => x.id == userId);
    if (!selected) return;
    populateForm(selected);
    renderPortfolio(selected);

    // clear details until a stock is viewed
    stockName.textContent = '';
    stockSector.textContent = '';
    stockIndustry.textContent = '';
    stockAddress.textContent = '';
    hideLogo();
  });

  portfolioEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const symbol = e.target.getAttribute('data-symbol');
    viewStock(symbol);
  });

  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = f.id?.value;
      const idx = users.findIndex(u => u.id == id);
      if (idx >= 0) {
        users.splice(idx, 1);
        generateUserList(users);
        portfolioEl.innerHTML = '';
        renderPortfolioHeader();
        Object.values(f).forEach(input => { if (input) input.value = ''; });
        stockName.textContent = '';
        stockSector.textContent = '';
        stockIndustry.textContent = '';
        stockAddress.textContent = '';
        hideLogo();
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = f.id?.value;
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
          users[i].user.firstname = f.first?.value ?? '';
          users[i].user.lastname  = f.last?.value ?? '';
          users[i].user.address   = f.address?.value ?? '';
          users[i].user.city      = f.city?.value ?? '';
          users[i].user.email     = f.email?.value ?? '';
          generateUserList(users);
          break;
        }
      }
    });
  }

  // Initial render
  generateUserList(users);
  renderPortfolioHeader();
});

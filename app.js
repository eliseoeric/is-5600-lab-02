 li.addEventListener("mouseenter", () => (li.style.background = "#e0f2fe"));
      li.addEventListener("mouseleave", () => (li.style.background = "#f8fafc"));
      userList.appendChild(li);
    });
  };

  // Event delegation for user list
  document.querySelector(".user-list").addEventListener("click", (e) => {
    const selectedId = e.target.id;
    if (!selectedId) return;
    const selectedUser = userData.find((u) => u.id == selectedId);
    if (!selectedUser) return;
    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocksData);
  });

  const populateForm = ({ user, id }) => {
    document.querySelector("#userID").value = id;
    ["firstname","lastname","address","city","email"].forEach(f => {
      document.querySelector(`#${f}`).value = user[f];
    });
  };

  const renderPortfolio = (user, stocks) => {
    const container = document.querySelector(".portfolio-list");
    container.innerHTML = "";

    user.portfolio.forEach(({ symbol, owned }) => {
      const card = document.createElement("div");
      card.classList.add("portfolio-card");
      card.innerHTML = `<p><strong>${symbol}</strong></p><p>Shares: ${owned}</p><button class="view-btn" id="${symbol}">View</button>`;
      Object.assign(card.style, {
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#fff", borderRadius: "10px", padding: "10px",
        marginBottom: "8px", boxShadow: "0 1px 6px rgba(0,0,0,0.1)"
      });
      container.appendChild(card);
    });
  };

  // Event delegation for portfolio buttons
  document.querySelector(".portfolio-list").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") viewStock(e.target.id, stocksData);
  });

  const viewStock = (symbol, stocks) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;
    document.querySelector("#stockName").textContent = stock.name;
    document.querySelector("#stockSector").textContent = stock.sector;
    document.querySelector("#stockIndustry").textContent = stock.subIndustry;
    document.querySelector("#stockAddress").textContent = stock.address;
    document.querySelector("#logo").src = `logos/${symbol}.svg`;
  };

  // Delete user
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    const idx = userData.findIndex(u => u.id == id);
    if (idx >= 0) userData.splice(idx, 1);
    generateUserList(userData, stocksData);
    document.querySelector(".portfolio-list").innerHTML = "";
    userForm.reset();
  });

  // Save user
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    const user = userData.find(u => u.id == id);
    if (!user) return;
    ["firstname","lastname","address","city","email"].forEach(f => {
      user.user[f] = document.querySelector(`#${f}`).value;
    });
    generateUserList(userData, stocksData);
  });

  // Initialize
  generateUserList(userData, stocksData);
});


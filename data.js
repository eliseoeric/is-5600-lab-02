// Mock data for users and their stock portfolios
const users = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        portfolio: [
            { symbol: "AAPL", shares: 50 },
            { symbol: "GOOGL", shares: 25 },
            { symbol: "MSFT", shares: 30 }
        ]
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        portfolio: [
            { symbol: "AMZN", shares: 15 },
            { symbol: "TSLA", shares: 20 },
            { symbol: "META", shares: 40 }
        ]
    },
    {
        id: 3,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        portfolio: [
            { symbol: "NFLX", shares: 10 },
            { symbol: "AAPL", shares: 75 },
            { symbol: "GOOGL", shares: 15 }
        ]
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        email: "emily.r@email.com",
        portfolio: [
            { symbol: "TSLA", shares: 35 },
            { symbol: "AMZN", shares: 25 },
            { symbol: "MSFT", shares: 45 }
        ]
    }
];

// Mock data for stock details
const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.32 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.85 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 420.75 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.23 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 245.67 },
    { symbol: "META", name: "Meta Platforms Inc.", price: 485.50 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 625.30 }
];
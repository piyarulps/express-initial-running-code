const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Log 2: Server running on http://localhost:${PORT}`);
});

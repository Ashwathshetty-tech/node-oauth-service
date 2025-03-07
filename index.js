const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const tokenRoutesv1 = require('./src/routes/v1/tokenRoutes');
const tokenRoutesv2 = require('./src/routes/v2/tokenRoute');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/oauth', tokenRoutesv1);
app.use('/api/v2/oauth', tokenRoutesv2);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`OAuth Service running on port ${PORT}`);
});

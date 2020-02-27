let express = require('express');
const app = express();

app.use(express.json());

app.get('/', (request:any, response:any) => {
  response.json({info:'Youtube API'})
});

app.listen(3000, () => console.log('Server Started'));

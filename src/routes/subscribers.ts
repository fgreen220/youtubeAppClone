express = require('express');
const router = express.Router();

router.get('/', (req:any, res:any) => {
  res.send('Hello World');
})

router.get('/:id', (req:any, res:any) => {
  res.send(req.params.id);
})

router.post('/', (req:any, res:any) => {
  
})

router.patch('/:id', (req:any, res:any) => {
  
})

router.delete('/:id', (req:any, res:any) => {
  
})

module.exports = router;
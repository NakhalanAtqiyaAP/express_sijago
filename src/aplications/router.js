const {Router} = require('express');

const router = Router();

router.get('/', (res,req)=>{
    res.send("using api")
});

module.exports = router;
const express = require('express');
const bodyparse = require('body-parser');
const path = require('path');
const AdminRouter = require('./routes/admin');
const ShopRouter  = require('./routes/shop');
const dirname = require('./util/path');

const app = express();

app.use(bodyparse.urlencoded({extended:false}));

app.use('/admin',AdminRouter);

app.use(ShopRouter);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(dirname,'views','404.html'));
})

app.listen(3000);



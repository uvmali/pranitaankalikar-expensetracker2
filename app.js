const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


//const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User=require('./models/user');
const Expense=require('./models/expense');
const Order = require('./models/orders');


const userRoutes = require('./routes/user');
const passwordRoutes = require('./routes/password');
const purchaseRoutes = require('./routes/purchase');

const app = express();

app.use(cors());

const dotenv = require('dotenv');

// get config vars
dotenv.config();



 //app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(bodyParser.json());  //this is for handling jsons


app.use(express.static(path.join(__dirname, 'public')));

//console.log(require('crypto').randomBytes(64).toString('hex'));
app.use('/user', userRoutes);
app.use('/password', passwordRoutes);
app.use('/purchase', purchaseRoutes);

Expense.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);


sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(7000);
    })
    .catch(err=>console.log(err));
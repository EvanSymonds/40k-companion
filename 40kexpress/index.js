//Modules
const express = require('express');
const app = express();
const config = require('config');
const debug = require('debug')('app:debug');
const cors = require('cors');

require('./startup/prod')(app);

app.use(cors());

//Routes
const homepage = require('./routes/homepage');
const armyBuilder = require('./routes/armyBuilder');
const campaignManager = require('./routes/campaignManager');
const login = require('./routes/login');


//Using routes
app.use('/', homepage);
app.use('/armybuilder', armyBuilder);
app.use('/campaignmanager', campaignManager);
app.use('/login', login)

//Controller imports
const groupController = require('./controllers/groupController');
const userController = require('./controllers/userController');
const armyController = require('./controllers/armyController');
const detachController = require('./controllers/detachmentController');
const unitController = require('./controllers/unitController');
const groupUserTable = require('./controllers/join tables/group-users');
const userArmyTable = require('./controllers/join tables/user-armies');

//Controller connects
unitController.connect();
detachController.connect();
armyController.connect();
userController.connect();
groupController.connect();

groupUserTable.connect();
userArmyTable.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));

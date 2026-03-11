import app from './src/app.js'
import config from './src/config/config.js'
import ConnectDB from './src/config/database.js'
import logger from './src/config/logger.js'
// logger
const PORT = config.PORT

ConnectDB()
app.listen(PORT, () => {
    console.log(`server is runing on ${PORT} port`);
})
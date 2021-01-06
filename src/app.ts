import "dotenv/config"
import routesConfig from './web/routes'
import middlewaresConfig from './web/middlewares'
import Env, { checkEnv } from './config/Env'
import express,{ Application } from 'express'

const start = async () => {

	try {

		checkEnv()

		const application : Application = express();
		
		//Middlewares
		middlewaresConfig(application)
		
		//routes
		routesConfig(application)
		
		const PORT = Env.PORT;

		application.listen(PORT,() => {
			console.log(`server is running on PORT ${PORT}`)
		})

	}catch(error) {
		console.error(error)
		process.exit()
	}

}

start()
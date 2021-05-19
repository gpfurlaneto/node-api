import "dotenv/config"
import routesConfig from './web/routes'
import { createConnection } from "typeorm"
import Env, { checkEnv } from './config/Env'
import express,{ Application } from 'express'
import middlewaresConfig from './web/middlewares'
import databaseConfig from './database/ormconfig'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

const start = async () => {

	try {

		checkEnv()

		const application : Application = express();
		
		const connection = await createConnection(databaseConfig as PostgresConnectionOptions)
		const migrations = await connection.runMigrations()

		console.info(`Executed Migrations: ${migrations.length ? 
			migrations.map(migration =>  '[\n  ' + migration.name) + '\n]'
			: 'No migrations to run.'}`)
			
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
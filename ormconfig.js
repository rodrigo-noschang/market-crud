const devEnv = {
    type: 'postgres',
    host: process.env.PG_HOST,
	port: '5432',	
	database: process.env.PG_DB,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	entities: ['./src/entities/**/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
	cli: {
		migrationsDir: './src/database/migrations'
	},

	loggin: true,
	synchrozine: false
}

const prodEnv = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	entities: ['./dist/entities/**/*.js'],
	migrations: ['.dist/database/migrations/*.js'],
	cli: {
		migrationsDir: './dist/database/migrations'
	},
	synchrozine: false,
	ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
}

module.exports = process.env.NODE_ENV ? prodEnv : devEnv;
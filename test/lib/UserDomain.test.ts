import UserDomain from '../../src/lib/domain/UserDomain'
import databaseConfig from '../../src/database/ormconfig'
import { Connection, createConnection, getManager } from "typeorm"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import bcrypt from 'bcrypt'

const DEFAULT_EMAIL_TEST = 'user-test@node-api.com'
const DEFAULT_USERNAME_TEST = 'user-test'

describe('UserDomain test', () => {
	
	let connection: Connection
	let userDomain: UserDomain

	beforeAll(async () => {
		connection = await createConnection({
			...databaseConfig,
			url: process.env.DATABASE_URL,
		} as PostgresConnectionOptions)

		await connection.query(`
			INSERT INTO users (email, username, password) VALUES ('${DEFAULT_EMAIL_TEST}', 'user-test', '${await bcrypt.hash('admin', 10)}')
		`)

		userDomain = UserDomain.instance()
	})
	
	afterAll(async () => {
		await connection.query(`DELETE FROM users WHERE email <> 'admin@node-api.com'`)
	})

	test('Fetch all users', async () => {
		const allUSers = await userDomain.getAllUsers()
		expect(allUSers.length).toBe(2)
		expect(allUSers.filter(user => user.email === 'admin@node-api.com').length).toBe(1)
		expect(allUSers.filter(user => user.email === DEFAULT_EMAIL_TEST).length).toBe(1)
	})

	test('Fetch specific user', async () => {
		const testUSer = await connection.query(`select id, username, email from users where email = '${DEFAULT_EMAIL_TEST}'`)
		const user = await userDomain.getUser(testUSer[0].id)
		expect(testUSer[0]).toEqual(user)
	})

	test('Create user', async () => {
		const userData = { 
			username: 'user-test1',
			email: 'user-test1@node-api.com',
			password: 'password'
		}

		const newUser = await userDomain.create(userData)
		expect(userData.email).toEqual(newUser.email)
		expect(userData.username).toEqual(newUser.username)

		const testUSer = await connection.query(`select id, username, email from users where email = '${userData.email}'`)

		expect(newUser.id).toEqual(testUSer[0].id)
		expect(newUser.email).toEqual(testUSer[0].email)
		expect(newUser.username).toEqual(testUSer[0].username)

	})

	test('Update user', async () => {
		const userData = { 
			username: 'user-test2',
			email: 'user-test2@node-api.com',
			password: 'password'
		}

		const userDataEdit = {
			email: 'user-test2-edit@node-api.com',
			username: 'user-test2-edit',
			password: 'password2'
		}

		await connection.query(`
			INSERT INTO users (email, username, password) VALUES (
				'${userData.email}',
				'${userData.username}', 
				'${userData.password}'
			)
		`)

		const testUser = await connection.query(`select id from users where email = '${userData.email}'`)
		await userDomain.update(testUser[0].id, userDataEdit)

		const testUserEdited = await connection.query(`select id, username, email, password from users where email = '${userDataEdit.email}'`)
		expect(userDataEdit.email).toBe(testUserEdited[0].email)
		expect(userDataEdit.username).toBe(testUserEdited[0].username)


	})

	test('Delete user', async () => {
		await connection.query(`
			INSERT INTO users (email, username, password) VALUES (
				'user-test-delete@node-api.com',
				'user-test-delete',
				'password'
			)
		`)

		const testUser = await connection.query(`select id from users where email = 'user-test1@node-api.com'`)
		await userDomain.delete(testUser[0].id)

		const testUserDeleted = await connection.query(`select * from users where id = ${testUser[0].id}`)

		expect(testUserDeleted.length).toBe(0)

	})

	test('Login', async () => {
		const result = await userDomain.login(DEFAULT_USERNAME_TEST, 'admin')
		expect(DEFAULT_EMAIL_TEST).toBe(result.user.email)
		expect(DEFAULT_USERNAME_TEST).toBe(result.user.username)
		expect(result.token).not.toBeNull()
	})

	describe('Negative tests', () => {
		test('Create duplicated user', async () => {
			const duplicatedEmail = 'user-test-create-duplicated@node-api.com'
			const duplicatedUsername = 'user-test-create-duplicated'
			await connection.query(`
				INSERT INTO users (email, username, password) VALUES (
					'${duplicatedEmail}',
					'${duplicatedUsername}',
					'password'
				)
			`)
	
			await expect(
				userDomain.create({
					username: duplicatedUsername,
					email: 'any@node-api.com',
					password: '12345'
				})
			).rejects.toThrow('Duplicated username/email')

			await expect(
				userDomain.create({
					username: 'anything',
					email: duplicatedEmail,
					password: '12345'
				})
			).rejects.toThrow('Duplicated username/email')
		})

		test('Update duplicated user', async () => {
			const duplicatedEmail = 'user-test-update-duplicated@node-api.com'
			const duplicatedUsername = 'user-test-update-duplicated'
			await connection.query(`
				INSERT INTO users (email, username, password) VALUES (
					'${duplicatedEmail}',
					'${duplicatedUsername}',
					'password'
				)
			`)

			const emailToUpdate = 'email-to-update'

			await connection.query(`
				INSERT INTO users (email, username, password) VALUES (
					'${emailToUpdate}',
					'username-to-update',
					'password'
				)
			`)
	
			const testUserId = (await connection.query(`select id from users where email = '${emailToUpdate}'`))[0].id

			await expect(
				userDomain.update(testUserId, {
					username: duplicatedUsername,
					email: 'any@node-api.com',
					password: '12345'
				})
			).rejects.toThrow('Duplicated username/email')

			await expect(
				userDomain.create({
					username: 'anything',
					email: duplicatedEmail,
					password: '12345'
				})
			).rejects.toThrow('Duplicated username/email')
		})

		test('Update inexistent user', async () => {
			await expect(userDomain.update(-100, {}))
				.rejects.toThrow('User not found')
		})
	})
})
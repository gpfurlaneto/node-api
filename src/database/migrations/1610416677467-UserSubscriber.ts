import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSubscriber1610416677467 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE users (
        id serial PRIMARY KEY,
        username VARCHAR ( 50 ) UNIQUE NOT NULL,
        password VARCHAR ( 100 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL
      );
    `)  

    // login: admin
    // password: admin
    queryRunner.query(`
      INSERT INTO users (username, password, email) values (
        'admin', 
        '$2b$10$1tXWCR6nL6hNJZo8gn3IJOrlJRtq06yOr0ZW0YSLJ1Wk8lveF3RV.', 
        'admin@node-api.com'
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TABLE users;
    `) 
  }

}
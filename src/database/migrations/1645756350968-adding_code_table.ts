import {MigrationInterface, QueryRunner} from "typeorm";

export class addingCodeTable1645756350968 implements MigrationInterface {
    name = 'addingCodeTable1645756350968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "random_code" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "random_code" ADD CONSTRAINT "UQ_8a7bfd61bcf8b0d3f9fe60d2ad3" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "random_code" ADD CONSTRAINT "FK_8a7bfd61bcf8b0d3f9fe60d2ad3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "random_code" DROP CONSTRAINT "FK_8a7bfd61bcf8b0d3f9fe60d2ad3"`);
        await queryRunner.query(`ALTER TABLE "random_code" DROP CONSTRAINT "UQ_8a7bfd61bcf8b0d3f9fe60d2ad3"`);
        await queryRunner.query(`ALTER TABLE "random_code" DROP COLUMN "userId"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class finalStructure1645827173697 implements MigrationInterface {
    name = 'finalStructure1645827173697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "random_code" RENAME COLUMN "randomCode" TO "recoveryCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "random_code" RENAME COLUMN "recoveryCode" TO "randomCode"`);
    }

}

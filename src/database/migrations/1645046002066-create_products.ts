import {MigrationInterface, QueryRunner} from "typeorm";

export class createProducts1645046002066 implements MigrationInterface {
    name = 'createProducts1645046002066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying NOT NULL, "product_description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "price" integer NOT NULL, "amount_in_stock" integer NOT NULL, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "carts_products_products" ("cartsId" uuid NOT NULL, "productsProductId" uuid NOT NULL, CONSTRAINT "PK_8c224f0f07c185664bea24522a4" PRIMARY KEY ("cartsId", "productsProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d4a98ce8aefd303215e05d6c8" ON "carts_products_products" ("cartsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc3261e4591ea57a459368c68c" ON "carts_products_products" ("productsProductId") `);
        await queryRunner.query(`ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_6d4a98ce8aefd303215e05d6c8c" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_bc3261e4591ea57a459368c68c5" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_bc3261e4591ea57a459368c68c5"`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_6d4a98ce8aefd303215e05d6c8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc3261e4591ea57a459368c68c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d4a98ce8aefd303215e05d6c8"`);
        await queryRunner.query(`DROP TABLE "carts_products_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}

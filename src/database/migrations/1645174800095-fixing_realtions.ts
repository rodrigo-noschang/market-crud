import {MigrationInterface, QueryRunner} from "typeorm";

export class fixingRealtions1645174800095 implements MigrationInterface {
    name = 'fixingRealtions1645174800095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_products_carts" ("productsProductId" uuid NOT NULL, "cartsId" uuid NOT NULL, CONSTRAINT "PK_0d5664b5437652da2ecd9be0af8" PRIMARY KEY ("productsProductId", "cartsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97eca68f6613bf0325e6f28199" ON "products_products_carts" ("productsProductId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dff042f82256d12f9203774b22" ON "products_products_carts" ("cartsId") `);
        await queryRunner.query(`ALTER TABLE "products_products_carts" ADD CONSTRAINT "FK_97eca68f6613bf0325e6f281990" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_products_carts" ADD CONSTRAINT "FK_dff042f82256d12f9203774b220" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_products_carts" DROP CONSTRAINT "FK_dff042f82256d12f9203774b220"`);
        await queryRunner.query(`ALTER TABLE "products_products_carts" DROP CONSTRAINT "FK_97eca68f6613bf0325e6f281990"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dff042f82256d12f9203774b22"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97eca68f6613bf0325e6f28199"`);
        await queryRunner.query(`DROP TABLE "products_products_carts"`);
    }

}

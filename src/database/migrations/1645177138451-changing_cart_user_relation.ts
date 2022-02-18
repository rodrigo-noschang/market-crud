import {MigrationInterface, QueryRunner} from "typeorm";

export class changingCartUserRelation1645177138451 implements MigrationInterface {
    name = 'changingCartUserRelation1645177138451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bcf5e619c34ac7ad0e367e4eae6"`);
        await queryRunner.query(`CREATE TABLE "products_cart_carts" ("productsProductId" uuid NOT NULL, "cartsId" uuid NOT NULL, CONSTRAINT "PK_5b38541a1671d830497f44eb47e" PRIMARY KEY ("productsProductId", "cartsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_55f636d3bfcc32275e86e2be81" ON "products_cart_carts" ("productsProductId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10fe378dca88138e0ed9f5ba18" ON "products_cart_carts" ("cartsId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_bcf5e619c34ac7ad0e367e4eae"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userCartId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "UQ_69828a178f152f157dcf2f70a89" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_cart_carts" ADD CONSTRAINT "FK_55f636d3bfcc32275e86e2be81e" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_cart_carts" ADD CONSTRAINT "FK_10fe378dca88138e0ed9f5ba180" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_cart_carts" DROP CONSTRAINT "FK_10fe378dca88138e0ed9f5ba180"`);
        await queryRunner.query(`ALTER TABLE "products_cart_carts" DROP CONSTRAINT "FK_55f636d3bfcc32275e86e2be81e"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "UQ_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userCartId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_bcf5e619c34ac7ad0e367e4eae" UNIQUE ("userCartId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10fe378dca88138e0ed9f5ba18"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55f636d3bfcc32275e86e2be81"`);
        await queryRunner.query(`DROP TABLE "products_cart_carts"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bcf5e619c34ac7ad0e367e4eae6" FOREIGN KEY ("userCartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

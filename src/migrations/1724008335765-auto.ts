import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1724008335765 implements MigrationInterface {
    name = 'Auto1724008335765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "color"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class NONAME1598433285618 implements MigrationInterface {
    name = 'NONAME1598433285618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Vehicle" ("id" int NOT NULL IDENTITY(1,1), "descript" varchar(50) NOT NULL, CONSTRAINT "PK_7124b1b9d8e76a0a3dcfc7ed98d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Symptom" ("id" int NOT NULL IDENTITY(1,1), "descript" varchar(50) NOT NULL, "isValid" bit, CONSTRAINT "PK_5eaa659db238e8b9636a7265196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RelFormSymptom" ("id" int NOT NULL IDENTITY(1,1), "formId" int, "symptomId" int, CONSTRAINT "PK_942e1a49f74f6750aa2fc04e4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Form" ("id" int NOT NULL IDENTITY(1,1), "date" datetime NOT NULL CONSTRAINT "DF_33d1272f190bfb432e4c4e5897c" DEFAULT CURRENT_TIMESTAMP, "ip" varchar(20), "question01" bit, "question02" bit NOT NULL, "question03" bit NOT NULL, "question04" bit NOT NULL, "question05" bit NOT NULL, "vehicleId" int, "employeeId" int, CONSTRAINT "PK_83f96797f8617f38e2e61ced7b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employee" ("id" int NOT NULL IDENTITY(1,1), "rut" varchar(12) NOT NULL, "name" varchar(200) NOT NULL, "position" varchar(50) NOT NULL, "isInternal" bit NOT NULL, CONSTRAINT "PK_9a993c20751b9867abc60108433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" int NOT NULL IDENTITY(1,1), "rut" varchar(9) NOT NULL, "nick" varchar(20) NOT NULL, "pass" varchar(512) NOT NULL, "mail" varchar(100) NOT NULL, "typeUserId" int, CONSTRAINT "unique_rut" UNIQUE ("rut"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TypeUser" ("id" int NOT NULL IDENTITY(1,1), "restrictions" tinyint NOT NULL, "descript" varchar(20) NOT NULL, CONSTRAINT "PK_8145bb65c07e7638a8fc078cf2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RelTypeUserMenu" ("id" int NOT NULL IDENTITY(1,1), "typeUserId" int, "menuId" int, CONSTRAINT "PK_414f628fa1a1574dcd92222ac24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Menu" ("id" int NOT NULL IDENTITY(1,1), "text" varchar(50) NOT NULL, "icon" varchar(50) NOT NULL, "path" varchar(100), "everyone" bit NOT NULL, "mpath" varchar(255) CONSTRAINT "DF_ce23145c2ec228a128ffb3c28db" DEFAULT '', "parentId" int, CONSTRAINT "PK_b2683c330c5e6d700266a6f46d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "RelFormSymptom" ADD CONSTRAINT "FK_eb1b1e5f4acbd276d4a75a6e5e9" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RelFormSymptom" ADD CONSTRAINT "FK_6a1f90fffd64ac97504af6c4001" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Form" ADD CONSTRAINT "FK_dbefed2f8d80c21642c4ae3ef12" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Form" ADD CONSTRAINT "FK_b2ad7e58fde0e6983046e87dd03" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_7b94c149d5724452309f1599b08" FOREIGN KEY ("typeUserId") REFERENCES "TypeUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RelTypeUserMenu" ADD CONSTRAINT "FK_19487a2924f9e762c94f8625402" FOREIGN KEY ("typeUserId") REFERENCES "TypeUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RelTypeUserMenu" ADD CONSTRAINT "FK_b8763d97fd7a5c6f63d6805b9be" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08"`);
        await queryRunner.query(`ALTER TABLE "RelTypeUserMenu" DROP CONSTRAINT "FK_b8763d97fd7a5c6f63d6805b9be"`);
        await queryRunner.query(`ALTER TABLE "RelTypeUserMenu" DROP CONSTRAINT "FK_19487a2924f9e762c94f8625402"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_7b94c149d5724452309f1599b08"`);
        await queryRunner.query(`ALTER TABLE "Form" DROP CONSTRAINT "FK_b2ad7e58fde0e6983046e87dd03"`);
        await queryRunner.query(`ALTER TABLE "Form" DROP CONSTRAINT "FK_dbefed2f8d80c21642c4ae3ef12"`);
        await queryRunner.query(`ALTER TABLE "RelFormSymptom" DROP CONSTRAINT "FK_6a1f90fffd64ac97504af6c4001"`);
        await queryRunner.query(`ALTER TABLE "RelFormSymptom" DROP CONSTRAINT "FK_eb1b1e5f4acbd276d4a75a6e5e9"`);
        await queryRunner.query(`DROP TABLE "Menu"`);
        await queryRunner.query(`DROP TABLE "RelTypeUserMenu"`);
        await queryRunner.query(`DROP TABLE "TypeUser"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Employee"`);
        await queryRunner.query(`DROP TABLE "Form"`);
        await queryRunner.query(`DROP TABLE "RelFormSymptom"`);
        await queryRunner.query(`DROP TABLE "Symptom"`);
        await queryRunner.query(`DROP TABLE "Vehicle"`);
    }

}

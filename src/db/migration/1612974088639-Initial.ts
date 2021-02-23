import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1612974088639 implements MigrationInterface {
  name = 'Initial1612974088639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "data"."TeamInstallation" ("id" character varying(255) NOT NULL, "installationJson" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8923d6209d0845506fd5c2c7eb8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "data"."WebhookSubscription" ("id" SERIAL NOT NULL, "accountCode" character varying(255) NOT NULL, "webhookSubscriptionId" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_accountCode" UNIQUE ("accountCode"), CONSTRAINT "PK_92623d3710ae9964bdca5e4c7f3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "data"."ChannelSubscription" ("id" SERIAL NOT NULL, "channelId" character varying(255) NOT NULL, "channelName" character varying(255) NOT NULL, "botToken" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamId" character varying(255), "accountTokenId" integer, "webhookSubscriptionId" integer, CONSTRAINT "UQ_accountTokenId_channelId" UNIQUE ("accountTokenId", "channelId"), CONSTRAINT "PK_c85cb4175c4c10857a35b7e7d02" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "data"."AccountToken" ("id" SERIAL NOT NULL, "accountCode" character varying(255) NOT NULL, "accountName" character varying(255), "accessToken" text NOT NULL, "refreshToken" text NOT NULL, "expiresAt" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamId" character varying(255), CONSTRAINT "UQ_teamId_accountCode" UNIQUE ("teamId", "accountCode"), CONSTRAINT "PK_2c24e168ce86cd88f641c973207" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "data"."AuthRequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying(255) NOT NULL, "appId" character varying(255) NOT NULL, "channelId" character varying(255) NOT NULL, "botToken" character varying(255) NOT NULL, "codeVerifier" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "teamId" character varying(255), CONSTRAINT "UQ_teamId_userId" UNIQUE ("teamId", "userId"), CONSTRAINT "PK_35bacaebc8544ead0d5698c7a58" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" ADD CONSTRAINT "FK_0ee7bc227cc4762df2005b1c4c7" FOREIGN KEY ("teamId") REFERENCES "data"."TeamInstallation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" ADD CONSTRAINT "FK_89492ba51be21bb9b1b6c41ee25" FOREIGN KEY ("accountTokenId") REFERENCES "data"."AccountToken"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" ADD CONSTRAINT "FK_a71eb552ea7355b20cd6c72cd4c" FOREIGN KEY ("webhookSubscriptionId") REFERENCES "data"."WebhookSubscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."AccountToken" ADD CONSTRAINT "FK_deb0f2ddf4d2eab940c5e4489ff" FOREIGN KEY ("teamId") REFERENCES "data"."TeamInstallation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."AuthRequest" ADD CONSTRAINT "FK_5bfddff8233a2d97166d308fabd" FOREIGN KEY ("teamId") REFERENCES "data"."TeamInstallation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "data"."AuthRequest" DROP CONSTRAINT "FK_5bfddff8233a2d97166d308fabd"`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."AccountToken" DROP CONSTRAINT "FK_deb0f2ddf4d2eab940c5e4489ff"`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" DROP CONSTRAINT "FK_a71eb552ea7355b20cd6c72cd4c"`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" DROP CONSTRAINT "FK_89492ba51be21bb9b1b6c41ee25"`
    );
    await queryRunner.query(
      `ALTER TABLE "data"."ChannelSubscription" DROP CONSTRAINT "FK_0ee7bc227cc4762df2005b1c4c7"`
    );
    await queryRunner.query(`DROP TABLE "data"."AuthRequest"`);
    await queryRunner.query(`DROP TABLE "data"."AccountToken"`);
    await queryRunner.query(`DROP TABLE "data"."ChannelSubscription"`);
    await queryRunner.query(`DROP TABLE "data"."WebhookSubscription"`);
    await queryRunner.query(`DROP TABLE "data"."TeamInstallation"`);
  }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210426090545 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE favorite (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE favorite_product (favorite_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_8E1EAAC3AA17481D (favorite_id), INDEX IDX_8E1EAAC34584665A (product_id), PRIMARY KEY(favorite_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE favorite_product ADD CONSTRAINT FK_8E1EAAC3AA17481D FOREIGN KEY (favorite_id) REFERENCES favorite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE favorite_product ADD CONSTRAINT FK_8E1EAAC34584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product CHANGE slug slug VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD favorite_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649AA17481D FOREIGN KEY (favorite_id) REFERENCES favorite (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649AA17481D ON user (favorite_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE favorite_product DROP FOREIGN KEY FK_8E1EAAC3AA17481D');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649AA17481D');
        $this->addSql('DROP TABLE favorite');
        $this->addSql('DROP TABLE favorite_product');
        $this->addSql('ALTER TABLE product CHANGE slug slug VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('DROP INDEX IDX_8D93D649AA17481D ON user');
        $this->addSql('ALTER TABLE user DROP favorite_id');
    }
}

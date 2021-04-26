<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210412160257 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_test ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product_test ADD CONSTRAINT FK_55975CADA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_55975CADA76ED395 ON product_test (user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_test DROP FOREIGN KEY FK_55975CADA76ED395');
        $this->addSql('DROP INDEX IDX_55975CADA76ED395 ON product_test');
        $this->addSql('ALTER TABLE product_test DROP user_id');
    }
}

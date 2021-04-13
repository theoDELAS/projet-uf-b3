<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Auction;
use App\Entity\Product;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    const USER_COUNT = 5;
    const PRODUCT_COUNT = 15;

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $users = [];

        // Basic User
        for ($i = 1; $i < self::USER_COUNT; $i++) {
            $user = new User();
            $user->setUsername($faker->userName)
                 ->setEmail($faker->email)
                 ->setPassword('password')
                 ->setToken(bin2hex(random_bytes(10))); 

            $manager->persist($user);
            $users[] = $user;
        }

        // products
        for ($i = 1; $i < self::PRODUCT_COUNT; $i++) {
            $product = new Product();
            $user = $users[mt_rand(0, count($users) - 1)];

            $product->setName($faker->userName)
                    ->setImage("https://picsum.photos/id/".mt_rand(1, 500)."/300/350")
                    ->setDescription('<p>' . join('</p><p>', $faker->paragraphs(1)) . '</p>')
                    ->setUser($user);

            $manager->persist($product);
        }

        $manager->flush();
    }
}
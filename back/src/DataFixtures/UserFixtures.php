<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Product;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    const USER_COUNT = 10;

    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        // Basic User
        for ($i = 1; $i < self::USER_COUNT; $i++) {
            $user = new User();
            // $password = $this->passwordEncoder->encodePassword($user, 'password');
            $user->setUsername($faker->userName)
                 ->setEmail($faker->email)
                 ->setPassword('password'); 

            $manager->persist($user);
        }

        $manager->flush();
    }
}
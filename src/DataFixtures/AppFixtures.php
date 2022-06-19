<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\User;
use App\Entity\Produit;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordHasherInterface
     */
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {

        $users = [
            ["email" => "test@test", "nom" => "test", "password" => "test"],
            ["email" => "pvi@test", "nom" => "pvi", "password" => "pvi"],
        ];

        foreach ($users as $userData) {
            $user = new User();
            $user->setEmail($userData["email"]);
            $user->setUsername($userData["nom"]);
            $user->addRole("ROLE_USER");
            $hash = $this->encoder->hashPassword($user, $userData["password"]);
            $user->setPassword($hash);
            $manager->persist($user);
        }

        for ($i = 0; $i < 20; $i++) {
            $product = new Produit();
            $product->setNom('produit ' . $i);
            $product->setPrixHT(mt_rand(10, 100));
            $product->setPoids(mt_rand(10, 100));
            $product->setReference("#" . (mt_rand(10, 100)));
            $manager->persist($product);
        }

        for ($i = 0; $i < 20; $i++) {
            $client = new Client();
            $client->setNom("Client " . $i);
            $client->setPrenom("Prenom " . $i);
            $client->setEmail("client$i@domain.dd");

            $manager->persist($client);
        }

        $manager->flush();
    }
}

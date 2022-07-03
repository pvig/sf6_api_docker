<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\LigneVente;
use App\Entity\User;
use App\Entity\Produit;
use App\Entity\Vente;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\VarDumper\Cloner\Data;
use Faker\Factory;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordHasherInterface
     */
    private $encoder;
    private $faker;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
        $this->faker = Factory::create();
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

        for ($i = 0; $i < 100; $i++) {
            $product = new Produit();
            $product->setNom($this->faker->word);
            $product->setPrixHT(mt_rand(10, 100));
            $product->setPoids(mt_rand(10, 100));
            $product->setReference("#" . (mt_rand(10, 100)));
            $manager->persist($product);
            $this->addReference("produit$i", $product);
        }

        for ($i = 0; $i < 100; $i++) {
            $client = new Client();
            $client->setNom($this->faker->name);
            $client->setPrenom($this->faker->lastName);
            $client->setEmail($this->faker->email);
            $manager->persist($client);
            $this->addReference("client$i", $client);
        }

        for ($i = 0; $i < 1000; $i++) {
            $vente = new Vente();
            $vente->setClient($this->getReference("client" . (mt_rand(0, 19))));
            $nbProduits = mt_rand(1, 20);
            $prixTotalHt = 0;
            for ($nn = 0; $nn < $nbProduits; $nn++) {
                $ligne = new LigneVente();
                $numProduit = mt_rand(0, 19);
                $ligne->setProduit($this->getReference("produit" . $numProduit));
                $ligne->setQuantite(mt_rand(1, 10));
                $prix = mt_rand(1, 20) * 1.5;
                $prixTotalHt += $prix;
                $ligne->setPrixHT($prix);
                $vente->addLignesVente($ligne);
            }
            $vente->setPrixProduitsHT($prixTotalHt);
            $vente->setPrixProduitsTTC($prixTotalHt * 1.2);
            $date = new DateTime();
            $date->setTimestamp(mt_rand(1529925253, 1655738324));
            $vente->setDateVente($date);
            $vente->setNumeroVente("#" . ($i + mt_rand(1, 100)));
            $manager->persist($vente);
        }

        $manager->flush();
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VenteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VenteRepository::class)]
#[ApiResource]
class Vente
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    private $dateVente;

    #[ORM\Column(type: 'string', length: 50)]
    private $numeroVente;

    #[ORM\Column(type: 'float')]
    private $prixProduitsHT;

    #[ORM\Column(type: 'float')]
    private $prixProduitsTTC;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateVente(): ?\DateTimeInterface
    {
        return $this->dateVente;
    }

    public function setDateVente(\DateTimeInterface $dateVente): self
    {
        $this->dateVente = $dateVente;

        return $this;
    }

    public function getNumeroVente(): ?string
    {
        return $this->numeroVente;
    }

    public function setNumeroVente(string $numeroVente): self
    {
        $this->numeroVente = $numeroVente;

        return $this;
    }

    public function getPrixProduitsHT(): ?float
    {
        return $this->prixProduitsHT;
    }

    public function setPrixProduitsHT(float $prixProduitsHT): self
    {
        $this->prixProduitsHT = $prixProduitsHT;

        return $this;
    }

    public function getPrixProduitsTTC(): ?float
    {
        return $this->prixProduitsTTC;
    }

    public function setPrixProduitsTTC(float $prixProduitsTTC): self
    {
        $this->prixProduitsTTC = $prixProduitsTTC;

        return $this;
    }
}

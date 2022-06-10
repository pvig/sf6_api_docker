<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\LigneVenteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LigneVenteRepository::class)]
#[ApiResource()]
class LigneVente
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Vente::class, inversedBy: 'Produit')]
    #[ORM\JoinColumn(nullable: false)]
    private $Vente;

    #[ORM\ManyToOne(targetEntity: Produit::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $Produit;

    #[ORM\Column(type: 'integer')]
    private $quantite;

    public function getNomProduit(): ?string
    {
        return $this->getProduit()->getNom();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVente(): ?Vente
    {
        return $this->Vente;
    }

    public function setVente(?Vente $Vente): self
    {
        $this->Vente = $Vente;

        return $this;
    }

    public function getProduit(): ?Produit
    {
        return $this->Produit;
    }

    public function setProduit(Produit $Produit): self
    {
        $this->Produit = $Produit;

        return $this;
    }

    public function getQuantite()
    {
        return $this->quantite;
    }

    public function setQuantite($quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }
}

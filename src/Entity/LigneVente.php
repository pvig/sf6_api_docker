<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use App\Repository\LigneVenteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LigneVenteRepository::class)]
#[ApiResource]
class LigneVente
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Vente::class, inversedBy: 'lignesVente')]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    private $vente;

    #[ORM\ManyToOne(targetEntity: Produit::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["read", "write"])]
    private $produit;

    #[ORM\Column(type: 'integer')]
    #[Groups(["read", "write"])]
    private $quantite;

    #[ORM\Column(type: 'float')]
    #[Groups(["read", "write"])]
    private $prixHT;

    #[Groups(["read"])]
    public function getNom(): ?string
    {
        return $this->getProduit()->getNom();
    }

    #[Groups(["read"])]
    public function getIdProduit(): ?string
    {
        return $this->getProduit()->getId();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVente(): ?Vente
    {
        return $this->vente;
    }

    public function setVente(?Vente $vente): self
    {
        $this->vente = $vente;

        return $this;
    }

    public function getProduit(): ?Produit
    {
        return $this->produit;
    }

    public function setProduit(Produit $produit): self
    {
        $this->produit = $produit;

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

    public function getPrixHT()
    {
        return $this->prixHT;
    }

    public function setPrixHT($prixHT): self
    {
        $this->prixHT = $prixHT;

        return $this;
    }
}

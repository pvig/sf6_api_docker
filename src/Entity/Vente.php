<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VenteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    
    #[ORM\OneToMany(mappedBy: 'Vente', targetEntity: LigneVente::class, orphanRemoval: true)]
    private $lignesVente;

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

    /**
     * @return Collection<int, LigneVente>
     */
    public function getLignesVente(): Collection
    {
        return $this->lignesVente;
    }

    public function addLigneVente(LigneVente $ligneVente): self
    {
        if (!$this->lignesVente->contains($ligneVente)) {
            $this->lignesVente[] = $ligneVente;
            $ligneVente->setVente($this);
        }

        return $this;
    }

    public function removeLigneVente(LigneVente $ligneVente): self
    {
        if ($this->lignesVente->removeElement($ligneVente)) {
            // set the owning side to null (unless already changed)
            if ($ligneVente->getVente() === $this) {
                $ligneVente->setVente(null);
            }
        }

        return $this;
    }

    /**
     * Get the value of prixProduitsTTC
     */ 
    public function getPrixProduitsTTC()
    {
        return $this->prixProduitsTTC;
    }

    /**
     * Set the value of prixProduitsTTC
     *
     * @return  self
     */ 
    public function setPrixProduitsTTC($prixProduitsTTC)
    {
        $this->prixProduitsTTC = $prixProduitsTTC;

        return $this;
    }
}

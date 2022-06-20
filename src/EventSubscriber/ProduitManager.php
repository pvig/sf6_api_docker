<?php
// api/src/EventSubscriber/ProductManager.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Produit;
use App\Exception\ProductNotDeletableException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Doctrine\ORM\EntityManagerInterface;

final class ProduitManager implements EventSubscriberInterface
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['checkProductDeletability', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function checkProductDeletability(ViewEvent $event): void
    {
        $product = $event->getControllerResult();

        if (!$product instanceof Produit || !$event->getRequest()->isMethodSafe(false)) {
            print_r(get_class($product));
            die("checkProductDeletability");

            return;
        }
        $produitRepository = $this->em->getRepository(Produit::class);
        print_r($produitRepository);
        die("checkProductDeletability");
        if (!$produitRepository->checkProductDeletability($product)) {
            throw new ProductNotDeletableException(sprintf('The product "%s" does not exist.', $product->getId()));
        }
    }
}
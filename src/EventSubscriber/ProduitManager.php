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

final class ProduitManager implements EventSubscriberInterface {
    private $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    public static function getSubscribedEvents(): array {
        return [
            KernelEvents::VIEW => ['onDeleteAction', EventPriorities::PRE_WRITE],
        ];
    }

    public function onDeleteAction(ViewEvent $event): void {
        $product = $event->getControllerResult();
        $request = $event->getRequest();
        $method = $request->getMethod();

        if (!$product instanceof Produit  || Request::METHOD_DELETE !== $method) {
            return;
        }

        $produitRepository = $this->em->getRepository(Produit::class);

        if (!$produitRepository->checkProductDeletability($product)) {
            throw new ProductNotDeletableException(sprintf('Le produit "%s" est présent dans une vente, il ne peut être supprimé.', $product->getId()));
        }
    }
}

<?php
// api/src/EventSubscriber/ClientManager.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Client;
use App\Exception\ClientNotDeletableException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Doctrine\ORM\EntityManagerInterface;

final class ClientManager implements EventSubscriberInterface {
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

        if (!$product instanceof Client  || Request::METHOD_DELETE !== $method) {
            return;
        }

        $clientRepository = $this->em->getRepository(Client::class);

        if (!$clientRepository->checkClientDeletability($product)) {
            throw new ClientNotDeletableException(sprintf('Le client "%s" est présent dans une vente, il ne peut être supprimé.', $product->getId()));
        }
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class MercureController extends AbstractController
{
        /**
     * @Route("/ping", name="ping", methods={"POST"})
     * @param HubInterface $hub
     * @return Response
     */
    public function __invoke(HubInterface $hub): Response
    {
        $update = new Update(
            'http://172.2O.10.2:8000/ping',
            json_encode(['status' => 'Out Of Stock'])
        );

        $hub->publish($update);

        return new Response('published');
    }
}

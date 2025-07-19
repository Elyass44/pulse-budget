<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/v1')]
class ApiController extends BaseApiController
{
    #[Route('/health', name: 'api_health', methods: ['GET'])]
    public function health(): JsonResponse
    {
        return $this->success([
            'status' => 'OK',
            'timestamp' => new \DateTime(),
            'version' => 'v1'
        ], 'API is running');
    }

    #[Route('/', name: 'api_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->success([
            'name' => 'Pulse Budget API',
            'version' => 'v1',
            'endpoints' => [
                'health' => '/api/v1/health',
            ]
        ], 'Welcome to Pulse Budget API');
    }
}

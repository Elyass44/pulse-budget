<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BaseApiController extends AbstractController
{
    public function __construct(
        private readonly ?LoggerInterface $logger = null
    )
    {
    }

    protected function error(string $message, int $status = Response::HTTP_BAD_REQUEST, array $errors = []): JsonResponse
    {
        $response = ['message' => $message];

        if (!empty($errors)) {
            $response['details'] = $errors;
        }

        $this->logger?->info('API Error Response', [
            'message'     => $message,
            'status'      => $status,
            'has_details' => !empty($errors)
        ]);

        return $this->json($response, $status);
    }

    protected function success($data = null, string $message = null): JsonResponse
    {
        $response = [];

        if ($message) {
            $response['message'] = $message;
        }

        if ($data !== null) {
            $response['data'] = $data;
        }

        return $this->json($response);
    }
}

<?php

namespace App\Controller;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CompanyController extends AbstractController
{

    public function __construct(
        private readonly ManagerRegistry $managerRegistry,
        private readonly ValidatorInterface $validator,
    )
    {
    }

    #[Route('/company', name: 'app_company', methods: ['GET'])]
    public function index(CompanyRepository $companyRepository): JsonResponse
    {
        $companies = $companyRepository->findAll();
        return $this->json($companies);
    }

    #[Route(
        '/company',
        name: 'company_create',
        methods: ['POST'],
    )]
    public function createCompany(Request $request): JsonResponse
    {
        $company = new Company();
        $company->setName($request->get('name'));
        $company->setPhoneNumber($request->get('phoneNumber'));
        $company->setDescription($request->get('description'));

        $errors = $this->validator->validate($company);
        if ($errors->count() > 0) {
            return $this->json($errors);
        }

        $entityManager = $this->managerRegistry->getManager();
        $entityManager->persist($company);
        $entityManager->flush();

        return $this->json([
            'message' => 'Company saved with ID:' . $company->getId(),
        ]);
    }

    #[Route(
        '/company/{id}',
        name: 'company_show',
        methods: ['GET'],
    )]
    public function showCompany(int $id, Request $request): JsonResponse
    {
        $companyRepository = new CompanyRepository($this->managerRegistry);
        $company = $companyRepository->find($id);
        if (null === $company) {
            throw $this->createNotFoundException('Company does not exists');
        }
        return $this->json($company);
    }

    #[Route(
        '/company/{id}',
        name: 'company_update',
        methods: ['PUT','PATCH'],
    )]
    public function updateCompany(int $id, Request $request): JsonResponse
    {
        $companyRepository = $this->managerRegistry->getRepository(Company::class);
        $company = $companyRepository->find($id);
        if (null === $company) {
            throw $this->createNotFoundException('Company does not exists');
        }
        $company->setName($request->get('name'));
        $company->setPhoneNumber($request->get('phoneNumber'));
        $company->setDescription($request->get('description'));
        $this->managerRegistry->getManager()->flush();
        return $this->json(['message' => 'Updated company with ID ' . $company->getId()]);
    }

    #[Route(
        '/company/{id}',
        name: 'company_delete',
        methods: ['DELETE'],
    )]
    public function deleteCompany(int $id): JsonResponse
    {
        $companyRepository = $this->managerRegistry->getRepository(Company::class);
        $company = $companyRepository->find($id);
        if (null === $company) {
            throw $this->createNotFoundException('Company does not exists');
        }
        $companyRepository->remove($company, true);
        return $this->json(['message' => 'Removed company with ID' . $company->getId()]);
    }
}

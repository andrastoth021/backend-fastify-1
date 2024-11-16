import fastify from 'fastify';
import { PetService } from '../service/pet.service';
import { PetRepository } from '../repository/pet.repository';
import { DbClient } from '../db';
import { PetToCreate } from '../entity/pet.type';
import { PetToCreateSchema } from '../schemas/PetToCreateSchema';
import { OwnerRepository } from '../repository/owner.repository';
import { OwnerService } from '../service/owner.service';

type Dependencies = {
  dbClient: DbClient;
}

export default function createApp(options = {}, dependencies: Dependencies) {
  const { dbClient } = dependencies;

  const petRepository = new PetRepository(dbClient);
  const petService = new PetService(petRepository);

  const ownerRepository = new OwnerRepository(dbClient);
  const ownerService = new OwnerService(ownerRepository);
  
  const app = fastify(options)

  app.get('/api/pets', async () => {
    const pets = await petService.getAll();
    return pets;
  })

  type PostPetsRoute = {
    Body: PetToCreate;
    Reply: PetToCreate;
  }
  app.post<PostPetsRoute>('/api/pets', {
    schema: PetToCreateSchema
  }, async (request, reply) => {
    const petToCreate = request.body;

    const created = await petService.create(petToCreate);
    reply.status(201);
    return created;
  })

  app.get('/api/owners', async (request, reply) => {
    const owners = await ownerService.getAll();
    return owners;
  });

  return app;
}
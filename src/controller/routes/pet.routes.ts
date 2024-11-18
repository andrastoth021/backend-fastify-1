import { FastifyPluginAsync } from "fastify"
import { PetToCreate } from '../../entity/pet.type';
import { PetToCreateSchema } from '../../schemas/PetToCreateSchema';

export const petRoutes: FastifyPluginAsync = async (app) => {

  // ENDPOINTS: /api/pets

  app.get('/', async () => {
    const pets = await app.petService.getAll();
    return pets;
  })

  type PostPetsRoute = {
    Body: PetToCreate;
    Reply: PetToCreate;
  }
  app.post<PostPetsRoute>('/', {
    schema: PetToCreateSchema
  }, async (request, reply) => {
    const petToCreate = request.body;

    const created = await app.petService.create(petToCreate);
    reply.status(201);
    return created;
  })
}

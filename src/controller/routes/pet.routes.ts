import { FastifyPluginAsync } from "fastify"
import { PetService } from "../../service/pet.service"
import { PetToCreate } from '../../entity/pet.type';
import { PetToCreateSchema } from '../../schemas/PetToCreateSchema';

type PluginOptions = {
  petService: PetService
}

export const petRoutes: FastifyPluginAsync<PluginOptions> = async (app, { petService }) => {

  // ENDPOINTS: /api/pets

  app.get('/', async () => {
    const pets = await petService.getAll();
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

    const created = await petService.create(petToCreate);
    reply.status(201);
    return created;
  })
}

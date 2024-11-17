import { FastifyPluginAsync } from "fastify"
import { PetService } from "../../service/pet.service"
import { PetToCreate } from '../../entity/pet.type';
import { PetToCreateSchema } from '../../schemas/PetToCreateSchema';

type PluginOptions = {
  petService: PetService
}

export const petRoutes: FastifyPluginAsync<PluginOptions> = async (app, { petService }) => {

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
}

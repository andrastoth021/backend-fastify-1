import { OwnerToCreateSchema } from '../../schemas/OwnerToCreateSchema';
import { OwnerToCreate } from '../../entity/owner.type';
import { FastifyPluginAsync } from 'fastify';

export const ownerRoutes: FastifyPluginAsync = async (app) => {

  // ENDPOINTS: /api/owners

  app.get('/', async () => {
    const owners = await app.ownerService.getAll();
    return owners;
  });
  
  type PostOwnersRoute = {
    Body: OwnerToCreate;
    Reply: OwnerToCreate
  }
  app.post<PostOwnersRoute>('/', {
    schema: OwnerToCreateSchema
  }, async (request, reply) => {
    const ownerToCreate = request.body;

    const created = await app.ownerService.create(ownerToCreate);
    reply.status(201);
    return created;
  });
}

import { OwnerToCreateSchema } from '../../schemas/OwnerToCreateSchema';
import { OwnerToCreate } from '../../entity/owner.type';
import { OwnerService } from '../../service/owner.service';
import { FastifyPluginAsync } from 'fastify';

type PluginOptions = {
  ownerService: OwnerService
}

export const ownerRoutes: FastifyPluginAsync<PluginOptions> = async (app, { ownerService }) => {

  app.get('/api/owners', async () => {
    const owners = await ownerService.getAll();
    return owners;
  });
  
  type PostOwnersRoute = {
    Body: OwnerToCreate;
    Reply: OwnerToCreate
  }
  app.post<PostOwnersRoute>('/api/owners', {
    schema: OwnerToCreateSchema
  }, async (request, reply) => {
    const ownerToCreate = request.body;

    const created = await ownerService.create(ownerToCreate);
    reply.status(201);
    return created;
  });
}

import { OwnerRepository } from "../repository/owner.repository";

export class OwnerService {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.read();
  }
}
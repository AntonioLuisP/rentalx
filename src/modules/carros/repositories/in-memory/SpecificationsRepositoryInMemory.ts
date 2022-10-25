import { Specification } from "@modules/carros/infra/typeorm/entities/Specififcation";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/carros/repositories/ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return allSpecification;
  }
}

export { SpecificationsRepositoryInMemory };

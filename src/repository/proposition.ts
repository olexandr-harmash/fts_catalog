import { Propos } from "../infra/db/models";
import { ProposAttributes, ProposRepository } from "../interfaces";
import { PropositionMapper } from "../mappers";

export class PropositionRepository implements ProposRepository {
    async getAll(): Promise<ProposAttributes[]> {
        return (await Propos.findAll()).map(p => PropositionMapper.toEntity(p));
    };
}
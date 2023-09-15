import { Propos } from "../infra/db/models";
import { ProposAttributes } from "../interfaces";

export class PropositionMapper {
    static toEntity(propos: Propos): ProposAttributes {
        return {
            propos_id: propos.propos_id,
            propos_name: propos.propos_name,
        }
    }
}
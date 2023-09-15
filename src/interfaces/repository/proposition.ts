import { ProposAttributes } from "..";

export interface ProposRepository {
    getAll: () => Promise<ProposAttributes[]>;
}
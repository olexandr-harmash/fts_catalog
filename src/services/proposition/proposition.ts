import { AppError, ProposAttributes, ProposRepository } from "../../interfaces";
import { Either, Result, left, right } from "../../interfaces/error/result";

type Response = Either<
    AppError.UnexpectedError |
    Result<any>,
    Result<ProposAttributes[]>
>

export class PropositionService {
    private _proposition: ProposRepository;

    constructor(repo: ProposRepository) {
        this._proposition = repo;
    };

    public async getAll(): Promise<Response> {
        let propos: ProposAttributes[];

        try {
            propos = await this._proposition.getAll();
            return right(Result.ok(propos));
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        }
    };
};
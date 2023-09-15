import * as express from 'express'
import { BaseController, Logger } from "../interfaces";
import { PropositionService } from "../services";

export class PropositionController extends BaseController {
    private _proposition: PropositionService;

    constructor(proposition: PropositionService) {
        super();

        this._proposition = proposition;
    };

    async getAll(req: express.Request, res: express.Response) {
        try {
            const result = await this._proposition.getAll();

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res, result);
            }
        } catch (err: any) {
            return this.fail(res, err);
        };
    };
};
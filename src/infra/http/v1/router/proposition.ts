import express from "express";
import { PropositionController } from "../../../../controllers/proposition";

export class PropositionRouter {
    private _proposition: PropositionController;

    constructor(proposition: PropositionController) {
        this._proposition = proposition;
    }

    Rest() {
        const router = express.Router();

        router.get('/item', (res, req) => { this._proposition.getAll(res, req) });

        return router;
    }
}
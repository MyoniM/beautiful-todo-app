import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export interface CustomRequest extends Request {
  value?: { body?: string };
}

export class CollectionsValidator {
  constructor() {}
  validateFavorite() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const val = await favoriteSchema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}

export const favoriteSchema = Joi.object().keys({
  collectionId: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

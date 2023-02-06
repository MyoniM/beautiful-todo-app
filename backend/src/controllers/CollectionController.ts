import CollectionRepository from '../repositories/CollectionRepository';
import { Request, Response, NextFunction } from 'express';
export default class CollectionController {
  constructor() {}
  async favoriteCollection(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    const { collectionId, favorite } = req.body;
    await CollectionRepository.favoriteCollection(
      collectionId,
      (req.user as any).id,
      favorite
    );
    return res.status(201).json({ success: true });
  }
  async getCollectionsWithTaskCount(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    return res
      .status(200)
      .json(
        await CollectionRepository.getCollectionsWithTaskCounts(req.user.id)
      );
  }
  async getASingleCollectionsWithTasks(
    req: Request | any,
    res: Response,
    next: NextFunction
  ) {
    return res
      .status(200)
      .json(
        await CollectionRepository.getASingleCollectionsWithTasks(
          req.user.id,
          req.params.id
        )
      );
  }
}

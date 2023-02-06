import prisma from '../db/db';
class CollectionsRepository {
  constructor() {}
  maxNestQuery = {
    subTasks: {
      include: {
        subTasks: {
          include: {
            subTasks: true,
          },
        },
      },
    },
  };
  // Get collections with tasks of a certain user
  async getCollectionsWithTaskCounts(userId) {
    return await prisma.collection
      .findMany({
        // Allow nesting subtasks only upto 3 level so it can work in accordance to the UI provided
        include: {
          tasks: {
            where: {
              userId,
            },
            select: {
              completed: true,
            },
          },
          UserFavoriteCollections: {
            select: {
              userId: true,
            },
          },
        },
      })
      .then((collections) =>
        collections.map((collection) => {
          return {
            id: collection.id,
            favorite: collection.UserFavoriteCollections.map(
              (e) => e.userId
            ).includes(userId),
            icon: collection.icon,
            name: collection.name,
            tasks: collection.tasks.length,
            completedTasks: collection?.tasks.filter((e) => e.completed).length,
          };
        })
      );
  }
  async getASingleCollectionsWithTasks(userId, collectionId) {
    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      // Allow nesting subtasks only upto 3 level so it can work in accordance to the UI provided
      include: {
        tasks: {
          include: {
            ...this.maxNestQuery,
          },
          where: {
            userId,
          },
          orderBy: {
            date: 'asc',
          },
        },
        UserFavoriteCollections: {
          select: {
            userId: true,
          },
        },
      },
    });
    return {
      id: collection?.id,
      favorite: collection?.UserFavoriteCollections.map(
        (e) => e.userId
      ).includes(userId),
      icon: collection?.icon,
      name: collection?.name,
      tasks: collection?.tasks,
    };
  }
  async favoriteCollection(id, userId, favorite) {
    if (!favorite) {
      // Delete many to many relation
      return await prisma.userFavoriteCollections.deleteMany({
        where: {
          userId,
          collectionId: id,
        },
      });
    }
    return await prisma.userFavoriteCollections.create({
      data: {
        userId,
        collectionId: id,
      },
    });
  }
}
export default new CollectionsRepository();

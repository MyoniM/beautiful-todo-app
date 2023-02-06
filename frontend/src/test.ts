import { ITask } from "./components/tasksContainer/TasksContainer";

export const mock_all: ITask[] = [
  {
    id: "b376f777-5082-4d19-8921-c5e279852088",
    title: "amazing todo by me",
    date: "2023-02-02T23:12:36.000Z",
    completed: true,
    collectionId: "0ce4b656-72a0-4af9-ad3d-a962b19d805a",
    taskId: null,
    userId: "a756d59f-a333-43eb-a573-a5f39def6e7f",
    subTasks: [],
  },
  {
    id: "07f30395-45f3-429a-9692-c1c4937e9aa9",
    title: "Works ?",
    date: "2025-02-02T23:12:36.000Z",
    completed: false,
    collectionId: "0ce4b656-72a0-4af9-ad3d-a962b19d805a",
    taskId: null,
    userId: "a756d59f-a333-43eb-a573-a5f39def6e7f",
    subTasks: [
      {
        id: "911cd815-50b1-43cb-aa68-435c2a73373a",
        title: "bro this might actually work hehe lets goooo pt2",
        date: "2023-02-02T23:12:36.000Z",
        completed: true,
        collectionId: null,
        taskId: "07f30395-45f3-429a-9692-c1c4937e9aa9",
        userId: "a756d59f-a333-43eb-a573-a5f39def6e7f",
        subTasks: [],
      },
      {
        id: "65421279-e950-4e97-8ef5-7aa81c0de649",
        title: "bro this might actually work hehe lets goooo pt2",
        date: "2023-02-02T23:12:36.000Z",
        completed: true,
        collectionId: null,
        taskId: "07f30395-45f3-429a-9692-c1c4937e9aa9",
        userId: "a756d59f-a333-43eb-a573-a5f39def6e7f",
        subTasks: [
          {
            id: "c039cecf-f155-4119-abe5-a8a09cd8d883",
            title: "bro this might actually work hehe lets goooo pt2",
            date: "2023-02-02T23:12:36.000Z",
            completed: true,
            collectionId: null,
            taskId: "65421279-e950-4e97-8ef5-7aa81c0de649",
            userId: "a756d59f-a333-43eb-a573-a5f39def6e7f",
            subTasks: [],
          },
        ],
      },
    ],
  },
];

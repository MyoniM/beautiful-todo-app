import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, tokenStr } from "../../constant";
import {
  deepCloneCollectionForEdit,
  countSubTasksCompleted,
  countSubTasks,
} from "../../utils";
import { TaskCollapsible } from "../TaskCard/TaskCard";
import AddSubTaskModal from "../taskModals/AddSubTaskModal";
import DeleteTaskModal from "../taskModals/DeleteTaskModal";
import EditTaskModal from "../taskModals/EditTaskModal";
import classes from "./tasksContainer.module.css";
const { Title } = Typography;

export interface ITask {
  collectionId: string | null;
  completed: boolean;
  date: string;
  id: string;
  subTasks: ITask[];
  taskId: string | null;
  title: string;
  userId: string;
}

export interface ITasks {
  tasks: ITask[];
}

export default function TasksContainer({ tasks }: ITasks) {
  const [taskModalState, setTaskModalState] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { collectionId } = useParams();

  const mutation = useMutation({
    mutationFn: (newTask: any) => {
      return axios.put(`${baseUrl}/tasks/updateTask`, newTask, {
        headers: { Authorization: tokenStr() },
      });
    },
    onMutate: async (editedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", collectionId] });

      const previousTasks = queryClient.getQueryData(["tasks", collectionId]);

      queryClient.setQueryData(["tasks", collectionId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          tasks: deepCloneCollectionForEdit(
            old.tasks,
            editedTask.id,
            editedTask.task
          ),
        };
      });

      return { previousTasks };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks", collectionId], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", collectionId] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const handleFinish = (task: ITask) => {
    mutation.mutate({
      id: task.id,
      task: {
        date: task.date,
        title: task.title,
        completed: task.completed,
      },
    });
  };
  const getCompleted = (tasks: ITask[]) => {
    return tasks.filter(
      (task) => countSubTasksCompleted(task) == countSubTasks(task)
    );
  };

  const getIncomplete = (tasks: ITask[]) => {
    return tasks.filter(
      (task) => countSubTasksCompleted(task) != countSubTasks(task)
    );
  };

  return (
    <>
      <DeleteTaskModal
        taskModalState={taskModalState}
        setTaskModalState={setTaskModalState}
      />
      <AddSubTaskModal
        taskModalState={taskModalState}
        setTaskModalState={setTaskModalState}
      />
      <EditTaskModal
        handleFinish={handleFinish}
        taskModalState={taskModalState}
        setTaskModalState={setTaskModalState}
      />
      <div className={classes.tasksWrapper}>
        <Title level={5}>Tasks - {getIncomplete(tasks).length}</Title>
        {getIncomplete(tasks).length > 0 ? (
          <TaskCollapsible
            handleFinish={handleFinish}
            data={getIncomplete(tasks)}
            setTaskModalState={setTaskModalState}
          />
        ) : (
          <img
            src={`/empty.png`}
            width="70px"
            alt="Your SVG"
            style={{ display: "block", margin: "0 auto" }}
          />
        )}
      </div>
      {getCompleted(tasks).length == 0 ? null : (
        <div className={classes.tasksWrapper}>
          <Title level={5}>Completed - {getCompleted(tasks).length}</Title>
          <TaskCollapsible
            handleFinish={handleFinish}
            data={getCompleted(tasks)}
            setTaskModalState={setTaskModalState}
          />
        </div>
      )}
    </>
  );
}

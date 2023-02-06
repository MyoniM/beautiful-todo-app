import {
  CalendarOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Checkbox,
  Collapse,
  Space,
  Typography,
  Button,
  theme,
} from "antd";
import type { MenuProps } from "antd";

import classes from "./taskCard.module.css";
import moment from "moment";
import React, { useContext } from "react";
import { SelectedTaskContext } from "../../context/selectedTaskContext";
import {
  countSubTasksCompleted,
  countSubTasks,
  getGreenToRed,
} from "../../utils";
import { ITask } from "../tasksContainer/TasksContainer";

const { Panel } = Collapse;
const { Text } = Typography;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Add sub-task",
  },
  {
    key: "2",
    label: "Edit task",
  },
  {
    key: "3",
    label: "Delete task",
  },
];
export const TaskCollapsible = ({
  data,
  setTaskModalState,
  handleFinish,
}: {
  data: ITask[];
  setTaskModalState: React.Dispatch<React.SetStateAction<string | null>>;
  handleFinish: (value: any) => void;
}) => {
  const [, setSelectedTask] = useContext(SelectedTaskContext)!;
  const { token } = theme.useToken();
  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    setTaskModalState(e.key);
  };
  const panelStyle = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  function buildCollapsible(data: any) {
    const activeKeys: string[] = [];
    const panelComponents = data.map((task: ITask) => {
      activeKeys.push(task.id);
      return (
        <Panel
          style={{ position: "relative", ...panelStyle }}
          header={[
            <Space>
              <Text>
                <Checkbox
                  checked={task.completed}
                  onChange={() =>
                    handleFinish({ ...task, completed: !task.completed })
                  }
                />
              </Text>
              <Text
                style={{ fontSize: "1.1em" }}
                delete={countSubTasksCompleted(task) == countSubTasks(task)}
              >
                {task.title}
              </Text>
            </Space>,
          ]}
          key={task.id}
        >
          <Space align="center">
            {task.subTasks.length !== 0 ? (
              <div className={classes.dataItem}>
                <Text type="secondary">
                  <UnorderedListOutlined />
                </Text>
                <Text type="secondary">
                  {countSubTasksCompleted(task)} / {countSubTasks(task)}
                </Text>
              </div>
            ) : null}
            <div
              className={classes.dataItem}
              style={{
                color: getGreenToRed(
                  (countSubTasksCompleted(task) / countSubTasks(task)) * 100
                ),
              }}
            >
              <CalendarOutlined />
              <Text
                style={{
                  color: getGreenToRed(
                    (countSubTasksCompleted(task) / countSubTasks(task)) * 100
                  ),
                }}
              >
                {moment(new Date(task.date)).fromNow()}
              </Text>
            </div>
          </Space>
          {buildCollapsible(task.subTasks)}

          <Dropdown
            className={classes.more}
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Button
              onClick={() => setSelectedTask(task)}
              type="text"
              style={{ marginLeft: "100%" }}
              icon={<EditOutlined />}
            />
          </Dropdown>
        </Panel>
      );
    });
    return (
      <Collapse
        defaultActiveKey={activeKeys}
        expandIconPosition={"end"}
        bordered={false}
        style={{ width: "100%", background: "transparent" }}
        ghost={false}
        collapsible="icon"
      >
        {React.Children.toArray(panelComponents)}
      </Collapse>
    );
  }
  return buildCollapsible(data);
};

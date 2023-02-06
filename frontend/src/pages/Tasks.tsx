import { MenuProps, Space } from "antd";
import { Layout, Menu, Typography } from "antd";
import TasksView from "../views/TasksView";

import { Link, useParams } from "react-router-dom";
import { useCollections } from "../components/collectionsContainer/CollectionsContainer";
import { getMenuFromData } from "../constant";

const { Text } = Typography;
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Tasks() {
  const { status, data } = useCollections();
  const menuItems = getMenuFromData(data);
  const { collectionId } = useParams();

  if (status === "loading") return null;
  const items: MenuItem[] = [
    getItem(<Text strong>Collections</Text>, "collections", null, [
      ...menuItems?.map((e: any) =>
        getItem(
          "",
          e.id,
          <Link to={e.link}>
            <Space>
              <div style={{ width: 40 }}>
                <img src={e.src} height="30px" alt="Logo" />
              </div>{" "}
              {e.name}
            </Space>
          </Link>
        )
      ),
    ]),
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        reverseArrow={false}
      >
        <Menu
          defaultSelectedKeys={[collectionId!]}
          defaultOpenKeys={["collections"]}
          inlineIndent={0}
          style={{ border: "none", backgroundColor: "transparent" }}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <TasksView />
      </Layout>
    </Layout>
  );
}

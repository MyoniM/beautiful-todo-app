import { useEffect, useState } from "react";
import { ConfigProvider, Layout, theme } from "antd";

import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import { ModalContext } from "./context/modalContext";
import AddTaskModal from "./components/taskModals/AddTaskModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { SelectedTaskContext } from "./context/selectedTaskContext";
import { ITask } from "./components/tasksContainer/TasksContainer";
function App() {
  const navigate = useNavigate();

  const state = useState<boolean>(false);
  const selectedTaskState = useState<ITask | null>(null);

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (!Cookies.get("login-info")) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#E75480",
            colorWhite: isDarkMode ? "#141414" : "#fff",
          },
        }}
      >
        <SelectedTaskContext.Provider value={selectedTaskState}>
          <ModalContext.Provider value={state}>
            <Navbar clicked={isDarkMode} handleClick={handleClick} />
            <Layout style={{ minHeight: "100vh" }}>
              <Outlet />
            </Layout>
            <AddTaskModal />
          </ModalContext.Provider>
        </SelectedTaskContext.Provider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;

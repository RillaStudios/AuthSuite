import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./css/index.css";
import { MantineProvider } from "@mantine/core";
import { AuthThemes } from "./theme/AuthThemes";
import { Notifications } from "@mantine/notifications";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <MantineProvider theme={AuthThemes[0]} defaultColorScheme="auto">
          <Notifications />
          <AppRouter />
        </MantineProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;

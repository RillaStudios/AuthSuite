import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "./css/index.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { LoadingProvider } from "./context/LoadingContext";
import { NavActiveProdiver } from "./context/NavActiveProvider";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NavActiveProdiver>
      <LoadingProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </LoadingProvider>
    </NavActiveProdiver>
  );
}

function App() {
  return (
    <Providers>
      <MainApp />
    </Providers>
  );
}

function MainApp() {
  const { theme } = useTheme();
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <AppRouter />
    </MantineProvider>
  );
}

export default App;

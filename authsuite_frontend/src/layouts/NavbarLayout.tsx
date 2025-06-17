import {
  ActionIcon,
  AppShell,
  Burger,
  Code,
  Group,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../components/navbar/Navbar";
import { IconBell, IconUserCircle } from "@tabler/icons-react";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h={"100%"} px={"md"}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={2}>AuthSuite</Title>
            <Code
              fw={700}
              style={{ backgroundColor: "var(--mantine-color-primary-6)" }}
            >
              v{import.meta.env.VITE_APP_VERSION}
            </Code>
          </Group>
          <Group gap="xs">
            <ActionIcon variant="subtle" radius={"xl"} size={"lg"}>
              <IconBell size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" radius={"xl"} size={"lg"}>
              <IconUserCircle size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar w={"auto"}>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

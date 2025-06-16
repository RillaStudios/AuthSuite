import { Box, Card, Center, LoadingOverlay, Text, Title } from "@mantine/core";
import AuthForm from "../components/forms/AuthForm";
import { useDisclosure } from "@mantine/hooks";

export default function AuthPage() {
  const [visible, { open, close }] = useDisclosure(false);

  return (
    <div className="animated-gradient-bg">
      <Center h="100vh">
        <Box pos={"relative"}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Card padding="lg" radius="md" shadow="md" miw={350}>
            <Title order={2} ta="center">
              AuthSuite
            </Title>
            <AuthForm openLoading={open} closeLoading={close} />
            <Text c="dimmed" ta={"center"} size="sm" mt={"md"}>
              Powered by Rilla Studios.
            </Text>
          </Card>
        </Box>
      </Center>
    </div>
  );
}

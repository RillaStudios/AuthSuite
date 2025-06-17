import { useEffect } from "react";
import { useNavActive } from "../context/NavActiveProvider";
import NavbarLayout from "../layouts/NavbarLayout";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Box,
  ColorInput,
  Divider,
  Group,
  Input,
  SimpleGrid,
  Space,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

export default function AuthSuiteSettings() {
  const { setActiveLabel } = useNavActive();

  useEffect(() => {
    setActiveLabel("Settings");
  }, []);

  return (
    <NavbarLayout>
      <Tabs defaultValue="first">
        <Tabs.List>
          <Tabs.Tab value="first">First tab</Tabs.Tab>
          <Tabs.Tab value="second">Second tab</Tabs.Tab>
          <Tabs.Tab value="theme">Theme</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="theme">
          <SimpleGrid cols={{ base: 1, lg: 3 }}>
            <div>
              <Box m={"lg"}>
                <Title order={2} mb={"sm"}>
                  Logo Settings
                </Title>
                <Text>Customize the logos of your suite.</Text>
                <Divider my={"md"} />
                <Input.Wrapper label="Logo Image">
                  <Input.Description>
                    Choose a logo for your suite.
                  </Input.Description>
                  <Dropzone
                    onDrop={(files) => console.log("accepted files", files)}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    mt={"calc(var(--mantine-spacing-xs) / 2)"}
                  >
                    <Group
                      justify="center"
                      gap="md"
                      style={{ pointerEvents: "none" }}
                    >
                      <Dropzone.Accept>
                        <IconUpload
                          size={52}
                          color="var(--mantine-color-blue-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size={52}
                          color="var(--mantine-color-red-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto
                          size={52}
                          color="var(--mantine-color-dimmed)"
                          stroke={1.5}
                        />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline ta={"center"}>
                          Drag image here or click to select file
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                          Attach as many files as you like, each file should not
                          exceed 5mb
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                </Input.Wrapper>
                <Space h="sm" />
                <Input.Wrapper label="Favicon Image">
                  <Input.Description>
                    Choose a favicon for your suite.
                  </Input.Description>
                  <Dropzone
                    onDrop={(files) => console.log("accepted files", files)}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    mt={"calc(var(--mantine-spacing-xs) / 2)"}
                  >
                    <Group
                      justify="center"
                      gap="md"
                      style={{ pointerEvents: "none" }}
                    >
                      <Dropzone.Accept>
                        <IconUpload
                          size={52}
                          color="var(--mantine-color-blue-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size={52}
                          color="var(--mantine-color-red-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto
                          size={52}
                          color="var(--mantine-color-dimmed)"
                          stroke={1.5}
                        />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline ta={"center"}>
                          Drag image here or click to select file
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                          Attach as many files as you like, each file should not
                          exceed 5mb
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                </Input.Wrapper>
              </Box>
            </div>
            <div>
              <Box m={"lg"}>
                <Title order={2} mb={"sm"}>
                  Color Settings
                </Title>
                <Text>Customize the color scheme of your suite.</Text>
                <Divider my={"md"} />
                <ColorInput
                  label="Primary Color"
                  description="Choose a primary color for your suite."
                  defaultValue="#20a2fe"
                />
                <Space h="sm" />
                <ColorInput
                  label="Secondary Color"
                  description="Choose a secondary color for your suite."
                  defaultValue="#3cdb76"
                />
                <Space h="sm" />
                <ColorInput
                  label="Tertiary Color"
                  description="Choose a tertiary color for your suite."
                  defaultValue="#ff704d"
                />
              </Box>
            </div>
            <div>
              <Box m={"lg"}>
                <Title order={2} mb={"sm"}>
                  Font Settings
                </Title>
                <Text>Customize the color scheme of your suite.</Text>
                <Divider my={"md"} />
                <ColorInput
                  label="Primary Color"
                  description="Choose a primary color for your suite."
                  defaultValue="#20a2fe"
                />
                <Space h="sm" />
                <ColorInput
                  label="Secondary Color"
                  description="Choose a secondary color for your suite."
                  defaultValue="#3cdb76"
                />
                <Space h="sm" />
                <ColorInput
                  label="Tertiary Color"
                  description="Choose a tertiary color for your suite."
                  defaultValue="#ff704d"
                />
              </Box>
            </div>
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </NavbarLayout>
  );
}

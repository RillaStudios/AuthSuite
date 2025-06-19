import {
  SimpleGrid,
  Title,
  Text,
  Divider,
  FileInput,
  Space,
  Select,
  Group,
  Button,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import type Theme from "../../types/theme/ThemeType";
import { useTheme } from "../../context/ThemeProvider";
import { useEffect, useState } from "react";
import ColorSelection from "../inputs/ColorSelection";
import isEqual from "fast-deep-equal";
import { useAuth } from "../../context/AuthProvider";
import { notifications } from "@mantine/notifications";

export default function ThemeSettingForm() {
  const { currentThemeType, defaultTheme, saveTheme } = useTheme();

  const { user } = useAuth();

  const [newTheme, setNewTheme] = useState<Theme>(currentThemeType);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    setNewTheme(currentThemeType);
  }, [currentThemeType]);

  return (
    <>
      <SimpleGrid cols={{ base: 1, lg: 3 }}>
        <div>
          <Title order={2}>Logo Settings</Title>
          <Text>Customize the logos of your suite.</Text>
          <Divider my={"md"} />
          <FileInput
            label="Logo Image"
            description="Choose a logo for your suite."
            leftSection={<IconPhoto size={18} />}
            placeholder="Upload logo"
            clearable
            onChange={(file) => {
              setLogoFile(file);
            }}
          />
          <Space h="sm" />
          <FileInput
            label="Favicon Image"
            description="Choose a favicon for your suite."
            leftSection={<IconPhoto size={18} />}
            placeholder="Upload favicon"
            clearable
            onChange={(file) => {
              setFaviconFile(file);
            }}
          />
        </div>
        <div>
          <Title order={2}>Color Settings</Title>
          <Text>Customize the color scheme of your suite.</Text>
          <Divider my={"md"} />
          <ColorSelection
            label="Primary Color"
            description="Choose a primary color for your suite."
            value={newTheme.primaryColor}
            defaultValue={currentThemeType.primaryColor}
            onChangeEnd={(value) => {
              setNewTheme((prev) => ({
                ...prev,
                primaryColor: value || "#20a2fe",
              }));
              console.log(value);
            }}
          />
          <Space h="sm" />
          <ColorSelection
            label="Secondary Color"
            description="Choose a secondary color for your suite."
            defaultValue={currentThemeType.secondaryColor}
            value={newTheme.secondaryColor}
            onChangeEnd={(value) => {
              setNewTheme((prev) => ({
                ...prev,
                secondaryColor: value || "#ff6b6b",
              }));
            }}
          />
          <Space h="sm" />
          <ColorSelection
            label="Tertiary Color"
            description="Choose a tertiary color for your suite."
            value={newTheme.tertiaryColor}
            defaultValue={currentThemeType.tertiaryColor}
            onChangeEnd={(value) => {
              setNewTheme((prev) => ({
                ...prev,
                tertiaryColor: value || "#ff704d",
              }));
            }}
          />
        </div>
        <div>
          <Title order={2}>Font Settings</Title>
          <Text>Customize the color scheme of your suite.</Text>
          <Divider my={"md"} />
          <Select
            label="Title Font"
            description="Choose a font for titles in your suite."
            placeholder="Pick value"
            data={[
              { value: "DM Sans", label: "DM Sans" },
              { value: "Montserrat", label: "Montserrat" },
              { value: "Roboto", label: "Roboto" },
              { value: "Inter", label: "Inter" },
            ]}
          />
          <Space h="sm" />
          <Select
            label="Body Font"
            description="Choose a font for body text in your suite."
            placeholder="Pick value"
            data={[
              { value: "Roboto", label: "Roboto" },
              { value: "Open Sans", label: "Open Sans" },
              { value: "Lato", label: "Lato" },
              { value: "Inter", label: "Inter" },
            ]}
          />
        </div>
      </SimpleGrid>
      <Group mt="xl">
        <Button
          disabled={isEqual(newTheme, currentThemeType)}
          onClick={async () => {
            newTheme.lastUpdated = new Date();
            newTheme.lastUpdatedBy = user?.id;

            // Prepare FormData for file upload
            const formData = new FormData();

            // Remove logo and favicon from newTheme before adding to FormData
            const { logo, favicon, ...themeWithoutFiles } = newTheme;

            // Add each property of newTheme (without logo and favicon) as a separate FormData entry
            Object.entries(themeWithoutFiles).forEach(([key, value]) => {
              // Convert Date objects to ISO strings
              if (value instanceof Date) {
                formData.append(key, value.toISOString());
              } else if (value !== undefined) {
                formData.append(key, String(value));
              }
            });

            if (logoFile instanceof File && logoFile.size > 0) {
              formData.append("logo", logoFile);
            }
            if (faviconFile instanceof File && faviconFile.size > 0) {
              formData.append("favicon", faviconFile);
            }

            await saveTheme(formData)
              .then(() => {
                notifications.show({
                  title: "Theme saved",
                  message: "Your theme settings have been saved successfully.",
                  color: "green",
                });
              })
              .catch((error) => {
                console.error("Error saving theme:", error);
                notifications.show({
                  title: "Error saving theme",
                  message: "There was an error saving your theme settings.",
                  color: "red",
                });
              });
          }}
        >
          Save Settings
        </Button>
        <Button
          disabled={isEqual(
            {
              ...currentThemeType,
              lastUpdated: undefined,
              lastUpdatedBy: undefined,
            },
            {
              ...defaultTheme,
              lastUpdated: undefined,
              lastUpdatedBy: undefined,
            },
          )}
          variant="outline"
          onClick={() => {
            // Prepare FormData for file upload
            const formData = new FormData();

            // Add each property of newTheme (without logo and favicon) as a separate FormData entry
            Object.entries(defaultTheme).forEach(([key, value]) => {
              // Convert Date objects to ISO strings
              if (value instanceof Date) {
                formData.append(key, value.toISOString());
              } else if (value !== undefined) {
                formData.append(key, String(value));
              }
            });

            formData.delete("logo");
            formData.delete("favicon");

            formData.append("lastUpdated", new Date().toISOString());
            formData.append("lastUpdatedBy", user?.id!);

            formData.append("reset", "true");

            // Debug: print FormData entries
            for (const [key, value] of formData.entries()) {
              console.log(`FormData ${key}:`, value);
            }

            return saveTheme(formData)
              .then(() => {
                notifications.show({
                  title: "Theme reset",
                  message: "Your theme settings have been reset to default.",
                  color: "blue",
                });
              })
              .catch((error) => {
                console.error("Error resetting theme:", error);
                notifications.show({
                  title: "Error resetting theme",
                  message: "There was an error resetting your theme settings.",
                  color: "red",
                });
              });
          }}
        >
          Reset To Default
        </Button>
      </Group>
    </>
  );
}

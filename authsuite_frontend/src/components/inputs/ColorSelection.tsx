import { ColorInput, ActionIcon, Group } from "@mantine/core";
import { IconArrowBackUp, IconColorPicker } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

/* 
A ColorSelection component that allows users to select a color
using a color input field with an eyedropper tool and a reset button.
This component is designed to be used in a theme customization context.

@author IFD
@date 2025-06-18
*/
export default function ColorSelection({
  value,
  defaultValue,
  onChangeEnd,
  label,
  description,
}: {
  value: string;
  defaultValue: string;
  onChangeEnd: (value: string) => void;
  label: string;
  description?: string;
}) {
  /* 
   A function to handle the eyedropper tool functionality.
   It checks if the Eyedropper API is supported in the browser,
   and if so, it opens the eyedropper tool to select a color.
   If the API is not supported, it shows a notification to the user.

   @author IFD
   @date 2025-06-18
  */
  const handleEyedropper = async () => {
    if ("EyeDropper" in window) {
      // @ts-ignore
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open();
        onChangeEnd(result.sRGBHex);
      } catch (e) {
        console.error("Eyedropper API error:", e);
      }
    } else {
      notifications.show({
        title: "Eyedropper API not supported",
        message: "Your browser does not support the Eyedropper API.",
        color: "red",
      });
    }
  };

  return (
    <ColorInput
      label={label}
      description={description}
      value={value}
      closeOnColorSwatchClick
      onChangeEnd={onChangeEnd}
      rightSectionProps={{
        style: {
          width: "auto",
          paddingRight: "3px",
        },
      }}
      rightSection={
        <Group gap={"3px"} wrap="nowrap">
          {value !== defaultValue && (
            <ActionIcon
              onClick={() => onChangeEnd(defaultValue)}
              size={"md"}
              variant="subtle"
              color="var(--mantine-color-dimmed)"
            >
              <IconArrowBackUp size={16} />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleEyedropper}
            size={"md"}
            variant="subtle"
            color="var(--mantine-color-dimmed)"
          >
            <IconColorPicker size={16} />
          </ActionIcon>
        </Group>
      }
      swatches={[
        "#2e2e2e",
        "#868e96",
        "#fa5252",
        "#e64980",
        "#be4bdb",
        "#7950f2",
        "#4c6ef5",
        "#228be6",
        "#15aabf",
        "#12b886",
        "#40c057",
        "#82c91e",
        "#fab005",
        "#fd7e14",
      ]}
    />
  );
}

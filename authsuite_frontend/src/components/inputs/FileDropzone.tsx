import { Group, Input, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import type { Accept, FileRejection } from "react-dropzone";

/* 
A React component for a file dropzone that allows users to 
drag and drop files or select them via a file dialog.
This component uses Mantine's Dropzone and Input components 
to create a user-friendly interface for file uploads.

@author IFD
@date 2025-06-16
*/
export default function FileDropzone({
  label,
  description,
  onDrop,
  onReject,
  maxSize = 5 * 1024 ** 2,
  maxFiles = Infinity,
  accept = IMAGE_MIME_TYPE,
}: {
  label?: string;
  description?: string;
  onDrop: (files: File[]) => void;
  onReject: (files: FileRejection[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[] | Accept | undefined;
}) {
  return (
    <Input.Wrapper label={label}>
      <Input.Description>{description}</Input.Description>
      <Dropzone
        onDrop={(files) => onDrop(files)}
        onReject={(files) => onReject(files)}
        maxSize={maxSize}
        maxFiles={maxFiles}
        accept={accept}
        mt={"calc(var(--mantine-spacing-xs) / 2)"}
      >
        <Group justify="center" gap="md" style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size={52}
              color="var(--mantine-color-blue-6)"
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
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
              Attach as many files as you like, each file should not exceed{" "}
              {maxSize / 1024}KB
            </Text>
          </div>
        </Group>
      </Dropzone>
    </Input.Wrapper>
  );
}

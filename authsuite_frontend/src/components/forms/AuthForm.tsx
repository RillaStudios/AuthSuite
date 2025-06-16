import { ActionIcon, Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../../context/AuthProvider";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

/* 
A form component for user login, utilizing Mantine's form handling
and validation features. It includes fields for email and password,
and provides functionality to show or hide the password input.

Note that the password is managed in local state only, and not in the form state.
This is to increase security by not storing the password in the form state and 
having it visible in the DOM.

@author IFD
@date 2025-06-15
*/
export default function AuthForm({
  openLoading,
  closeLoading,
}: {
  openLoading: () => void;
  closeLoading: () => void;
}) {
  // Use the custom authentication context to access login functionality
  const { login } = useAuth();

  //Effect to show or hide the password
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Manage password in local state only
  const [password, setPassword] = useState("");

  /* 
  A form for user authentication, using Mantine's useForm hook.
  It initializes the form with email and password fields,
  and sets up validation rules for each field.

  @author IFD
  @date 2025-06-15
  */
  const authForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  /* 
  A function to handle the login process.
  It opens a loading state, attempts to log in with the provided
  email and password, and handles errors based on the response status.
  If the login is successful, it will proceed without further action.

  @param {Object} values - The form values containing email and password.

  @author IFD
  @date 2025-06-15
  */
  const handleLogin = async (values: { email: string }) => {
    // Validate password before submit
    if (!password) {
      setPasswordError("Password cannot be empty");
      return;
    }
    setPasswordError(null);

    openLoading();

    await login(values.email, password)
      .catch((error) => {
        const status = error?.response?.status;

        console.error("Login failed:", error, "Status code:", status);
        // Optionally, show a specific message based on status
        let message = "Login failed. Please try again.";
        if (status === 404) {
          message = "User not found.";
          authForm.setErrors({ email: message });
        } else if (status === 401) {
          message = "Invalid credentials.";
          setPasswordError(message);
        }
      })
      .finally(() => {
        closeLoading();
      });
  };

  return (
    <form onSubmit={authForm.onSubmit((values) => handleLogin(values))}>
      <Box my={"md"}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter your email"
          key={authForm.key("email")}
          {...authForm.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          rightSection={
            <ActionIcon c={"dimmed"} variant="transparent">
              {showPassword ? (
                <IconEyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <IconEye onClick={() => setShowPassword(true)} />
              )}
            </ActionIcon>
          }
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          mt={"sm"}
          key={authForm.key("password")}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={passwordError}
          autoComplete="off"
        />
        <Group justify="center" mt="xl">
          <Button type="submit" w={"100%"}>
            Login
          </Button>
        </Group>
      </Box>
    </form>
  );
}

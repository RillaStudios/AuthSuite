import { Button } from "@mantine/core";
import NavbarLayout from "../layouts/NavbarLayout";
import { generateColors } from "@mantine/colors-generator";

export default function HomePage() {
  return (
    <NavbarLayout>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>
      <Button
        onClick={() => {
          const colors = generateColors("#FFC0CB");

          console.log("Colors created:", colors);
        }}
      >
        Click Me
      </Button>
      {/* Add more components or content as needed */}
    </NavbarLayout>
  );
}

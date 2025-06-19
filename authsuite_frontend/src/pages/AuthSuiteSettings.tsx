import { useEffect, useState } from "react";
import { useNavActive } from "../context/NavActiveProvider";
import NavbarLayout from "../layouts/NavbarLayout";
import { Tabs } from "@mantine/core";
import ThemeSettingForm from "../components/forms/ThemeSettingForm";

export default function AuthSuiteSettings() {
  const { setActiveLabel } = useNavActive();

  const TAB_VALUES = ["first", "second", "theme"];

  // Get initial tab from hash or fallback to "first"
  const getInitialTab = () => {
    const hash = window.location.hash.replace("#", "");
    return TAB_VALUES.includes(hash) ? hash : "first";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab());

  useEffect(() => {
    setActiveLabel("Settings");
  }, []);

  // Update tab if hash changes (e.g., user navigates back/forward)
  useEffect(() => {
    const onHashChange = () => setActiveTab(getInitialTab());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Update hash when tab changes
  const handleTabChange = (value: string | null) => {
    if (value) {
      window.location.hash = value;
      setActiveTab(value);
    }
  };

  return (
    <NavbarLayout>
      <Tabs defaultValue={activeTab} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="first">First tab</Tabs.Tab>
          <Tabs.Tab value="second">Second tab</Tabs.Tab>
          <Tabs.Tab value="theme">Theme</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="theme" m={"lg"}>
          <ThemeSettingForm />
        </Tabs.Panel>
      </Tabs>
    </NavbarLayout>
  );
}

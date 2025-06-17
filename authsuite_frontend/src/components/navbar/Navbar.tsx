import {
  IconLayoutDashboard,
  IconLicense,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "../../css/Navbar.module.css";
import { LinksGroup } from "./NavbarLinksGroup";
import { Box, Group, UnstyledButton } from "@mantine/core";
import { useNavActive } from "../../context/NavActiveProvider";
import { useNavigate } from "react-router-dom";

const data = [
  { label: "Dashboard", icon: IconLayoutDashboard, link: "/" },
  {
    label: "Market news",
    icon: IconLicense,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    icon: IconLicense,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconLicense },
  { label: "Contracts", icon: IconLicense },
  {
    label: "Security",
    icon: IconLicense,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

export function Navbar() {
  const { activeLabel, setActiveLabel } = useNavActive();

  const navigate = useNavigate();

  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UnstyledButton
          className={classes.footerButton}
          data-active={"Switch Site" === activeLabel || undefined}
          onClick={(event) => event.preventDefault()}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }} h={30}>
              <IconSwitchHorizontal className={classes.linkIcon} size={25} />
              Switch Site
            </Box>
          </Group>
        </UnstyledButton>
        <UnstyledButton
          className={classes.footerButton}
          data-active={"Settings" === activeLabel || undefined}
          onClick={function (event) {
            event.preventDefault();
            navigate("/settings");
            setActiveLabel("Settings");
          }}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }} h={30}>
              <IconSettings className={classes.linkIcon} size={25} />
              Settings
            </Box>
          </Group>
        </UnstyledButton>
      </div>
    </nav>
  );
}

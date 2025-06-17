import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Box, Collapse, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../../css/NavbarLinksGroup.module.css";
import { useNavActive } from "../../context/NavActiveProvider";
import { useNavigate } from "react-router-dom";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const { setActiveLabel, activeLabel } = useNavActive();
  const navigate = useNavigate();

  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      key={link.label}
      data-active={link.label === activeLabel || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActiveLabel(link.label);
        navigate(link.link);
        return;
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (!hasLinks) {
            setActiveLabel(label);
            navigate(link || "/");
          }
          setOpened((o) => !o);
        }}
        className={classes.control}
        data-active={(!hasLinks && label === activeLabel) || undefined}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box className={classes.linkIcon}>
              <Icon size={25} />
            </Box>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

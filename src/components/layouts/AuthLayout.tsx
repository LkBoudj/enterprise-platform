import { Box, Flex, Container, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../ui/aside/ThemeToggle";

const AuthLayout = () => {
  return (
    <Stack
      mih="100vh"

    >
      {/* Top bar */}
      <Flex
        px="md"
        py="md"
        justify="flex-end"
        align="center"
      >
        <ThemeToggle collapsed />
      </Flex>

      {/* Centered content */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        px="md"
      >

        <Outlet />

      </Flex>
    </Stack>
  );
};

export default AuthLayout;

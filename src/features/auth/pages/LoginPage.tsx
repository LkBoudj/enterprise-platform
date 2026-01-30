import React from "react";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { useLoginController } from "../hooks/useLoginController";

const LoginPage: React.FC = () => {
  const { onSubmit, form, loading, navigate } = useLoginController()
  return (
    <Paper withBorder shadow="md" p="xl" radius="md" w="100%" maw={450}>
      <Stack gap="xs" mb="md">
        <Title order={2}>Sign in</Title>
        <Text c="dimmed" size="sm">
          Enter your email and password to access the dashboard.
        </Text>
      </Stack>

      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="you@company.com"
            autoComplete="email"
            withAsterisk
            {...form.getInputProps("username")}
          />

          <PasswordInput
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            withAsterisk
            {...form.getInputProps("password")}
          />

          <Group justify="space-between">
            <Checkbox
              label="Remember me"
              checked={form.values.rememberMe}
              onChange={(e) => form.setFieldValue("rememberMe", e.currentTarget.checked)}
            />
            <Anchor size="sm" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" loading={loading} fullWidth>
            Sign in
          </Button>

          {/* <Divider label="or" labelPosition="center" />

          <Text size="sm" ta="center">
            Don&apos;t have an account?{" "}
            <Anchor onClick={() => navigate("/register")}>Create one</Anchor>
          </Text> */}
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginPage;

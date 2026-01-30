import React, { useState } from "react";
import {
  Anchor,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

type ForgotFormValues = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotFormValues>({
    initialValues: { email: "" },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email"),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    try {
      setLoading(true);

      // TODO: replace with real API call
      // await authService.forgotPassword(values.email)
      await new Promise((r) => setTimeout(r, 700));

      notifications.show({
        message: "If this email exists, we sent a reset link ✅",
      });

      // optional: go back to login
      // navigate("/login", { replace: true });
    } catch (e: any) {
      notifications.show({
        message: e?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Paper withBorder shadow="md" p="xl" radius="md" w="100%">
      <Stack gap="xs" mb="md">
        <Title order={2}>Forgot password</Title>
        <Text c="dimmed" size="sm">
          Enter your email and we&apos;ll send you a password reset link.
        </Text>
      </Stack>

      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="you@company.com"
            autoComplete="email"
            withAsterisk
            {...form.getInputProps("email")}
          />

          <Button type="submit" loading={loading} fullWidth>
            Send reset link
          </Button>

          <Text size="sm" ta="center">
            Remember your password?{" "}
            <Anchor onClick={() => navigate("/login")}>Back to sign in</Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
};

export default ForgotPasswordPage;

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button/Button";
import { Chip } from "../components/chip/Chip";
import { ThemeToggle } from "../components/theme-toggle/ThemeToggle";

const meta: Meta<typeof Button> = {
  title: "Buttons/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["default", "info", "success", "warning", "danger"] },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Click me", variant: "default" },
};

export const Info: Story = {
  args: { children: "Info", variant: "info" },
};

export const Success: Story = {
  args: { children: "Success", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Warning", variant: "warning" },
};

export const Danger: Story = {
  args: { children: "Danger", variant: "danger" },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const ChipDefault: StoryObj<typeof Chip> = {
  render: () => <Chip label="React" onRemove={() => {}} />,
};

export const ChipVariants: StoryObj<typeof Chip> = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Chip label="Default" />
      <Chip label="Info" variant="info" />
      <Chip label="Success" variant="success" />
      <Chip label="Warning" variant="warning" />
      <Chip label="Danger" variant="danger" />
    </div>
  ),
};

export const ThemeToggleStory: StoryObj<typeof ThemeToggle> = {
  render: () => <ThemeToggle />,
};

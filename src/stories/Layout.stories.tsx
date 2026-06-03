import { Box } from "../components/box/Box";
import { Card, CardHeader, CardBody, CardFooter } from "../components/card";
import { Stack, HStack, VStack } from "../components/stack";
import { SplitPane } from "../components/split-pane";
import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { Accordion } from "../components/accordion";
import { Tabs } from "../components/tabs";
import { Stepper } from "../components/stepper";
import { Breadcrumbs } from "../components/breadcrumbs";
import { AspectRatio } from "../components/aspect-ratio";
import { Typography } from "../components/typography";
import { LanguageSwitcher } from "../components/language-switcher";

export default { title: "Layout" };

export const BoxDefault = () => <Box>Generic container with layout props</Box>;
export const BoxWithPadding = () => <Box p={16} gap={8}>Box with padding and gap</Box>;

export const CardDefault = () => (
  <Card>
    <CardHeader><Typography variant="h4">Card Title</Typography></CardHeader>
    <CardBody><Typography>Card body content</Typography></CardBody>
    <CardFooter><Typography variant="caption">Footer</Typography></CardFooter>
  </Card>
);

export const StackDefault = () => (
  <Stack gap={1}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
);

export const HStackDefault = () => (
  <HStack gap={1}>
    <div>A</div>
    <div>B</div>
    <div>C</div>
  </HStack>
);

export const VStackDefault = () => (
  <VStack gap={1}>
    <div>X</div>
    <div>Y</div>
    <div>Z</div>
  </VStack>
);

export const SplitPaneHorizontal = () => (
  <SplitPane
    primary={<div style={{ padding: "1rem" }}>Primary</div>}
    secondary={<div style={{ padding: "1rem" }}>Secondary</div>}
  />
);

export const SplitPaneVertical = () => (
  <SplitPane
    orientation="vertical"
    defaultSize={150}
    primary={<div style={{ padding: "1rem" }}>Top</div>}
    secondary={<div style={{ padding: "1rem" }}>Bottom</div>}
  />
);

export const SidebarDefault = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex", height: "200px", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <Sidebar isOpen={open} onToggle={() => setOpen((p) => !p)}>
        <div style={{ padding: "1rem" }}>Sidebar content</div>
      </Sidebar>
      <div style={{ flex: 1, padding: "1rem", background: "var(--bg)" }}>
        Main content
      </div>
    </div>
  );
};

export const AccordionDefault = () => (
  <Accordion items={[
    { question: "What is React?", answer: "A UI library" },
    { question: "What is TypeScript?", answer: "A typed superset" },
  ]} />
);

const tabs = [
  { label: "Tab A", content: <Typography>Content A</Typography> },
  { label: "Tab B", content: <Typography>Content B</Typography> },
  { label: "Tab C", content: <Typography>Content C</Typography> },
];
export const TabsDefault = () => <Tabs tabs={tabs} />;

export const StepperDefault = () => (
  <Stepper steps={["Step 1", "Step 2", "Step 3", "Step 4"]} activeStep={2} />
);

export const StepperVertical = () => (
  <Stepper steps={["Step 1", "Step 2", "Step 3"]} activeStep={1} orientation="vertical" />
);

export const BreadcrumbsDefault = () => (
  <Breadcrumbs items={[
    { label: "Home", href: "#" },
    { label: "Components", href: "#" },
    { label: "Button" },
  ]} />
);

export const LanguageSwitcherDefault = () => <LanguageSwitcher />;

export const AspectRatioDefault = () => (
  <AspectRatio ratio={16 / 9} maxWidth="300px">
    <div style={{ background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      16:9
    </div>
  </AspectRatio>
);

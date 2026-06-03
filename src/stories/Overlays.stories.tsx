import { useState } from "react";
import { Modal } from "../components/modal/Modal";
import { Drawer } from "../components/drawer/Drawer";
import { Popover } from "../components/popover/Popover";
import { Tooltip } from "../components/tooltip/Tooltip";
import { Alert } from "../components/alert/Alert";
import { Loader, LoaderBar } from "../components/loader";
import { LoaderOverlay } from "../components/loader/LoaderOverlay";
import { CommandPalette } from "../components/command-palette";
import type { Command } from "../components/command-palette";
import { OnlineBanner } from "../components/online-banner";
import { Button } from "../components/button/Button";

export default { title: "Overlays" };

export const ModalDefault = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
        <p>Modal content goes here.</p>
      </Modal>
    </>
  );
};

export const ModalSizes = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <Button key={s} onClick={() => { setSize(s); setOpen(true); }}>{s}</Button>
        ))}
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={`${size} Modal`} size={size}>
        <p>Size: {size}</p>
      </Modal>
    </>
  );
};

export const DrawerRight = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Drawer" position="right">
        <p>Drawer content</p>
      </Drawer>
    </>
  );
};

export const DrawerLeft = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Drawer" position="left">
        <p>Drawer content</p>
      </Drawer>
    </>
  );
};

export const PopoverDefault = () => (
  <Popover content={<div style={{ padding: "0.5rem" }}>Popover content</div>}>
    <Button>Click me</Button>
  </Popover>
);

export const TooltipDefault = () => (
  <Tooltip content="Tooltip text">
    <span style={{ borderBottom: "1px dashed var(--accent)", cursor: "help" }}>Hover me</span>
  </Tooltip>
);

export const AlertDefault = () => <Alert isOpen={true} message="This is an alert" onClose={() => {}} />;
export const AlertVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <Alert isOpen={true} message="Info alert" variant="info" onClose={() => {}} />
    <Alert isOpen={true} message="Success alert" variant="success" onClose={() => {}} />
    <Alert isOpen={true} message="Warning alert" variant="warning" onClose={() => {}} />
    <Alert isOpen={true} message="Danger alert" variant="danger" onClose={() => {}} />
  </div>
);

export const LoaderDefault = () => <Loader />;
export const LoaderBarDefault = () => <LoaderBar />;
export const LoaderOverlayDefault = () => <LoaderOverlay isOpen={true} label="Loading..." />;

export const OnlineBannerOffline = () => <OnlineBanner />;

export const CommandPaletteDefault = () => {
  const [open, setOpen] = useState(false);
  const groups: { heading: string; items: Command[] }[] = [
    {
      heading: "Navigation",
      items: [
        { id: "home", label: "Go home", shortcut: "⌘1" },
        { id: "components", label: "Components", shortcut: "⌘2" },
      ],
    },
    {
      heading: "Actions",
      items: [
        { id: "theme", label: "Toggle theme", description: "Switch light/dark" },
      ],
    },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>⌘ Open Palette</Button>
      {open && <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.3)" }} onClick={() => setOpen(false)} />}
      <CommandPalette isOpen={open} onClose={() => setOpen(false)} groups={groups} />
    </>
  );
};

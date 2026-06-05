/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { RevealCard } from "../../components/reveal-card";
import { TreeView } from "../../components/tree-view";
import type { TreeNode } from "../../utils/tree";
import { VirtualizedList } from "../../components/virtualized-list";
import { ToastProvider, useToast } from "../../components/toast";
import { TreeSelect } from "../../components/tree-select";
import { SplitPane } from "../../components/split-pane";
import { CommandPalette } from "../../components/command-palette";
import type { Command } from "../../components/command-palette";
import { Sidebar } from "../../components/sidebar";
import { Button } from "../../components/button";
import cardStyles from "../../components/card/Card.module.css";
import type { T } from "./categories";

export function renderBusinessSection(t: T, _st: unknown, _bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_treeview")}</Typography>
        </CardHeader>
        <CardBody>
          <TreeViewDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.treeview")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_virtualized")}</Typography>
        </CardHeader>
        <CardBody>
          <VirtualizedListDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.virtualized")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_toast")}</Typography>
        </CardHeader>
        <CardBody>
          <ToastProvider>
            <ToastDemo t={t} />
          </ToastProvider>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.toast")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_treeselect")}</Typography>
        </CardHeader>
        <CardBody>
          <TreeSelectDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.treeselect")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_splitpane")}</Typography>
        </CardHeader>
        <CardBody>
          <SplitPaneDemo />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.splitpane")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_commandpalette")}</Typography>
        </CardHeader>
        <CardBody>
          <CommandPaletteDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.commandpalette")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_sidebar")}</Typography>
        </CardHeader>
        <CardBody>
          <SidebarDemo />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.sidebar")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}

function TreeSelectDemo({ t }: { t: T }) {
  const [value, setValue] = useState("");
  const treeOptions: TreeNode[] = [
    {
      id: "docs", label: t("complementos.tree_node_docs"),
      children: [
        { id: "report", label: t("complementos.tree_node_report") },
        { id: "notes", label: t("complementos.tree_node_notes") },
      ],
    },
    { id: "images", label: t("complementos.tree_node_images") },
  ];
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" alignItems="start">
      <TreeSelect options={treeOptions} value={value} onChange={setValue} placeholder={t("complementos.select_placeholder_framework")} />
      <Typography variant="body2">{t("complementos.treeview_selected")} <code>{value || t("complementos.treeview_none")}</code></Typography>
    </Box>
  );
}

function SplitPaneDemo() {
  return (
    <SplitPane
      primary={
        <Box style={{ padding: "1rem", height: "100%" }}>
          <Typography variant="h6">Panel A</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido primario — redimensioná el divisor.</Typography>
        </Box>
      }
      secondary={
        <Box style={{ padding: "1rem", height: "100%" }}>
          <Typography variant="h6">Panel B</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido secundario.</Typography>
        </Box>
      }
    />
  );
}

function CommandPaletteDemo({ t }: { t: T }) {
  const [isOpen, setIsOpen] = useState(false);
  const commands: { heading: string; items: Command[] }[] = [
    {
      heading: t("complementos.command_nav"),
      items: [
        { id: "home", label: t("complementos.command_go_home"), shortcut: "⌘1" },
        { id: "components", label: t("complementos.command_go_components"), shortcut: "⌘2" },
      ],
    },
    {
      heading: t("complementos.command_actions"),
      items: [
        { id: "theme", label: t("complementos.command_toggle_theme"), description: t("complementos.command_theme_desc") },
        { id: "lang", label: t("complementos.command_toggle_lang"), description: t("complementos.command_lang_desc") },
      ],
    },
  ];
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>⌘ {t("complementos.command_open")}</Button>
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} groups={commands} />
    </>
  );
}

function SidebarDemo() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Box display="flex" style={{ height: "220px", overflow: "hidden", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)}>
        <Box style={{ padding: "1rem" }}>
          <Typography variant="h6">Sidebar</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido del panel lateral.</Typography>
        </Box>
      </Sidebar>
      <Box style={{ flex: 1, padding: "1rem", background: "var(--bg)" }}>
        <Typography variant="h6">Contenido principal</Typography>
        <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>El área principal se adapta automáticamente.</Typography>
      </Box>
    </Box>
  );
}

function TreeViewDemo({ t }: { t: T }) {
  const [selectedId, setSelectedId] = useState("edukuk");
  const treeData: TreeNode[] = [
    {
      id: "docs", label: t("complementos.tree_node_docs"),
      children: [
        { id: "report", label: t("complementos.tree_node_report") },
        {
          id: "projects", label: t("complementos.tree_node_projects"),
          children: [
            { id: "edukuk", label: "edukuk" },
            { id: "other", label: t("complementos.tree_node_other") },
          ],
        },
      ],
    },
    {
      id: "images", label: t("complementos.tree_node_images"),
      children: [
        { id: "screenshot", label: t("complementos.tree_node_screenshot") },
        { id: "design", label: t("complementos.tree_node_mockup") },
      ],
    },
    { id: "readme", label: t("complementos.tree_node_readme") },
  ];
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" alignItems="start">
      <TreeView data={treeData} selectedId={selectedId} onSelect={setSelectedId} defaultExpandedIds={["docs", "projects"]} />
      <Typography variant="body2">{t("complementos.treeview_selected")} <code>{selectedId || t("complementos.treeview_none")}</code></Typography>
    </Box>
  );
}

function VirtualizedListDemo({ t }: { t: T }) {
  const items = Array.from({ length: 1000 }, (_, i) => `${t("complementos.virtualized_line")} ${i + 1}`);
  return (
    <VirtualizedList
      items={items}
      itemHeight={36}
      height={250}
      renderItem={(item, index) => (
        <Box display="flex" alignItems="center" gap="0.5rem" style={{ padding: "0 0.75rem", lineHeight: "36px", fontSize: "0.875rem", borderBottom: "1px solid var(--border)", color: "var(--text-h)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <Typography variant="body2" component="span" color="accent" style={{ fontWeight: 600 }}>{index + 1}</Typography>
          {item}
        </Box>
      )}
    />
  );
}

function ToastDemo({ t }: { t: T }) {
  const { addToast } = useToast();
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Button onClick={() => addToast({ message: t("complementos.toast_default_msg") })}>Default</Button>
      <Button variant="info" onClick={() => addToast({ message: t("complementos.toast_info_msg"), variant: "info" })}>Info</Button>
      <Button variant="success" onClick={() => addToast({ message: t("complementos.toast_success_msg"), variant: "success" })}>Success</Button>
      <Button variant="warning" onClick={() => addToast({ message: t("complementos.toast_warning_msg"), variant: "warning", duration: 10000 })}>Warning</Button>
      <Button variant="danger" onClick={() => addToast({ message: t("complementos.toast_danger_msg"), variant: "danger" })}>Danger</Button>
    </Box>
  );
}

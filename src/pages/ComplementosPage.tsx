import { useState } from "react";
import { useMediaQuery, breakpoints } from "../styles/breakpoints";
import { ComplementoPageTabs } from "./ComplementoPageTabs";
import { ComplementoPageDrawer } from "./ComplementoPageDrawer";

export const ComplementosPage = () => {
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const [activeTab, setActiveTab] = useState(0);

  return isDesktop ? (
    <ComplementoPageTabs defaultTab={activeTab} onTabChange={setActiveTab} />
  ) : (
    <ComplementoPageDrawer defaultTab={activeTab} onTabChange={setActiveTab} />
  );
};

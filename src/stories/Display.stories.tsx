import { useState } from "react";
import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";
import { Divider } from "../components/divider";
import { Image } from "../components/image/Image";
import { Meter } from "../components/meter/Meter";
import { Skeleton } from "../components/skeleton";
import { Typography } from "../components/typography";
import { Rating } from "../components/rating";
import { Timeline } from "../components/timeline";
import { EmptyState } from "../components/empty-state";
import { LogoWatermark } from "../components/logo-watermark/LogoWatermark";

export default { title: "Display" };

export const AvatarDefault = () => <Avatar alt="John Doe" />;
export const AvatarWithSrc = () => <Avatar alt="User" src="https://i.pravatar.cc/80" />;
export const AvatarSizes = () => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <Avatar alt="S" size="sm" />
    <Avatar alt="M" size="md" />
    <Avatar alt="L" size="lg" />
  </div>
);
export const AvatarVariants = () => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <Avatar alt="Circle" variant="circle" />
    <Avatar alt="Rounded" variant="rounded" />
    <Avatar alt="Square" variant="square" />
  </div>
);

export const BadgeDefault = () => <Badge>3</Badge>;
export const BadgeVariants = () => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <Badge variant="default">1</Badge>
    <Badge variant="info">2</Badge>
    <Badge variant="success">3</Badge>
    <Badge variant="warning">4</Badge>
    <Badge variant="danger">5</Badge>
  </div>
);

export const DividerHorizontal = () => <Divider />;
export const DividerWithLabel = () => <Divider label="Section" />;
export const DividerVertical = () => <div style={{ height: 100 }}><Divider orientation="vertical" /></div>;

export const ImageDefault = () => (
  <Image src="https://picsum.photos/300/200" alt="Random" caption="A random image" />
);

export const MeterDefault = () => <Meter value={65} />;

export const SkeletonText = () => <Skeleton variant="text" />;
export const SkeletonCircle = () => <Skeleton variant="circle" />;
export const SkeletonRect = () => <Skeleton variant="rect" width={200} height={100} />;

export const TypographyVariants = () => (
  <div>
    <Typography variant="h1">h1 Heading</Typography>
    <Typography variant="h2">h2 Heading</Typography>
    <Typography variant="h3">h3 Heading</Typography>
    <Typography variant="body1">body1 text</Typography>
    <Typography variant="body2">body2 text</Typography>
    <Typography variant="caption">caption text</Typography>
    <Typography variant="code">code text</Typography>
  </div>
);

export const RatingDefault = () => {
  const [v, setV] = useState(3);
  return <Rating value={v} onChange={setV} />;
};
export const RatingReadOnly = () => <Rating value={4} readOnly />;

export const TimelineDefault = () => (
  <Timeline items={[
    { title: "Event 1", description: "Description 1", time: "2024" },
    { title: "Event 2", description: "Description 2", time: "2025", color: "info" },
    { title: "Event 3", description: "Description 3", time: "2026", color: "success" },
  ]} />
);

export const EmptyStateDefault = () => (
  <EmptyState title="No data" description="There is nothing to show yet." />
);

export const LogoWatermarkDefault = () => <LogoWatermark size={64} />;

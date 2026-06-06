import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { RevealCard } from "../../components/reveal-card";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Chip } from "../../components/chip";
import { Switch } from "../../components/switch";
import { Progress } from "../../components/progress";
import { Skeleton } from "../../components/skeleton";
import { Tabs } from "../../components/tabs";
import { Avatar } from "../../components/avatar";
import { Rating } from "../../components/rating";
import { Timeline } from "../../components/timeline";
import { EmptyState } from "../../components/empty-state";
import { Divider } from "../../components/divider";
import { AddIcon, PackageIcon, BellIcon } from "../../components/icons";
import { RatingDemo } from "./demos";
import htmlCodeImage from "../../assets/html-code-image.webp";
import cardStyles from "../../components/card/Card.module.css";
import type { T } from "./categories";
import type { DisplayState } from "./types";

export function renderDisplaySection(t: T, st: DisplayState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_badge")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Box display="inline-block" style={{ position: "relative" }}>
              <Button>{t("complementos.badge_notifications")}</Button>
              <Badge variant="default" size="sm">3</Badge>
            </Box>
            <Box display="inline-block" style={{ position: "relative" }}>
              <Button variant="info">{t("complementos.badge_messages")}</Button>
              <Badge variant="info" size="md">7</Badge>
            </Box>
            <Box display="inline-block" style={{ position: "relative" }}>
              <Button variant="success">{t("complementos.badge_achievements")}</Button>
              <Badge variant="success" size="lg">99+</Badge>
            </Box>
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Badge variant="default" standalone>default</Badge>
            <Badge variant="info" standalone>info</Badge>
            <Badge variant="success" standalone>success</Badge>
            <Badge variant="warning" standalone>warning</Badge>
            <Badge variant="danger" standalone>danger</Badge>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.badge")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_chip")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            {st.chips.map((chip) => (
              <Chip key={chip} label={chip} onRemove={() => st.setChips((prev) => prev.filter((c) => c !== chip))} />
            ))}
            {st.chips.length === 0 && (
              <Button variant="info" onClick={() => st.setChips(["React", "TypeScript", "Vite", "CSS"])}>
                {t("complementos.chip_restore")}
              </Button>
            )}
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Chip label="Info" variant="info" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Danger" variant="danger" />
            <Chip label={t("complementos.chip_disabled")} variant="default" disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.chip")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_switch")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
            <Switch checked={st.switchChecked} onChange={st.setSwitchChecked} label={t("complementos.switch_label")} />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={st.switchDefault} onChange={st.setSwitchDefault} variant="default" />
            <Switch checked={st.switchInfo} onChange={st.setSwitchInfo} variant="info" />
            <Switch checked={st.switchSuccess} onChange={st.setSwitchSuccess} variant="success" />
            <Switch checked={st.switchWarning} onChange={st.setSwitchWarning} variant="warning" />
            <Switch checked={st.switchDanger} onChange={st.setSwitchDanger} variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={st.switchSm} onChange={st.setSwitchSm} size="sm" />
            <Switch checked={st.switchMd} onChange={st.setSwitchMd} size="md" />
            <Switch checked={st.switchLg} onChange={st.setSwitchLg} size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={false} onChange={() => {}} label={t("complementos.switch_disabled")} disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.switch")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_progress")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Progress value={st.progressValue} label={t("complementos.progress_label")} showValue variant="default" />
            <Progress value={30} label="Info" showValue variant="info" />
            <Progress value={60} label="Success" showValue variant="success" />
            <Progress value={45} showValue variant="warning" />
            <Progress value={80} showValue variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setProgressValue((p) => Math.min(100, p + 10))}>{t("complementos.progress_plus")}</Button>
            <Button variant="warning" onClick={() => st.setProgressValue((p) => Math.max(0, p - 10))}>{t("complementos.progress_minus")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.progress")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_skeleton")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
            <Skeleton variant="text" count={3} />
            <Skeleton variant="text" width="60%" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Skeleton variant="circle" width="48px" height="48px" />
            <Skeleton variant="rect" width="120px" height="80px" />
            <Skeleton variant="rect" width="80px" height="80px" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.skeleton")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tabs")}</Typography>
        </CardHeader>
        <CardBody>
          <Tabs tabs={[
            { label: t("complementos.tabs_html"), content: t("complementos.tabs_html_content") },
            { label: t("complementos.tabs_css"), content: t("complementos.tabs_css_content") },
            { label: t("complementos.tabs_js"), content: t("complementos.tabs_js_content") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tabs")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_avatar")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center" alignItems="center">
            <Avatar src={htmlCodeImage} alt="JP" />
            <Avatar alt="JD" variant="info" />
            <Avatar alt="María García" variant="success" size="lg" shape="rounded" />
            <Avatar alt="AB" variant="warning" />
            <Avatar alt="CL" variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" alignItems="center" mt="0.5rem">
            <Avatar alt="SM" size="sm" />
            <Avatar alt="MD" size="md" />
            <Avatar alt="LG" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" alignItems="center" mt="0.5rem">
            <Avatar alt="Circle" shape="circle" />
            <Avatar alt="Rounded" shape="rounded" />
            <Avatar alt="Square" shape="square" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.avatar")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_rating")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem" alignItems="center">
            <Box display="flex" flexDirection="column" gap="0.5rem" alignItems="center">
              <Typography variant="body2">{t("complementos.rating_interactive")}</Typography>
              <RatingDemo />
            </Box>
            <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">{t("complementos.rating_readonly")}</Typography>
                <Rating value={3} readOnly />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">sm</Typography>
                <Rating value={2} size="sm" />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">md</Typography>
                <Rating value={3} size="md" readOnly />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">lg</Typography>
                <Rating value={4} size="lg" />
              </Box>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.rating")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_timeline")}</Typography>
        </CardHeader>
        <CardBody>
          <Timeline items={[
            { title: t("complementos.timeline_v1"), description: t("complementos.timeline_v1_desc"), time: t("complementos.timeline_v1_time"), color: "default" },
            { title: t("complementos.timeline_v2"), description: t("complementos.timeline_v2_desc"), time: t("complementos.timeline_v2_time"), color: "info" },
            { title: t("complementos.timeline_v3"), description: t("complementos.timeline_v3_desc"), time: t("complementos.timeline_v3_time"), color: "success" },
            { title: t("complementos.timeline_v4"), description: t("complementos.timeline_v4_desc"), time: t("complementos.timeline_v4_time"), color: "warning" },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.timeline")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_emptystate")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <EmptyState
              icon={<AddIcon />}
              title={t("complementos.emptystate_noresults_title")}
              description={t("complementos.emptystate_noresults_desc")}
              action={<Button variant="info">{t("complementos.emptystate_noresults_action")}</Button>}
            />
            <Divider />
            <Box display="flex" gap="1rem" flexWrap="wrap">
              <EmptyState
                icon={<PackageIcon />}
                title={t("complementos.emptystate_cart_title")}
                description={t("complementos.emptystate_cart_desc")}
              />
              <EmptyState
                icon={<BellIcon />}
                title={t("complementos.emptystate_notifications_title")}
                description={t("complementos.emptystate_notifications_desc")}
              />
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.emptystate")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_typography")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.75rem">
            <Typography variant="h1" component="span">{t("complementos.typography_h1")}</Typography>
            <Typography variant="h2" component="span">{t("complementos.typography_h2")}</Typography>
            <Typography variant="h3" component="span">{t("complementos.typography_h3")}</Typography>
            <Typography variant="h4" component="span">{t("complementos.typography_h4")}</Typography>
            <Typography variant="h5" component="span">{t("complementos.typography_h5")}</Typography>
            <Typography variant="h6" component="span">{t("complementos.typography_h6")}</Typography>
            <Typography variant="body1">{t("complementos.typography_body1")}</Typography>
            <Typography variant="body2">{t("complementos.typography_body2")}</Typography>
            <Typography variant="caption">{t("complementos.typography_caption")}</Typography>
            <Typography variant="code">{t("complementos.typography_code")}</Typography>
          </Box>
          <Typography variant="h5" gutterBottom style={{ marginTop: "1rem" }}>{t("complementos.typography_props_title")}</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Typography variant="body2"><code>variant</code> — h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | caption | code</Typography>
            <Typography variant="body2"><code>component</code> — {t("complementos.typography_props_component")}</Typography>
            <Typography variant="body2"><code>gutterBottom</code> — {t("complementos.typography_props_gutter")}</Typography>
            <Typography variant="body2"><code>align</code> — left | center | right</Typography>
            <Typography variant="body2"><code>noWrap</code> — {t("complementos.typography_props_nowrap")}</Typography>
            <Typography variant="body2"><code>color</code> — {t("complementos.typography_props_color")}</Typography>
          </Box>
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>{t("complementos.typography_component_title")}</Typography>
          <Typography variant="h5" component="span" align="center" style={{ display: "block", color: "var(--accent)" }}>
            {t("complementos.typography_component_demo")}
          </Typography>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.typography")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}

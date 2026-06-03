import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { Button } from "../../components/button";
import { Loader, LoaderBar } from "../../components/loader";
import { Popover } from "../../components/popover";
import type { T } from "./categories";
import type { OverlaysState } from "./types";

export function renderOverlaysSection(t: T, st: OverlaysState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_modal")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setModalSmall(true)}>{t("complementos.modal_btn_sm")}</Button>
            <Button onClick={() => st.setModalMedium(true)}>{t("complementos.modal_btn_md")}</Button>
            <Button variant="warning" onClick={() => st.setModalLarge(true)}>{t("complementos.modal_btn_lg")}</Button>
            <Button variant="danger" onClick={() => st.setModalXl(true)}>{t("complementos.modal_btn_xl")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.modal")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_alert")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.showAlert("info", "top-right")}>{t("complementos.alert_btn_info")}</Button>
            <Button variant="success" onClick={() => st.showAlert("success", "top-right")}>{t("complementos.alert_btn_success")}</Button>
            <Button variant="warning" onClick={() => st.showAlert("warning", "top-right", 8000)}>{t("complementos.alert_btn_warning")}</Button>
            <Button variant="danger" onClick={() => st.showAlert("danger", "top-left")}>{t("complementos.alert_btn_danger")}</Button>
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" mt="0.5rem">
            <Button variant="default" onClick={() => st.showAlert("info", "bottom-right", 0)}>{t("complementos.alert_btn_noauto")}</Button>
            <Button variant="default" onClick={() => st.showAlert("success", "bottom-left", 3000)}>{t("complementos.alert_btn_position")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.alert")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loader")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" /> <Loader size="md" /> <Loader size="lg" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader variant="info" /> <Loader variant="success" /> <Loader variant="warning" /> <Loader variant="danger" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" label={t("complementos.loader_label")} />
          </Box>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loaderbar")}</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <LoaderBar /> <LoaderBar variant="info" /> <LoaderBar variant="success" />
            <LoaderBar variant="warning" /> <LoaderBar variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.loader")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loaderoverylay")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" justifyContent="center">
            <Button onClick={() => st.setOverlayOpen(true)}>{t("complementos.overlay_btn_open")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.loader_overlay")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_popover")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
            <Popover content={<span>{t("complementos.popover_content_actions")}</span>}>
              <Button variant="info">{t("complementos.popover_btn_click")}</Button>
            </Popover>
            <Popover content={<span>{t("complementos.popover_content_info")}</span>} position="right">
              <Button>{t("complementos.popover_btn_more")}</Button>
            </Popover>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.popover")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_drawer")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button onClick={() => { st.setDrawerPosition("right"); st.setDrawerOpen(true); }}>{t("complementos.drawer_btn_right")}</Button>
            <Button onClick={() => { st.setDrawerPosition("left"); st.setDrawerOpen(true); }}>{t("complementos.drawer_btn_left")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.drawer")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

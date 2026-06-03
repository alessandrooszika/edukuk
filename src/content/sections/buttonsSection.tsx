import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { Button } from "../../components/button";
import { Tooltip } from "../../components/tooltip";
import type { T } from "./categories";

export function renderButtonsSection(t: T, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_button")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Button variant="default">Default</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.button")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tooltip")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center">
            <Tooltip content="Hola, soy un tooltip">
              <Button variant="info">Hover me</Button>
            </Tooltip>
            <Tooltip content="CSS ::after con attr(data-tooltip)">
              <Typography variant="body2" component="span">&#x1f446; Pasa el mouse</Typography>
            </Tooltip>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tooltip")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

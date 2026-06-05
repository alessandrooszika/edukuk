import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody } from "../../components/card";
import { RevealCard } from "../../components/reveal-card";
import type { T } from "./categories";

export function renderOverviewSection(t: T) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.overview_heading")}</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="body2">
            {t("complementos.overview_text")}
          </Typography>
        </CardBody>
      </Card></RevealCard>
    </Box>
  );
}

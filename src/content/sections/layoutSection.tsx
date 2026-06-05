import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { RevealCard } from "../../components/reveal-card";
import { Image } from "../../components/image";
import { Meter } from "../../components/meter";
import { Accordion } from "../../components/accordion";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { Divider } from "../../components/divider";
import { Stepper } from "../../components/stepper";
import { Table } from "../../components/table";
import { AspectRatio } from "../../components/aspect-ratio";
import { Stack, HStack, VStack } from "../../components/stack";
import { DataTable } from "../../components/data-table";
import type { Column as DataColumn } from "../../components/data-table";
import { PaginationDemo } from "./demos";
import htmlCodeImage from "../../assets/html-code-image.webp";
import cssCodeImage from "../../assets/css-code-image.webp";
import { misHabilidades } from "../../data/skills";
import cardStyles from "../../components/card/Card.module.css";
import type { T } from "./categories";

export function renderLayoutSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_box")}</Typography>
        </CardHeader>
        <CardBody>
          <Box>{t("complementos.box_text")}</Box>
          <Box display="flex" justifyContent="center" p={12} mt="0.5rem">
            <Typography variant="body2" component="span"><span dangerouslySetInnerHTML={{ __html: t("complementos.box_extends") }} /></Typography>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.box")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_card")}</Typography>
        </CardHeader>
        <CardBody>
          <Card>
            <Typography variant="body1">{t("complementos.card_body")}</Typography>
          </Card>
          <Card>
            <Typography variant="h4">{t("complementos.card_title")}</Typography>
            <Typography variant="body1">{t("complementos.card_content")}</Typography>
          </Card>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.card")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_image")}</Typography>
        </CardHeader>
        <CardBody>
          <Image src={htmlCodeImage} alt={t("complementos.image_caption_example")}
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
          <Image src={cssCodeImage} alt={t("complementos.image_caption_example")}
            caption={t("complementos.image_caption_example")}
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.image")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_meter")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            {misHabilidades.map((skill) => (
              <Box key={skill.name} display="flex" flexDirection="column" gap="0.25rem">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" component="span" className={s.skillName}>{skill.name}</Typography>
                  <Typography variant="body2" component="span" className={s.skillValue}>{skill.value}%</Typography>
                </Box>
                <Meter value={skill.value} min={0} max={100} />
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.meter")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_accordion")}</Typography>
        </CardHeader>
        <CardBody>
          <Accordion items={[
            { question: t("complementos.accordion_q1"), answer: t("complementos.accordion_a1") },
            { question: t("complementos.accordion_q2"), answer: t("complementos.accordion_a2") },
            { question: t("complementos.accordion_q3"), answer: t("complementos.accordion_a3") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.accordion")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_breadcrumbs")}</Typography>
        </CardHeader>
        <CardBody>
          <Breadcrumbs items={[
            { label: t("complementos.breadcrumb_home"), href: "#home" },
            { label: t("complementos.breadcrumb_components"), href: "#complementos" },
            { label: t("complementos.breadcrumb_layout") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.breadcrumbs")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <PaginationDemo t={t} />
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_divider")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">{t("complementos.divider_horizontal")}</Typography>
            <Divider />
            <Divider size="md" />
            <Divider size="lg" variant="info" />
            <Divider label={t("complementos.divider_label")} />
            <Divider label="Info" variant="info" size="md" />
            <Typography variant="body2">{t("complementos.divider_vertical")}</Typography>
            <Box display="flex" gap="1rem" style={{ height: 60 }} alignItems="center">
              <Typography variant="body2" component="span">{t("complementos.divider_left")}</Typography>
              <Divider orientation="vertical" />
              <Typography variant="body2" component="span">{t("complementos.divider_center")}</Typography>
              <Divider orientation="vertical" size="md" variant="danger" />
              <Typography variant="body2" component="span">{t("complementos.divider_right")}</Typography>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.divider")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_stepper")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Typography variant="body2">{t("complementos.stepper_horizontal")}</Typography>
            <Stepper steps={[t("complementos.stepper_cart"), t("complementos.stepper_payment"), t("complementos.stepper_shipping"), t("complementos.stepper_confirmation")]} activeStep={2} />
            <Typography variant="body2">{t("complementos.stepper_vertical")}</Typography>
            <Stepper steps={[t("complementos.stepper_register"), t("complementos.stepper_verification"), t("complementos.stepper_welcome")]} activeStep={1} orientation="vertical" />
            <Typography variant="body2">{t("complementos.stepper_alternative")}</Typography>
            <Stepper steps={[t("complementos.stepper_step1"), t("complementos.stepper_step2"), t("complementos.stepper_step3")]} activeStep={0} alternativeLabel />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.stepper")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_table")}</Typography>
        </CardHeader>
        <CardBody>
          <Table
            columns={[
              { key: "name", label: t("complementos.table_name") },
              { key: "role", label: t("complementos.table_role") },
              { key: "status", label: t("complementos.table_status") },
            ]}
            data={[
              { name: t("complementos.table_juan"), role: t("complementos.table_dev"), status: t("complementos.table_active") },
              { name: t("complementos.table_maria"), role: t("complementos.table_designer"), status: t("complementos.table_active") },
              { name: t("complementos.table_carlos"), role: t("complementos.table_devops"), status: t("complementos.table_inactive") },
              { name: t("complementos.table_ana"), role: t("complementos.table_pm"), status: t("complementos.table_active") },
            ]}
            variant="default"
            size="md"
            striped
          />
          <Box display="flex" flexDirection="column" gap="0.5rem" mt="1rem">
            <Typography variant="body2">Variants informativas</Typography>
            <Table
              columns={[{ key: "col", label: t("complementos.table_column") }]}
              data={[{ col: "Info" }, { col: "Success" }, { col: "Warning" }, { col: "Danger" }]}
              variant="info" size="sm"
            />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.table")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_aspectratio")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">16:9</Typography>
            <AspectRatio>
              <img src={htmlCodeImage} alt="16:9"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">4:3</Typography>
            <AspectRatio ratio={4 / 3} maxWidth={400}>
              <img src={cssCodeImage} alt="4:3"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">1:1 cuadrado</Typography>
            <AspectRatio ratio={1} maxWidth={200}>
              <img src={htmlCodeImage} alt="1:1"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.aspectratio")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_stack")}</Typography>
        </CardHeader>
        <CardBody>
          <VStack gap="0.75rem">
            <Typography variant="body2"><strong>VStack</strong> — {t("complementos.vstack_label")}</Typography>
            <VStack gap="0.5rem" style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: 8 }}>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 1</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 2</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 3</Box>
            </VStack>
            <Typography variant="body2"><strong>HStack</strong> — {t("complementos.hstack_label")}</Typography>
            <HStack gap="0.5rem">
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>A</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>B</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>C</Box>
            </HStack>
            <Typography variant="body2"><strong>Stack</strong> — {t("complementos.stack_label")}</Typography>
            <Stack direction="row" gap="0.75rem" alignItems="center">
              <Box aria-hidden="true">⚡</Box>
              <Typography variant="body2" component="span">{t("complementos.stack_desc")}</Typography>
            </Stack>
          </VStack>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.stack")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_datatable")}</Typography>
        </CardHeader>
        <CardBody>
          <DataTable
            columns={[
              { key: "name", label: t("complementos.table_name"), sortable: true, filterable: true },
              { key: "role", label: t("complementos.table_role"), sortable: true },
              { key: "status", label: t("complementos.table_status") },
            ] as DataColumn<{ name: string; role: string; status: string }>[]}
            data={[
              { name: t("complementos.datatable_name_ana"), role: t("complementos.datatable_role_admin"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_bob"), role: t("complementos.datatable_role_editor"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_carlos"), role: t("complementos.datatable_role_user"), status: t("complementos.table_inactive") },
              { name: t("complementos.datatable_name_diana"), role: t("complementos.datatable_role_admin"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_elena"), role: t("complementos.datatable_role_editor"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_frank"), role: t("complementos.datatable_role_user"), status: t("complementos.table_active") },
            ]}
            striped
            selectable
            pageSize={5}
          />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.datatable")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}

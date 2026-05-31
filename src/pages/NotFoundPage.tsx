import { VStack } from "../components/stack";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Badge } from "../components/badge/Badge";
import styles from "./NotFoundPage.module.css";

const ironicMessages: Record<string, string> = {
  admin: "¿Administrador? Aquí el único admin soy yo, y no recuerdo haberte dado acceso.",
  secret: "Has descubierto el modo sigilo. Lástima que no haya nada aquí.",
  dashboard: "Esto no es una app de gestión, pero gracias por soñar.",
  login: "¿Login? Esto es un showcase, no hay cuentas. Pero buen intento.",
  config: "¿A configurar qué? Este proyecto se configura solo. Próximamente: humo.",
  api: "Aquí no hay endpoints, solo end-of-page.",
  db: "SELECT * FROM hopes WHERE hash = ? → 0 rows.",
  settings: "Ajustes, configuración, preferencias... todo suena muy corporativo para un catálogo de componentes.",
  profile: "Perfil de quién? Tú y yo sabemos que aquí todos somos anónimos.",
  logout: "No puedes cerrar sesión si nunca iniciaste una. Jugada maestra.",
  upload: "¿Subir qué? Si hasta los archivos se aburren aquí.",
  register: "Registro cerrado. El universo no necesita más cuentas.",
  payment: "¿Pagar? Esto es gratis. No arruines el momento.",
  download: "Descargar... ¿el qué? Mis esperanzas de encontrar contenido útil aquí.",
  search: "Buscabas algo específico. Yo también, pero ya me rendí.",
  help: "Ayuda. Es justo lo que necesito yo para explicarte que no hay nada aquí.",
  faq: "FAQ: ¿Hay algo aquí? No. ¿Seguro? Completamente.",
  status: "Estado del proyecto: online. Contenido en esta ruta: offline.",
};

const defaultMessage =
  "La página que buscas no existe o fue movida. Pero el chiste se cuenta solo.";

export function NotFoundPage() {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  const ironicMessage = ironicMessages[hash];

  return (
    <VStack alignItems="center" justifyContent="center" style={{ flex: 1 }} py={64} px={16} gap={24}>
      {ironicMessage && (
        <Badge variant="warning" standalone size="md">
          🔒 Área restringida
        </Badge>
      )}

      <Box className={styles.code}>404</Box>

      <VStack alignItems="center" gap={8} style={{ maxWidth: 480, textAlign: "center" }}>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.description}>{ironicMessage ?? defaultMessage}</p>
      </VStack>

      <Button onClick={() => { window.location.hash = "home"; }}>
        ← Volver al inicio
      </Button>
    </VStack>
  );
}

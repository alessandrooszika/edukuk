import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "../button/Button";
import { Box } from "../box/Box";
import { Typography } from "../typography";

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "4rem 2rem",
            minHeight: "50vh",
            textAlign: "center",
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          <Typography variant="h3" style={{ color: "var(--danger)" }}>
            Algo salió mal
          </Typography>
          <Typography variant="body1" style={{ maxWidth: 400 }}>
            {this.state.error?.message || "Error inesperado"}
          </Typography>
          <Button
            variant="danger"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset?.();
            }}
          >
            Reintentar
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
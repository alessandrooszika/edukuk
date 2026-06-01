import { ToastProvider, useToast } from "../components/toast";
import { Button } from "../components/button/Button";
import { Typography } from "../components/typography";

export default { title: "Business" };

function ToastDemo() {
  const { addToast } = useToast();
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Button onClick={() => addToast({ message: "Default toast" })}>Default</Button>
      <Button variant="info" onClick={() => addToast({ message: "Info toast", variant: "info" })}>Info</Button>
      <Button variant="success" onClick={() => addToast({ message: "Success toast", variant: "success" })}>Success</Button>
      <Button variant="warning" onClick={() => addToast({ message: "Warning toast", variant: "warning" })}>Warning</Button>
      <Button variant="danger" onClick={() => addToast({ message: "Danger toast", variant: "danger" })}>Danger</Button>
    </div>
  );
}

export const ToastShowcase = () => (
  <ToastProvider>
    <Typography variant="h4" gutterBottom>Toast Notifications</Typography>
    <Typography variant="body2" style={{ marginBottom: "1rem" }}>Click buttons to show toasts</Typography>
    <ToastDemo />
  </ToastProvider>
);



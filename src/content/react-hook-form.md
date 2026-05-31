# Integración con React Hook Form

Todos los inputs del sistema aceptan las props estándar de HTML (`value`, `onChange`, `onBlur`, `ref`, etc.), por lo que se integran directamente con `useController` o `register` de React Hook Form.

## Ejemplo básico con `register`

```tsx
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Select } from "../components/select";
import { FormField } from "../components/form-field";

interface FormData {
  name: string;
  role: string;
}

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormField label="Nombre" error={errors.name?.message} htmlFor="name">
        <Input
          id="name"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
      </FormField>

      <FormField label="Rol" error={errors.role?.message} htmlFor="role">
        <Select
          id="role"
          options={["Admin", "User", "Guest"]}
          {...register("role", { required: true })}
        />
      </FormField>

      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Ejemplo con `useController` (control externo)

```tsx
import { useController } from "react-hook-form";
import { Switch } from "../components/switch";
import { FormField } from "../components/form-field";

export function NotificationsField() {
  const { field } = useController({
    name: "notifications",
    defaultValue: false,
    rules: { required: false },
  });

  return (
    <FormField label="Recibir notificaciones">
      <Switch
        checked={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </FormField>
  );
}
```

## Notas

- Los inputs usan `forwardRef`, por lo que `register` funciona sin problemas.
- La prop `error` en `FormField` acepta el mensaje de error de `formState.errors`.
- Los inputs exponen `aria-invalid` cuando reciben `error`, beneficioso para testing.

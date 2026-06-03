import { createContext, useContext } from "react";

interface FormFieldContextValue {
  hasError: boolean;
  errorId: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormFieldContext() {
  return useContext(FormFieldContext);
}

export default FormFieldContext;

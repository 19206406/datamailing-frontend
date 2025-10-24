import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(4, "El ususario debe tener al menos 4 caracteres"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

// Inferir el tipo para que sea compatible con el UserCredential
export type LoginData = z.infer<typeof loginSchema>;

/*
    Función para validar los datos del forumulario de google 
*/

export const validateLogin = (data: LoginData) => {
  const result = loginSchema.safeParse(data);

  if (result.success) {
    return {};
  }

  const errors: Partial<Record<keyof LoginData, string>> = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof LoginData;
    errors[field] = issue.message;
  });

  return errors;
};

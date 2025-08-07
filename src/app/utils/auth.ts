export const validateForm = (email: string, password: string) => {
    const errors: {
        email?: string,
        password?: string
    } = {};

    if (!email) {
        errors.email = 'El correo electrónico es obligatorio.';
    } else if (!isValidEmail(email)) {
        errors.email = 'El formato del correo no es válido.';
    }

    if (!password) {
        errors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }


    return errors;
};

export function isValidEmail(email: string) {
  if (typeof email !== "string") return false;

  const emailRegex = new RegExp(
    `^(?!\\.)[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+` +  // local-part (sin punto al inicio)
    `(?:\\.[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+)*` +  // puntos en el medio permitidos
    `(?<!\\.)@` +                                  // no punto antes del @
    `[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?` + // dominio (sin guión al inicio/final)
    `(?:\\.[a-zA-Z]{2,})+$`                        // TLD (mínimo 2 letras, permite subdominios)
  );

  return emailRegex.test(email);
}

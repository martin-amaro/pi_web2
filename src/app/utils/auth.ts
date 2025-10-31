export const validateForm = (email: string, password: string, name?: string, terms?: boolean) => {
    const errors: {
        name?: string,
        email?: string,
        password?: string,
        terms?: string
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

    if (name !== undefined) {
      if (!name) {
        errors.name = "El nombre es obligatorio";
      }
    }

    if (terms !== undefined) {
      if (!terms) {
        errors.terms = "Debes aceptar los términos y condiciones.";
      }
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

export const validatePassword = (password: string) => {
    if (!password) {
        return 'La contraseña es obligatoria.';
    }
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return '';
};

export const validateText = (text: string, field?: string) =>  {
  if (!text.trim()) {
    return `${field || 'El campo'} es obligatorio`;
  }
  if (text.trim().length < 6) {
    return `${field || "El campo"} debe tener al menos 6 caracteres.`;
  }
  return "";
}

export const validateEmail = (email: string) => {
  if (!email) {
    return "El correo electrónico es obligatorio.";
  } else if (!isValidEmail(email)) {
    return "El formato del correo no es válido.";
  }
  return "";
}
# Guía para el desarrollo del Front-end

Esta guía define las buenas prácticas y estructuras clave que debe seguir el equipo de Front-end para mantener la coherencia, legibilidad y funcionalidad del proyecto.

---

## Sesión del Usuario

Toda la información de la sesión se obtiene desde `next-auth` mediante el hook `useSession`.

**Ejemplo de uso:**

```ts
const { data: session } = useSession();
```

`session` puede ser `undefined` mientras se carga o si no hay sesión.

### Usuario

El objeto `session.user` contiene los siguientes campos disponibles en la aplicación:

- `id`: Devuelve el id del usuario.
- `accessToken`: Devuelve el token de la sesión actual.
- `businessId`: Id del negocio al que pertenece el usuario.
- `role`: Rol del usuario.
- `plan`: Objeto que contiene información sobre el plan del negocio.
  - `name`
  - `status`

### Token

El token es el identificador seguro que autentica al usuario frente al backend.
Se utiliza para validar cada solicitud protegida y asegurar que el usuario tenga permisos válidos durante su sesión activa.

```ts
const token = session?.user?.accessToken;
```

## Peticiones al Backend

Todas las peticiones al backend deben realizarse mediante la función `request` disponible desde el hook `useBackend`.

No se debe utilizar `fetch` ni `axios` directamente.

```ts
const { request } = useBackend();
```

La función `request` recibe el **endpoint** como primer parámetro y un **objeto de opciones** como segundo parámetro.

No se debe incluir la base de la URL, ya que esta se maneja internamente.

```ts
request("/users", {
  method: "POST",
  data: {
    // Datos a enviar
  },
});
```

### Peticiones a rutas privadas

Para acceder a rutas protegidas, se debe incluir el token de sesión en la solicitud.
Este token permite al backend verificar la identidad del usuario y validar sus roles o permisos.

```ts
const token = session?.user?.accessToken;

await request("/users", {
  method: "GET",
  token,
});
```

## Roles y permisos

El sistema de roles define los niveles de acceso y las acciones permitidas dentro del front-end.

Cada usuario tiene un campo `role` dentro de su sesión, el cual determina qué vistas o funcionalidades puede utilizar.

### Descripción de funciones

- **`isLoggedIn(user)`**  
  Retorna `true` si existe un usuario autenticado.  
  Se utiliza para validar si el usuario ha iniciado sesión antes de mostrar contenido protegido.

- **`isAdmin(user)`**  
  Retorna `true` si el rol del usuario es `ADMIN`.  
  Se usa para habilitar vistas o acciones exclusivas de administradores.

- **`isUser(user)`**  
  Retorna `true` si el rol del usuario es `USER`.  
  Ideal para identificar cuentas estándar o con permisos limitados.

- **`canEditUsers(user)`**  
  Retorna `true` si el usuario tiene un rol con privilegios para editar o gestionar otros usuarios.  
  Incluye a `ADMIN` y `MOD` (moderadores).

**Ejemplo:**

```ts
const { data: session } = useSession();

return (
    <div>
     {
        isAdmin(session?.user) && (
            <h1>Eres un admin</h1>
        )
     }
    </div>
)
```


## Planes y sus validaciones

El sistema de planes permite diferenciar los niveles de suscripción de los usuarios y controlar el acceso a funcionalidades según su tipo y estado.

- **isPro(user)**  
  Retorna `true` si el usuario tiene un plan de tipo `PRO`.  
  Se utiliza para habilitar funciones exclusivas de usuarios Pro.

- **isFree(user)**  
  Retorna `true` si el usuario tiene un plan de tipo `FREE`.  
  Se utiliza para identificar cuentas gratuitas y limitar funcionalidades.

- **isProActive(user)**  
  Retorna `true` si el usuario tiene un plan `PRO` y su estado es `"active"`.  
  Útil para verificar que un usuario Pro pueda acceder a servicios activos sin restricciones.

- **isProInactive(user)**  
  Retorna `true` si el usuario tiene un plan `PRO` pero su estado no es `"active"`.  
  Permite mostrar mensajes de renovación o advertencias sobre la expiración del plan.

- **getPlanName(plan)**  
  Devuelve el nombre legible del plan (`"Pro"`, `"Gratis"` o `"Ultra"`) según el valor del plan.  
  Se utiliza para mostrar el nombre del plan en la interfaz de manera amigable.

# Api-rest
# Repositorio para carrito de compras

* archivo index.js: archivo principal de la aplicacion del api-rest
  
* archivo middleware.js: archivo con metodos para generacion, validacion de token y verificacion de rol con JWT

* archivo config/database.js: archivo de la conexion con la base de datos

* archivo CarritoCompas.bak: el último bakup de la base de datos

* carpeta controllers: Todos los controladores y logica de negocio de los endpoints de la API

* carpeta Routes: Todas las rutas de los endpoint de la api


Endpoints importantes creados:

(Todos los endpoint a excepcion de login están protegidos por un token y por el rol del usuario. El id del rol del usuario debe ser 1 (Operador administrativo) para acceder)

1. login: http://localhost:3000/api/login
   
   {
   
    "correo_electronico": "correodeprueba@gmail.com",
   
    "contrasenia": "contraseña"
   
   }


2. Estados:
   
   Creación de Estados (POST): http://localhost:3000/api/estados/
   
   {
   
    "estado": "prueba"
   
   }

   
      Actualiación de Estados (PUT): http://localhost:3000/api/estados/idestado
   
   {
   
    "estado": "prueba2"
   
   }


3. Usuarios:
   
   Creación de Usuarios (POST): http://localhost:3000/api/usuario
   
   {
   
    "rol_idrol": idrol,
   
    "estados_idestados": idestado,
   
    "correo_electronico": "correo1@dominio.com",
   
    "nombre_completo": "nombre de persona",
   
    "contrasenia": "contraseña",
   
    "telefono": "XXXXXXX",
   
    "fecha_nacimiento": "YYYY-mm-dd"
   
  }

  
    Actualización de Usuarios (PUT): http://localhost:3000/api/usuario/idusuario
  
    Nota: Este endpoint permite actualizar cualquier campo sin importar si se ingresa el campo o no
  
  Ejemplo 1:
  
  {
  
    "correo_electronico": "correo2@dominio.com",
    
    "nombre_completo": "Nombre de persona 2"
    
  }
  
  Ejemplo 2:
  
  {
  
    "contrasenia": "Nueva contraseña"
    
  }

  
4. Categoria de productos:
   
   Creacion de Categoria de productos (POST): http://localhost:3000/api/categoriaproductos/
   
   {
   
    "usuarios_idusuarios": idusuario,
   
    "nombre": "Categoria",
   
    "estados_idestados": idestado
   
   }
   

  Actualiización de Categoria de productos (PUT): http://localhost:3000/api/categoriaproductos/idcategoriaproductos
  
  Nota: Este endpoint permite actualizar cualquier campo sin importar si se ingresa el campo o no
  
  {
  
    "nombre": "Nuevo nombre de categoria"
    
  }
  

5. Productos:
   
  Creación de Productos (POST): http://localhost:3000/api/productos/
  
  {
  
    "categoriaproductos_idcategoriaproductos": idcategoriaproducto, 
    
    "usuarios_idusuarios": idusuario,
    
    "nombre": "Nombre de producto",
    
    "marca": "marca",
    
    "codigo": "codigo",
    
    "stock": XXX,
    
    "estados_idestados": idestado,
    
    "precio": XXX,
    
    "foto": "ruta de imagen" (almacena la imagen, no la ruta)
    
  }
  

  Actualiización de productos (PUT): http://localhost:3000/api/productos/idproductos
  
  Nota: Este endpoint permite actualizar cualquier campo sin importar si se ingresa el campo o no
  
  {
  
    "marca": "Nueva marca",
    
    "foto": "Nueva ruta de imagen" (almacena la imagen, no la ruta)
    
  }

6. Orden (maestro-detalle)
   
   Creación de Ordenes y detalles (POST): http://localhost:3000/api/orden/detalles/
   
   {
   
    "usuarios_idusuarios": idusuario,
   
    "estados_idestados": idestado,
   
    "nombre_completo": "nombre cliente",
   
    "direccion": "direccion",
   
    "telefono": "XXXXXXXX",
   
    "correo_electronico": "correocliente@dominio.com",
   
    "fecha_entrega": "YYYY-mm-dd",
   
    "total_orden": XXX,
   
    "detalles_orden": [
   
        {
   
            "productos_idproductos": idproducto,
   
            "cantidad": X,
   
            "precio": XX,
   
            "subtotal": XX
   
        },
   
        {
   
            "productos_idproductos": idproducto,
   
            "cantidad": X,
   
            "precio": XX,
   
            "subtotal": XX
   
        }
   
    ]
   
   }
   

  Actualización de ordenes (PUT); http://localhost:3000/api/orden/detalles/idorden
  
  Nota: Este endpoint permite actualizar cualquier campo sin importar si se ingresa el campo o no
  
  {
  
    "direccion": "direccion",
    
    "fecha_entrega": "YYYY-mm-dd"
    
  {

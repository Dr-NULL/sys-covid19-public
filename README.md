# SYS-Covid19

Proyecto enfocado a realizar seguimiento sintomáticos de los trabajadores de la planta de Frigosorno SA.

## Despliege Backend
- Posicionarse en la carpeta `'./server'`:
```bash
$ cd server
```

- Descargar dependencias:
```bash
$ npm i
```

- Transpilar a JS:
```bash
$ npx tsc
```

- Crear archivos de configuración y modifíquelos según sus necesidades:
```bash
$ npm start setup
```

- Después de configurar `'./appconfig.json'` y `'./ormconfig.json'`, se debe de crear una base de datos vacía a la cual se migrarán las entidades creadas en el proyecto *(asumiendo que, para el ejemplo, se configuró __NAME_DB__ como nombre de base de datos en `'./ormconfig.json'`)*:
```sql
USE master
GO

CREATE DATABASE NAME_DB
GO
```

- Migrar entidades a base de datos:
```bash
$ npx typeorm migration:run
```

- Insertar datos :
```bash
$ npx typeorm migration:run
```
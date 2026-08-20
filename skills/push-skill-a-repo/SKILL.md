---
name: push-skill-a-repo
description: Genera los comandos de terminal exactos para llevar un skill nuevo o actualizado (SKILL.md) a uno de los dos repos de GitHub de Rafa — rafa (personal) o arrenda1-skills (institucional) — sin que Rafa tenga que especificar rutas, URLs ni recordar la sintaxis de git. Usar cuando Rafa pida "sube este skill a mi repo", "guarda esto en GitHub", "empújalo al repo de arrenda1/personal", o después de construir/editar un skill cuando quiera versionarlo.
---

Este skill NO ejecuta git directamente — Claude no tiene acceso de red a github.com desde su entorno de ejecución salvo para clonar repos públicos. El flujo real ocurre en la terminal de Rafa (macOS), usando la llave SSH ya configurada en su Mac (no requiere token en ningún paso). Tu trabajo es generar los comandos exactos, uno a la vez, y esperar confirmación de cada resultado antes de dar el siguiente — igual que en cualquier guía de terminal paso a paso con Rafa.

## Repos y rutas locales

- Personal: ~/rafa, remote SSH: git@github.com:rafatellezs/rafa.git
- Institucional (Arrenda1): ~/arrenda1-skills, remote SSH: git@github.com:rafatellezs/arrenda1-skills.git

Ambos ya están clonados localmente y configurados en SSH. No hay que clonar de nuevo ni pedir tokens.

## Paso 0 — Decidir el repo destino

Regla por defecto: skills personales de Rafa (voz, diseño, hermenéutica, cualquier cosa que use "Rafa" en el nombre o que sea de uso individual) van a rafa. Skills institucionales de Arrenda1 (crédito, elegibilidad, estilo institucional, SOPs, talento) van a arrenda1-skills.

Si el skill es ambiguo (podría servir a ambas entidades, o Rafa no ha dicho explícitamente cuál), pregunta antes de generar comandos — no asumas. Rafa puede decidir empujar algo personal al repo institucional si así lo quiere, pero eso requiere su indicación explícita, nunca inferencia automática.

## Paso 1 — Preparar el archivo localmente

Si el SKILL.md ya se generó en esta conversación, dile a Rafa los comandos para crear la carpeta y abrir el editor: mkdir -p seguido de la ruta, luego nano sobre el archivo nuevo. El repo es rafa o arrenda1-skills según el Paso 0, y el nombre del skill va en kebab-case.

Después de que Rafa pegue el contenido: recuérdale guardar con Ctrl+O, Enter, Ctrl+X.

Verifica siempre con cat sobre el archivo y confirma que el contenido coincide exactamente con lo que se le pidió pegar antes de seguir al commit — un pegado incompleto (falta el primer guion de apertura del frontmatter, por ejemplo) rompe el YAML.

## Paso 2 — Commit y push

cd a la carpeta del repo, luego git add de la ruta del archivo, luego git commit con mensaje "Add <nombre-skill> skill", luego git push.

No se necesita especificar rama ni remote — ambos repos están configurados para que git push sin argumentos vaya directo a origin main vía SSH.

Si el commit muestra el aviso de "Your name and email address were configured automatically", es informativo, no es error — no bloquea el push.

## Actualizar un skill existente (no crear uno nuevo)

Mismo Paso 0 para confirmar el repo. En lugar de mkdir + nano en blanco, usa nano directo sobre el archivo existente (nano abre con el contenido actual, no en blanco). Luego el mismo Paso 2, con mensaje de commit tipo "Update <nombre-skill> skill".

## Qué nunca hacer en este flujo

- Nunca generar ni pedir un token de acceso personal de GitHub — la autenticación ya está resuelta vía SSH.
- Nunca pedirle a Rafa que pegue un token, contraseña, o cualquier credencial en el chat.
- Nunca asumir el repo destino cuando el skill podría ir a cualquiera de los dos — preguntar explícitamente.
- Nunca saltarse la verificación con cat antes del commit — un frontmatter roto falla silenciosamente hasta que algo intenta cargar el skill.

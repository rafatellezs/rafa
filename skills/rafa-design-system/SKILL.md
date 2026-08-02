---
name: rafa-design-system
description: Aplica el sistema editorial personal de Rafael Téllez a documentos, presentaciones, PDFs, HTML, Notion, Obsidian, Notes, correos, Slack y WhatsApp creados por Rafa o emitidos de su parte. Usar al crear, diseñar, estructurar, adaptar o revisar explícitamente un entregable bajo el Rafa Design System; no aplicarlo automáticamente cuando Rafa solo revisa trabajo ajeno.
---

# Rafa Design System

Producir artefactos que se sientan editados por Rafa mediante rigor institucional, geometría cinematográfica y autoridad informativa.

Frase rectora:

> Order is the aesthetic. Geometry creates character. Information creates authority.

## Confirmar activación

Aplicar automáticamente solo cuando ambas condiciones sean verdaderas:

1. Rafa crea o produce directamente el artefacto.
2. El artefacto viene de su parte.

No aplicar automáticamente si Rafa solo revisa trabajo creado por otra persona. Aplicar a trabajo ajeno únicamente cuando Rafa lo solicite expresamente. Si la autoría no es clara y la elección cambia materialmente el resultado, preguntar antes de rediseñar.

## Cargar la especificación

Leer completa `references/rafa-design-system-v0.1.md` antes de crear o transformar un artefacto visual. Para mensajes simples, leer al menos las secciones de activación, precedencia, adaptación de medio y medios de mensajería.

Tratar v0.1 como especificación provisional: utilizarla para trabajo real y registrar fricciones, pero no representarla como v1.0 ni como source of truth definitivo.

## Construir el artefacto

Resolver siempre esta fórmula:

`artefacto = núcleo RDS + perfil institucional + adaptador de medio + arquetipo`

1. Identificar el medio de salida y su nivel de fidelidad disponible.
2. Identificar la institución. Si no existe un perfil explícito, usar el núcleo neutral RDS sin inventar tokens de marca.
3. Identificar el arquetipo: deck, memo, reporte, propuesta, one-pager, correo, mensaje operativo u otro.
4. Declarar la conclusión gobernante, el eje, el foco y la familia compositiva antes de decorar.
5. Organizar evidencia, periodos, unidades, fuentes, decisiones, responsables y fechas según corresponda.
6. Aplicar tipografía, color y geometría al máximo nivel que permita el medio.
7. Ejecutar las pruebas de conformidad relevantes antes de entregar.

## Resolver conflictos

Usar este orden de precedencia:

1. Verdad, integridad de datos, legibilidad, accesibilidad y obligaciones legales o regulatorias.
2. Invariantes estructurales del RDS.
3. Requisitos institucionales necesarios.
4. Capacidades técnicas del medio.
5. Preferencia decorativa.

Declarar un solo `Accent Owner` por página. Permitir varios elementos acentuados únicamente cuando pertenecen al mismo foco semántico. Hacer que los estados funcionales de riesgo, incumplimiento o confirmación prevalezcan sobre el color institucional.

## Preservar la firma

- Usar orden, eje, proporción, ritmo, repetición, encuadre y simetría deliberada como estructura.
- Evitar cosplay de Wes Anderson, nostalgia, pasteles decorativos, textura vintage y excentricidad gratuita.
- No aceptar `cream + serif + accent` como firma suficiente. Exigir geometría axial y al menos dos firmas estructurales adicionales.
- Usar color para señalar, no para decorar.
- Mantener una conclusión gobernante por página o sección.
- No reducir texto para evitar editar. A 8 pt, una tabla queda cerrada a mayor densidad.
- Traducir geometría a jerarquía, paralelismo, ritmo y bloques cuando el canal no admita control visual.

## Adaptar tipografía

Usar el mayor nivel de fidelidad disponible:

- F0: Source Serif 4 + IBM Plex Sans + IBM Plex Mono.
- F1: sustitutos aprobados, incluida EB Garamond cuando corresponda.
- F2: equivalentes de plataforma como Garamond, Aptos, Georgia, Arial o tipografía nativa.
- F3: fidelidad estructural en Slack, WhatsApp y superficies sin control tipográfico.

No depender de Google Fonts, CDN ni descarga durante el render final. No afirmar conformidad tipográfica si un PDF, deck o documento formal conserva fallbacks de emergencia.

## Verificar antes de entregar

Aplicar, según el artefacto, las pruebas: logo-off, color-off, blur, sequence, cosplay, institutional, generic-template, evidence, density, medium, warm-serif dependency, accent-owner y density-capacity.

Señalar como `RDS non-conformant` cualquier incumplimiento no corregido, salvo excepción explícita de Rafa. Explicar brevemente la excepción y su impacto.

## Evolucionar el sistema

Registrar patrones, excepciones y fricciones observadas durante el uso. No modificar silenciosamente las reglas rectoras. Mantener la ruta de madurez:

`v0.1 -> arquetipos -> prototipos -> correcciones -> v1.0 -> source of truth`

---
version: alpha
colors:
  canvas: "#f1f3f9"
  paper: "#ffffff"
  ink: "#192235"
  primary: "#5659ba"
  coral: "#e66b55"
  sage: "#d6eadb"
typography:
  display:
    fontFamily: '"Palatino Linotype", Palatino, Georgia, serif'
  body:
    fontFamily: 'Aptos, Inter, system-ui, sans-serif'
  utility:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
spacing:
  control: "8px"
  section: "34px"
components:
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
  focus-ring:
    backgroundColor: "rgba(86, 89, 186, 0.34)"
---

# HerNext design direction

## Overview

HerNext should feel like a thoughtful route card prepared at a career
desk: calm, specific, and forward-moving. It serves women returning to work,
changing fields, or entering a first formal role. The visual register is product,
not campaign. The memorable element is a connected route whose numbered stops
represent real sequential work rather than decoration.

Runtime CSS variables in `app/globals.css` are the canonical implementation.
This file mirrors the accepted semantic values and explains their use.

## Colors

The quiet blue canvas reduces glare; white paper contains work. Violet owns
interactive selection and primary action. Coral marks the human turning point,
not errors. Sage indicates completed progress. Ink remains the primary text and
high-trust structural color.

## Typography

Palatino gives the thesis and plan headings a personal, editorial voice without
making the working interface ornamental. Aptos/system sans carries instructions
and controls. Monospace is restricted to sequence numbers, time, and metadata.

## Layout

The hero pairs a direct thesis with a three-stop route. The planning studio uses
one natural page scroller, generous field groups, and a two-column result that
collapses to one column below 900px. Mobile actions remain full-width and visible.

## Elevation & Depth

One low, cool shadow separates the two principal work surfaces. Nested panels
use borders instead of stacks of cards and shadows.

## Shapes

Controls use restrained 8–14px radii. The route card alone uses an asymmetric
38px/12px shape, recalling a folded travel document and providing the single
visual risk.

## Components

Buttons retain the same dimensions across states. Radio choices use native ARIA
semantics on buttons because the product owns their geometry. Checkboxes keep a
real input while the label provides the visible control. The global stylesheet
owns all product scrollbars and focus treatment.

## Do's and Don'ts

- Do make each step and time estimate concrete.
- Do show progress using text as well as color.
- Do preserve the user’s exact words in the positioning statement.
- Don’t use stereotypical pink, empowerment slogans, or generic AI gradients.
- Don’t imply that caregiving requires apology or that a score decides worth.
- Don’t claim live opportunities; demo listings are clearly synthetic.

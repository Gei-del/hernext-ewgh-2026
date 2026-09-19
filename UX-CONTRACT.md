# ReStart Compass UX contract

Visual decisions live in `DESIGN.md`. The single page owns one planning flow and
uses document scrolling; no nested application shell is required.

| Operation | Trigger | Success | Failure and recovery |
| --- | --- | --- | --- |
| Load demo | `Load demo story` | Editable sample values replace the form | Not applicable; values are local constants |
| Build plan | `Build my ReStart plan` | Result opens and receives viewport focus | Inline errors identify missing fields; first invalid field receives focus |
| Complete step | Numbered step button | Progress and task state update | Local state is unchanged if activation does not complete |
| Choose match | Opportunity button | One match becomes selected and status is announced | Existing choice remains |
| Copy statement | Copy button | Clipboard receives visible statement | Status explains browser block and suggests manual selection |

The form uses `noValidate`; errors remain visible, entered values are preserved,
and no data leaves the page. Native text inputs and checkboxes own keyboard
behavior. Goal and time choices are authored radio buttons with `role=radio` and
`aria-checked`. All notices use one polite live region.

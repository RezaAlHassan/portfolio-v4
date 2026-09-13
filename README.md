# Reza Portfolio V4

Portfolio of Reza Al Hassan, a product designer and founder working on B2B systems, AI workflows, design systems, POS products, and warehouse operations.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Routes

| Route | Content |
| --- | --- |
| `/` | Portfolio homepage |
| `/zevian` | Current AI performance workflow case study |
| `/zevian-hrms` | Earlier HRMS interface-system case study |
| `/orderific` | Multi-product design-system case study |
| `/purno` | POS product case study |
| `/jayga` | Warehouse operations case study |
| `/portfolio` | Portfolio redesign case study |
| `/ai-workflows` | AI working methods |
| `/about` | About Reza |

## Structure

- `src/main.jsx` contains the React pages and route metadata.
- `src/styles.css` contains the complete responsive visual system.
- `public/` contains project evidence and machine-readable files.
- `DESIGN.md` and `.impeccable/design.json` document the design system.
- `public/llms.txt` gives AI agents a concise content map.

The site uses client-side routing. `public/_redirects` sends direct route visits to the application entry point on compatible static hosts.

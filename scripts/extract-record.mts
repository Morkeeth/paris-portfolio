// One-shot migration: pull the FACTS out of data.ts so the record can be hand-owned
// in the vault from here on. Presentation (color, image, featured, ordering) stays
// per-site: distinct in form, identical in facts.
import { STATS, PROJECTS, HACKATHON_TIMELINE, JOURNEY, ARC, AGENTIC_STACK } from '../app/shared/data.ts';

const FACT_KEYS = ['slug','name','oneLiner','story','result','buildTime','year','track','links','details','tag'];
const projects = (PROJECTS as any[]).map(p => {
  const o: any = {};
  for (const k of FACT_KEYS) if (p[k] !== undefined) o[k] = p[k];
  return o;
});
const presentation = Object.fromEntries((PROJECTS as any[]).map(p => [p.slug, {
  ...(p.color   !== undefined ? { color: p.color } : {}),
  ...(p.image   !== undefined ? { image: p.image } : {}),
  ...(p.featured!== undefined ? { featured: p.featured } : {}),
}]));

console.log(JSON.stringify({
  stats: STATS,
  timeline: HACKATHON_TIMELINE,
  projects,
  journey: JOURNEY,
  arc: ARC,
  agenticStack: AGENTIC_STACK,
  _presentation_stays_local: presentation,
}, null, 2));

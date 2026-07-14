'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OSCAR, LINKS, STATS, FEATURED, TRACKS, THOUGHTS, JOURNEY, COLORS, AGENTIC_STACK, STACK_INTRO, RECORD_POINTS } from '../shared/data';

const containerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jetbrains-mono)',
  backgroundColor: '#ffffff',
  color: '#000000',
  minHeight: '100vh',
  padding: '30px 20px',
  lineHeight: '1.5',
  fontSize: '13px',
  letterSpacing: '-0.3px',
};

const bannerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto 40px',
  fontSize: '11px',
  fontWeight: 400,
  color: '#333333',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: '1.4',
};

const headerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto 40px',
  paddingBottom: '12px',
  borderBottom: '1px solid #000000',
};

const nameStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  margin: '0 0 6px 0',
  letterSpacing: '0.5px',
  fontFamily: 'var(--font-jetbrains-mono)',
};

const taglineStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#555555',
  margin: '0',
  fontWeight: 400,
  lineHeight: '1.5',
};

const sectionStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto 45px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1.2px',
  marginBottom: '14px',
  color: '#000000',
  borderLeft: '2px solid #000000',
  paddingLeft: '10px',
};

const treeItemStyle: React.CSSProperties = {
  fontSize: '12px',
  marginBottom: '8px',
  lineHeight: '1.6',
  fontFamily: 'var(--font-jetbrains-mono)',
};

const treeIndentStyle: React.CSSProperties = {
  display: 'block',
  marginLeft: '20px',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '12px',
  marginBottom: '20px',
};

const statBlockStyle: React.CSSProperties = {
  border: '1px solid #000000',
  padding: '10px 12px',
  textAlign: 'left',
  backgroundColor: '#fafafa',
};

const statNumberStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '2px',
  letterSpacing: '-0.5px',
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '10px',
  color: '#666666',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
};

const projectTreeStyle: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '1.6',
  fontFamily: 'var(--font-jetbrains-mono)',
};

const projectLineStyle: React.CSSProperties = {
  marginBottom: '10px',
  paddingLeft: '20px',
  position: 'relative',
};

const projectNameStyle: React.CSSProperties = {
  fontWeight: 600,
  marginRight: '8px',
};

const footerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '50px auto 0',
  paddingTop: '16px',
  borderTop: '1px solid #000000',
  fontSize: '11px',
  color: '#666666',
};

const linkStyle: React.CSSProperties = {
  color: '#000000',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const linkContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  marginTop: '10px',
};

const asciiHeaderStyle: React.CSSProperties = {
  fontSize: '10px',
  lineHeight: '1.2',
  color: '#555555',
  marginBottom: '20px',
  whiteSpace: 'pre',
  fontWeight: 400,
};

export default function HaikuPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const systemBanner = `
  ════════════════════════════════════════════════════════════════════════
  ${OSCAR.name.toUpperCase()} | ${OSCAR.title.toUpperCase()}
  ════════════════════════════════════════════════════════════════════════`;

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={bannerStyle}
      >
        {systemBanner}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={headerStyle}
      >
        <h1 style={nameStyle}>
          {OSCAR.name}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 1.06, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
            style={{ marginLeft: 5, color: '#000000' }}
          >▋</motion.span>
        </h1>
        <p style={taglineStyle}>{OSCAR.location}. {OSCAR.tagline}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ system stats</h2>
        <div style={statsGridStyle}>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.hackathonWins}</div>
            <div style={statLabelStyle}>hackathon wins</div>
          </div>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.prizes}</div>
            <div style={statLabelStyle}>prize pool</div>
          </div>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.users}</div>
            <div style={statLabelStyle}>users shipped</div>
          </div>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.prevented}</div>
            <div style={statLabelStyle}>losses prevented</div>
          </div>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.terminals}</div>
            <div style={statLabelStyle}>terminals @ 3am</div>
          </div>
          <div style={statBlockStyle}>
            <div style={statNumberStyle}>{STATS.etableraPeak}</div>
            <div style={statLabelStyle}>etablera peak</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ tree --all</h2>
        <div style={projectTreeStyle}>
          {FEATURED.map((proj, idx) => {
            const firstOfTrack = idx === 0 || FEATURED[idx - 1].track !== proj.track;
            return (
            <React.Fragment key={proj.slug}>
              {firstOfTrack && (
                <div style={{ color: '#888888', fontSize: '11px', margin: '16px 0 6px', letterSpacing: '0.04em' }}>
                  # {TRACKS.find((t) => t.id === proj.track)?.label.toLowerCase()}/
                </div>
              )}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.03 * idx }}
            >
              <div
                style={{
                  ...projectLineStyle,
                  cursor: 'pointer',
                  backgroundColor: expandedProject === proj.slug ? '#f5f5f5' : 'transparent',
                  padding: '6px 12px',
                  marginLeft: 0,
                  marginBottom: '3px',
                }}
                onClick={() =>
                  setExpandedProject(expandedProject === proj.slug ? null : proj.slug)
                }
              >
                <span style={projectNameStyle}>{proj.name}</span>
                <span style={{ color: '#888888', fontSize: '11px' }}>
                  {proj.result} ({proj.year})
                </span>
              </div>
              {expandedProject === proj.slug && (
                <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#666666', marginBottom: '4px' }}>
                    {proj.oneLiner}
                  </div>
                  <div style={{ fontSize: '11px', color: '#555555', marginBottom: '6px', lineHeight: '1.5' }}>
                    {proj.story}
                  </div>
                  {proj.details && proj.details.length > 0 && (
                    <div style={{ fontSize: '10px', color: '#777777', marginTop: '4px' }}>
                      {proj.details.map((detail, i) => (
                        <div key={i} style={{ marginBottom: '2px' }}>
                          + {detail}
                        </div>
                      ))}
                    </div>
                  )}
                  {proj.links && (
                    <div style={{ fontSize: '10px', marginTop: '6px', display: 'flex', gap: '14px' }}>
                      {proj.links.live && <a href={proj.links.live} target="_blank" rel="noopener noreferrer" style={{ color: '#3bb58f', textDecoration: 'none' }}>[ live ↗ ]</a>}
                      {proj.links.repo && <a href={proj.links.repo} target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'none' }}>[ code ↗ ]</a>}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
            </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ stack --status</h2>
        <div style={{ fontSize: '11px', color: '#888888', marginBottom: '14px', marginLeft: '10px' }}>
          # {STACK_INTRO.title} — {AGENTIC_STACK.length} agents, one system
        </div>
        <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px' }}>
          {AGENTIC_STACK.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.04 * idx }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '7px 12px', marginBottom: '2px' }}
            >
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{s.layer}</span>
              <span style={{ color: '#999999', fontSize: '10px', whiteSpace: 'nowrap' }}>{s.sub}</span>
              <span style={{ flex: 1, borderBottom: '1px dotted #cccccc', transform: 'translateY(-3px)', minWidth: '20px' }} />
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{s.verb}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: '#555555', marginTop: '12px', marginLeft: '12px', lineHeight: '1.5' }}>
          // {STACK_INTRO.line}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ cat journey.log</h2>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {JOURNEY.map((entry, idx) => (
            <motion.li
              key={entry.year}
              style={treeItemStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.03 * idx }}
            >
              <span style={{ fontWeight: 600 }}>{entry.year}</span>
              <span style={{ color: '#888888', marginLeft: '8px' }}>({entry.place})</span>
              <span style={treeIndentStyle}>{entry.summary}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ ./record --plot</h2>
        <div style={{ fontSize: '11px', color: '#888888', marginBottom: '12px', marginLeft: '10px' }}>
          # prize won per event, 2018 → now
        </div>
        <div style={{ overflowX: 'auto' }}>
          <pre style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px', lineHeight: '1.7', margin: 0, color: '#000000' }}>
            {(() => {
              const maxUsd = Math.max(...RECORD_POINTS.map((p) => p.usd));
              return RECORD_POINTS.map((p) => {
                const n = p.usd ? Math.max(1, Math.round((p.usd / maxUsd) * 22)) : 0;
                const bar = n ? '█'.repeat(n) : '·';
                const label = (`'${p.year.slice(2)} ${p.name.toLowerCase()}`).padEnd(17).slice(0, 17);
                const amt = p.usd ? `$${p.usd.toLocaleString('en-US')}` : '—';
                const peak = p.usd === maxUsd ? '  ← peak' : '';
                return `${label} ${bar.padEnd(22)} ${amt}${peak}`;
              }).join('\n');
            })()}
          </pre>
        </div>
        <div style={{ fontSize: '11px', color: '#555555', marginTop: '12px', marginLeft: '10px', lineHeight: '1.5' }}>
          // · = ran, no purse. the bars stop in 2023; 2026 i stopped prize-hunting and started shipping.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={sectionStyle}
      >
        <h2 style={sectionTitleStyle}>$ echo thoughts</h2>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {THOUGHTS.map((thought, idx) => (
            <motion.li
              key={idx}
              style={{ ...treeItemStyle, color: '#555555', fontSize: '12px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 * idx }}
            >
              // {thought}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={footerStyle}
      >
        <div style={{ marginBottom: '8px' }}>$ who.contact</div>
        <div style={linkContainerStyle}>
          <a href={LINKS.email} style={linkStyle}>
            email
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            x
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            github
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            linkedin
          </a>
        </div>
      </motion.div>
    </div>
  );
}

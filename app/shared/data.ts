// ════════════════════════════════════════════════════════════
//  GLOBAL CONTEXT - single source of truth
//  update here, all model versions reflect the change
// ════════════════════════════════════════════════════════════

export const OSCAR = {
  name: 'Oscar Morke',
  title: 'staff pm at ledger',
  location: 'paris, from stockholm',
  tagline: 'wine and cheese between deploys.',
  philosophy: 'i like building things that are slightly too ambitious for the time i have.',
  origin: 'moved to paris alone at 30. sat at a cafe thinking this was either the bravest or stupidest thing. now it\'s home.',
  coding: 'i was always the pitch guy. 16 hackathons explaining why something matters while someone else built it. ai closed the gap. now the nights look like this: five terminals, one brief, ship by morning.',
  mantra: 'what if it works out?',
  email: 'omorke@gmail.com',
  bio: 'born in stockholm. lived in seoul and silicon valley. wallenberg fellow. two master\'s degrees in industrial engineering and entrepreneurship. co-founded a digital agency, ran product at a music startup, now protecting 20M users at ledger. hackathons became a sport.',
  selfDescription: 'i\'m the person in the room who asks "but who uses this tomorrow?" and then stays up building the answer.',
};

export const LINKS = {
  github: 'https://github.com/morkeeth',
  x: 'https://x.com/morkeeth',
  linkedin: 'https://linkedin.com/in/morkeeth',
  email: 'mailto:omorke@gmail.com',
};

export const STATS = {
  hackathonCount: 16,
  hackathonWins: 9,
  prizes: '$115K+',
  totalEthWon: '39.05 ETH',
  users: '40K',
  prevented: '$51M',
  terminals: 5,
  etableraPeak: '8,000',
  bounties: '30+',
  anotherblockVolume: '$2.1M',
};

export type Track = 'work' | 'agents' | 'hackathons';

// track metadata — order + section labels for grouping the cases
export const TRACKS: { id: Track; label: string; blurb: string }[] = [
  { id: 'work', label: 'Work', blurb: 'paid, owned, real scope' },
  { id: 'agents', label: 'Agents', blurb: '2026. five terminals, one brief, ship by morning' },
  { id: 'hackathons', label: 'Hackathons', blurb: '16 events, proven under pressure' },
];

export type Project = {
  name: string;
  slug: string;
  oneLiner: string;
  story: string;
  result: string;
  buildTime: string;
  year: string;
  track: Track;
  featured?: boolean; // shown as a highlight card; non-featured live only in the timeline
  color: string;
  details?: string[];
  image?: string; // /projects/<slug>.png — real screenshot, optional
};

export const PROJECTS: Project[] = [
  // ══ WORK — paid, owned, real scope ═══════════════════════════
  {
    name: 'Ledger',
    slug: 'ledger',
    featured: true,
    oneLiner: 'staff pm, trust & security. protecting 20M users',
    story: 'the work that decides whether someone loses everything signing a transaction. clear signing across btc/eth/sol so the screen actually explains what you\'re approving. blockaid integration ($51M in attacks prevented). chain assessment cut from 2 weeks to 2 hours.',
    result: 'protecting 20M users',
    buildTime: 'production',
    year: '2025-26',
    track: 'work',
    color: '#4a8fd9',
    image: '/projects/ledger.jpg',
    details: [
      'clear signing across BTC, ETH, SOL — if the screen can\'t explain the transaction, don\'t sign it',
      'blockaid integration: 800K transactions screened, $51M in losses prevented',
      'chain assessment: new-chain evaluation from 2 weeks to 2 hours, used weekly in production',
    ],
  },
  {
    name: 'Anotherblock',
    slug: 'anotherblock',
    featured: true,
    oneLiner: 'head of product at a music startup. fans investing in songs they loved',
    story: 'employee #4, founding team. real fans buying shares of their favorite songs. 0 to 40K users, $2.1M in sales. the product worked. distribution won.',
    result: '0 to 40K users',
    buildTime: '2.5 years',
    year: '2022-24',
    track: 'work',
    color: '#f2a039',
    image: '/projects/anotherblock.jpg',
    details: [
      'raised from J12, Swedish House Mafia, Inventure, Stride',
      'drops: Rihanna, The Weeknd, Michael Jackson, R3hab & Laidback Luke, Alan Walker, Offset & Metro Boomin',
      'official Coinbase Base launch partner (Onchain Summer + Art Basel)',
      'Digital Vinyls: SEC-compliant collectibles, became largest revenue source',
      '93K+ collectibles sold to 35K+ customers',
      'Republic joint venture for compliance (SNFT)',
      'grants: Superfluid + Optimism Foundation (15K OP)',
      'partners: Stripe, Republic, Crossmint, Superfluid, Base, Fireblocks',
      'pivoted entire product vision from OpenSea competitor to music rights',
    ],
  },
  {
    name: 'Etablera',
    slug: 'etablera',
    featured: true,
    oneLiner: 'sweden\'s largest hackathon series. 88 to 8,000 over four years',
    story: 'started with 88 people in a room in stockholm. designed the team formation system. four years later, 8,000 participants across the country and 200+ prototypes shipped.',
    result: '88 to 8,000',
    buildTime: '4 years',
    year: '2017-20',
    track: 'work',
    color: '#3bb58f',
    image: '/projects/etablera.jpg',
    details: [
      'co-founded creative/digital agency',
      '30+ clients from startups to government agencies',
      '4+ government contracts',
      'worked with Sana Labs',
      'team formation algorithm for strangers to build together',
      '200+ prototypes shipped by participants',
      'learned to shoot and edit video along the way',
    ],
  },

  // ══ AGENTS — 2026 side builds ════════════════════════════════
  {
    name: 'RELAY',
    slug: 'relay',
    featured: true,
    oneLiner: 'ai agents hire verified humans for tasks they cannot do',
    story: '48h build at World Build 3. agents post tasks, humans accept, smart contracts escrow the money. coinfund noticed. world dev team reached out.',
    result: '2nd / 500 teams',
    buildTime: 'built in 48h',
    year: '2026',
    track: 'agents',
    color: '#f2a039',
    image: '/projects/relay.png',
    details: [
      'smart contract escrow between agents and humans',
      'world id verification for task acceptance',
      'coinfund and world dev team outreach after demo',
    ],
  },
  {
    name: 'Yieldbound',
    slug: 'yieldbound',
    featured: true,
    oneLiner: 'autonomous defi. spends yield, never principal',
    story: 'built at synthesis hackathon. gave an ai agent a treasury and one rule: spend the yield, never touch the principal. your money stays yours.',
    result: '2nd / 646',
    buildTime: 'built in 48h',
    year: '2026',
    track: 'agents',
    color: '#2d5ff5',
    image: '/projects/yieldbound.png',
  },
  {
    name: 'RECEIPT',
    slug: 'receipt',
    featured: true,
    oneLiner: 'cryptographic proof agents did what they claimed',
    story: 'on-chain execution hashes. the problem: agents sound confident regardless of quality. you can\'t tell from the output. receipts are the only honest layer.',
    result: 'ethglobal finalist',
    buildTime: 'built in 36h',
    year: '2026',
    track: 'agents',
    color: '#e84033',
    image: '/projects/receipt.png',
  },
  {
    name: 'BriefMCP',
    slug: 'briefmcp',
    oneLiner: 'shared context layer so agents stop re-explaining everything',
    story: 'agents can\'t read your spec docs. briefmcp gives them a protocol to share context. built at paris innov\'hack against 50 teams.',
    result: 'paris finalist',
    buildTime: 'built in 24h',
    year: '2026',
    track: 'agents',
    color: '#9b6fc0',
  },
  {
    name: 'People Radar',
    slug: 'people-radar',
    oneLiner: 'a crm that reads my actual messages instead of asking me to fill forms',
    story: 'scores 1,200+ contacts across imessage, whatsapp, instagram, facebook, linkedin. runs every 6 hours via cron. no api, no cloud. all local sqlite.',
    result: 'running daily',
    buildTime: 'nights',
    year: '2026',
    track: 'agents',
    color: '#1db954',
  },
  {
    name: 'Bagel',
    slug: 'bagel',
    oneLiner: 'autonomous agent living on a server in germany',
    story: 'runs on hetzner. writes content, scouts hackathons, delivers a daily brief at 8am. has its own memory, its own cron jobs, its own opinions.',
    result: 'still alive',
    buildTime: 'weekends',
    year: '2026',
    track: 'agents',
    color: '#ff5c8a',
  },
  {
    name: 'Loop',
    slug: 'loop',
    featured: true,
    oneLiner: 'one magical event a week, picked for you',
    story: 'reads your calendar, builds a persona from the past few months, then searches the web for the one niche event you\'d never find on your own. with consent, drops it straight into your calendar. real-time, nothing stored.',
    result: 'live demo',
    buildTime: 'nights',
    year: '2026',
    track: 'agents',
    color: '#6a5cff',
    image: '/projects/loop.png',
  },

  // ══ HACKATHONS — the competitive record ══════════════════════
  {
    name: 'Gates',
    slug: 'gates',
    featured: true,
    oneLiner: 'human authentication for world. 9 bounties at eth bogota',
    story: 'decentralized identity + custom conditions for dapps, metaverse, and NFT projects. proof-of-personhood gate using world id. the question: how do you let humans in and keep bots out.',
    result: '9 bounties',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#9b6fc0',
    image: '/projects/gates.jpg',
    details: [
      'Optimism: Governance and Community Infrastructure',
      'Worldcoin: Best Social App',
      'Coinbase Cloud: 2nd Place + Best Wallet Integration',
      'ENS: I Saw The Sign + Pool Prize',
      'The Graph: Best Use of Existing Subgraph',
      'Ceramic: Best Use of Data Composites',
      'Quicknode: Best Use',
    ],
  },
  {
    name: 'ArbiGates',
    slug: 'arbigates',
    oneLiner: 'won arbitrum\'s first-ever hackathon',
    story: 'quality-gating via livepeer streams and automated minting via chainlink. when users pass custom conditions, unlock higher quality streams or trigger mints.',
    result: '#1 winner',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#2d5ff5',
    details: [
      'Livepeer + Chainlink integration',
      '$13.5K prize (10.34 ETH)',
    ],
  },
  {
    name: 'NFT Safe Launch',
    slug: 'nft-safe-launch',
    oneLiner: 'on-chain roadmaps so minters can hold projects accountable',
    story: 'extend your ERC-721 with an on-chain roadmap and invite minters to governance. no more empty promises and rug pulls.',
    result: 'ethglobal finalist',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#e84033',
    details: [
      'ETH NYC finalist',
      'Valist: Best Use',
      'UMA: Silver Prize',
    ],
  },
  {
    name: 'AAtomato',
    slug: 'aatomato',
    oneLiner: 'unlimit + aave tooling at eth istanbul',
    story: 'double win at eth istanbul. built payment infrastructure with unlimit and dao tooling for aave grants.',
    result: '$7K in prizes',
    buildTime: 'built in 48h',
    year: '2023',
    track: 'hackathons',
    color: '#c8963a',
    details: [
      'Unlimit: 1st Place ($4K USDC)',
      'Aave Grants DAO: Best Tooling ($3K USDC)',
    ],
  },
  {
    name: 'Swosh.cash',
    slug: 'swosh',
    oneLiner: 'payments on scroll + social via lens at eth denver',
    story: 'built at eth denver. combining scroll\'s L2 with lens protocol for social-first payments.',
    result: 'scroll + lens prizes',
    buildTime: 'built in 48h',
    year: '2023',
    track: 'hackathons',
    color: '#3bb58f',
  },
  {
    name: 'Contrib',
    slug: 'contrib',
    oneLiner: 'open source contribution rewards. bridging governance to action',
    story: 'won eth lisbon with tally & metacartel. dao bounty board where members contribute and earn tokens, reputation, and achievements. antler offered $95K to build it full time. said no.',
    result: 'eth lisbon winner',
    buildTime: 'built in 48h',
    year: '2021',
    track: 'hackathons',
    color: '#2d5ff5',
    details: [
      'winner with Tally & MetaCartel',
      'Antler program, $95K offer declined',
      '800+ community members across Contrib + MatosDAO',
      '42 crypto bar meetups in stockholm',
      'integrated Snapshot subgraph for multi-tool governance',
    ],
  },
];

// highlight reel — the cards shown on pages. the full range lives in HACKATHON_TIMELINE.
export const FEATURED = PROJECTS.filter((p) => p.featured);

export const HACKATHON_TIMELINE = [
  { date: '2021-10', name: 'ETH Lisbon', project: 'Contrib', prize: '$13,200', eth: '3.00', ethPrice: '$4,132', bounties: 'Tally + MetaCartel winner' },
  { date: '2022-06', name: 'ETH NYC', project: 'NFT Safe Launch', prize: '$10,392', eth: '8.71', ethPrice: '$1,193', bounties: 'Finalist, Valist Best Use, UMA Silver' },
  { date: '2022-10', name: 'ETH Bogota', project: 'Gates.wtf', prize: '$14,169', eth: '10.85', ethPrice: '$1,323', bounties: '9 bounties: Optimism, Worldcoin, Coinbase x2, ENS x2, The Graph, Ceramic, Quicknode' },
  { date: '2022-10', name: 'Arbitrum #1', project: 'ArbiGates', prize: '$13,500', eth: '10.34', ethPrice: '$1,306', bounties: '#1 Winner' },
  { date: '2023-03', name: 'ETH Denver', project: 'Swosh.cash', prize: '$3,500', eth: '2.24', ethPrice: '$1,561', bounties: 'Scroll + Lens' },
  { date: '2023-07', name: 'ETH Paris', project: 'Headstart', prize: '$800', eth: '0.48', ethPrice: '$1,652', bounties: '' },
  { date: '2023-11', name: 'ETH Istanbul', project: 'AAtomato', prize: '$7,056', eth: '3.43', ethPrice: '$2,022', bounties: 'Unlimit 1st, Aave DAO Best Tooling' },
  { date: '2025-11', name: 'Tech Europe', project: 'Loop', prize: '', eth: '', ethPrice: '', bounties: '' },
  { date: '2026-01', name: 'Paris Innov\'Hack', project: 'BriefMCP', prize: '', eth: '', ethPrice: '', bounties: 'Finalist / 50 teams' },
  { date: '2026-03', name: 'Synthesis', project: 'Yieldbound', prize: '$1,000', eth: '', ethPrice: '', bounties: '2nd / 646' },
  { date: '2026-04', name: 'World Build 3', project: 'RELAY', prize: '$2,500', eth: '', ethPrice: '', bounties: '2nd / 500 teams' },
  { date: '2026-05', name: 'ETH Open Agents', project: 'RECEIPT', prize: '', eth: '', ethPrice: '', bounties: 'ETHGlobal finalist' },
];

export const THOUGHTS = [
  'every agent demo looks amazing. then you ask who uses it tomorrow and the room goes quiet.',
  'agents sound confident regardless of quality.',
  'product was better. distribution won.',
  'the best hack is knowing when to stop hacking.',
  'minimalism is where i am from. maximalism is where i live.',
  OSCAR.philosophy,
];

export const JOURNEY = [
  { year: '2017-20', place: 'stockholm', chapter: 'community', summary: 'co-founded etablera. 88 to 8,000 participants. 30+ clients. digital agency. sana labs. learned how strangers become teams.' },
  { year: '2019', place: 'silicon valley', chapter: 'wallenberg', summary: 'wallenberg fellow at nordic innovation house. helped 180 companies navigate the US market. learned what happens when scandinavian politeness meets SF hustle.' },
  { year: '2021', place: 'lisbon', chapter: 'crypto', summary: 'won eth lisbon (contrib). founded matos dao. 42 crypto bars. 800+ community. said no to $95K from antler.' },
  { year: '2022', place: 'nyc / bogota', chapter: 'hackathon', summary: '4 wins in one year. 9 bounties at eth bogota. arbitrum #1. nft safe launch finalist. gates.wtf.' },
  { year: '2022-24', place: 'stockholm / paris', chapter: 'music', summary: 'anotherblock. employee #4. head of product. rihanna, weeknd, michael jackson on-chain. 40K users, $2.1M volume. coinbase base launch partner. moved to paris.' },
  { year: '2025', place: 'paris', chapter: 'security', summary: 'staff pm at ledger. blockaid ($51M prevented), chain assessment (2 weeks to 2 hours), clear signing BTC/ETH/SOL. protecting 20M users.' },
  { year: '2026', place: 'paris', chapter: 'agents', summary: '5 terminals at 3am. relay, receipt, yieldbound, briefmcp, people radar, bagel. 16 hackathons. $62.6K in prizes. 39 ETH.' },
];

export const COLORS = {
  orange: '#f2a039',
  blue: '#2d5ff5',
  red: '#e84033',
  green: '#1db954',
  purple: '#9b6fc0',
  pink: '#ff5c8a',
  teal: '#3bb58f',
  ledger: '#4a8fd9',
};

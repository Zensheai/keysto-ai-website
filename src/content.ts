// ─────────────────────────────────────────────────────────────────────────────
// Keys to AI — site content (single source of truth for all copy + links).
// Edit text or links HERE; components read from this file. Colors live in
// src/styles/theme.css. To add the 3 blog-article pages later, extend `blog.posts`
// with a `body` and build a detail route.
// ─────────────────────────────────────────────────────────────────────────────

const YT_CHANNEL = "https://youtube.com/@keystoaiOfficial";

// Article body block types — used by blog detail pages.
export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; label: string; text: string }
  | { type: "video" };

// Tool stack — shared by the home "AI Tools Library" strip and the /ai-tools page.
const tools = [
  {
    icon: "✨",
    name: "Kimi K2.6",
    homeName: "Kimi K2.6",
    badge: "TESTING",
    category: "RESEARCH & WRITING",
    blurb:
      "The AI research and writing tool I am excitedly testing right now. Exceptional at long-form content and deep research.",
    homeOneLiner: "Long-form writing + research + content creation",
    bestFor: "Long-form writing, research synthesis, content drafts",
    pricing: "Free tier available; paid plans for heavy use",
    whyIUseIt:
      "I test every AI writing tool that hits the market. Kimi K2.6 has the best grasp of context for long-form content — it remembers what you told it 10 messages ago, which matters when you are building a 2000-word script.",
    workflow: "Drop research notes → ask for outline → refine with follow-ups → export draft",
    pros: ["Excellent context memory", "Great for long-form", "Clean interface"],
    cons: ["Still testing reliability", "Fewer integrations than Claude"],
    cta: "Try Kimi K2.6 →",
    link: "https://kimi.com",
  },
  {
    icon: "📁",
    name: "Claude Desktop",
    homeName: "Claude Desktop",
    badge: "CORE SYSTEM",
    category: "DEEP WORK",
    blurb:
      "The working setup I use to stop re-explaining context before every deep work session. Brand context, scripts, and research in one place.",
    homeOneLiner: "Projects + saved system prompts + project context",
    bestFor: "Project-based work, coding, analysis, content planning",
    pricing: "Free tier; Pro at $20/month",
    whyIUseIt:
      "Claude Projects changed how I work. I set up one project per video series, save all my brand context, system prompts, and research inside it, and never have to re-explain myself. It is the single biggest time-saver in my stack.",
    workflow: "Create Project → save system prompt → add research files → iterate inside the project",
    pros: ["Project-based organization", "Massive context window", "Excellent at following instructions"],
    cons: ["No native web browsing", "Can be verbose"],
    cta: "Try Claude Desktop →",
    link: "https://claude.ai",
  },
  {
    icon: "🤖",
    name: "HeyGen",
    homeName: "HeyGen",
    badge: "AVATAR",
    category: "VIDEO PRODUCTION",
    blurb:
      "How I build AI avatars for content. From a single photo to a speaking, moving avatar that handles video creation.",
    homeOneLiner: "Avatar creation + video generation + voice sync",
    bestFor: "Avatar videos, multilingual content, faceless channels",
    pricing: "Starts at $24/month",
    whyIUseIt:
      "I wanted to create avatar-based tutorials without the uncanny valley effect. HeyGen has the most natural-looking avatars and the lip-sync is genuinely impressive. I use it for explainer-style videos where showing my face on camera is not the priority.",
    workflow: "Upload photo → record voice or use voice clone → generate video → edit in Canva",
    pros: ["Most natural avatars", "Great lip-sync", "Multilingual support"],
    cons: ["Monthly cost adds up", "Some gestures feel robotic"],
    cta: "Try HeyGen →",
    link: "https://heygen.com",
  },
  {
    icon: "🎧",
    name: "ElevenLabs",
    homeName: "ElevenLabs",
    badge: "VOICE",
    category: "AUDIO PRODUCTION",
    blurb:
      "The AI voice tool I use to create natural-sounding voiceovers. Clone your voice or design a new one without sounding robotic.",
    homeOneLiner: "Voice cloning + text-to-speech + voice design",
    bestFor: "Voiceovers, voice cloning, multilingual audio",
    pricing: "Free tier; Starter at $5/month",
    whyIUseIt:
      "The voice cloning quality is the best I have tested. I cloned my own voice and use it for voiceovers when I do not want to record audio manually. It sounds natural enough that viewers do not notice the difference.",
    workflow: "Record voice sample → clone voice → paste script → generate audio → drop into editor",
    pros: ["Best-in-class voice cloning", "Huge voice library", "Affordable starter plan"],
    cons: ["Accent nuances can slip", "Long texts need chunking"],
    cta: "Try ElevenLabs →",
    link: "https://elevenlabs.io",
  },
  {
    icon: "⚡",
    name: "Make.com",
    homeName: "Make.com",
    badge: "AUTOMATION",
    category: "WORKFLOW AUTOMATION",
    blurb:
      "Visual automation builder for connecting apps and removing repetitive admin. More flexible than Zapier with a visual canvas.",
    homeOneLiner: "Visual scenarios + app connections + content handoffs",
    bestFor: "Connecting apps, automating repetitive tasks, content pipelines",
    pricing: "Free tier; Core at $9/month",
    whyIUseIt:
      "I switched from Zapier to Make because the visual builder makes it easier to understand complex workflows at a glance. I automate my content pipeline: new video idea → Notion entry → draft created → thumbnail request sent.",
    workflow: "Map workflow visually → connect apps → set triggers → test → activate",
    pros: ["Visual workflow builder", "More affordable than Zapier", "Huge app library"],
    cons: ["Steeper learning curve", "Complex scenarios can break silently"],
    cta: "Try Make.com →",
    link: "https://make.com",
  },
  {
    icon: "🗂",
    name: "Notion",
    homeName: "Notion creator OS",
    badge: "GUIDE",
    category: "CREATOR FAVORITE",
    blurb:
      "The calm home base for keeping tutorials, content plans, AI workflows, and brand assets organized in one system.",
    homeOneLiner: "Ideas, scripts, resources, and publishing status",
    bestFor: "Content planning, knowledge base, project management",
    pricing: "Free for personal use; Plus from $10/month",
    whyIUseIt:
      "Every creator needs a calm home base. Notion is mine. I track video ideas, script drafts, resource links, and publishing schedules in one place. The AI features inside Notion are getting better too — I use them for quick summaries.",
    workflow: "Ideas database → content calendar → scripts → resources library → publish tracker",
    pros: ["Infinitely flexible", "Great templates", "AI features built-in"],
    cons: ["Can become a mess without discipline", "Mobile app is slow"],
    cta: "Try Notion →",
    link: "https://notion.so",
  },
  {
    icon: "🎨",
    name: "Canva",
    homeName: "Canva",
    badge: "VISUALS",
    category: "DESIGN",
    blurb:
      "The design tool behind every thumbnail, social post, and lead magnet on Keys to AI. Design once, reuse the visual language everywhere.",
    homeOneLiner: "Thumbnails + social graphics + lead magnets",
    bestFor: "Thumbnails, social posts, lead magnets, quick video edits",
    pricing: "Free plan; Pro at $15/month",
    whyIUseIt:
      "I design once, then reuse the same visual language across everything. Thumbnails, worksheets, social posts — Canva keeps my brand consistent without a designer. I even use it for quick video edits and captions on avatar clips.",
    workflow: "Brand kit → template → duplicate for each new video → export",
    pros: ["Fast, reusable templates", "Brand kit keeps everything consistent", "Handles quick video edits too"],
    cons: ["Advanced editing is limited", "Easy to over-design"],
    cta: "Try Canva →",
    link: "https://canva.com",
  },
  {
    icon: "📊",
    name: "Airtable",
    homeName: "Airtable",
    badge: "TRACKER",
    category: "CONTENT OPS",
    blurb:
      "The structured tracker for my whole content pipeline — what's filmed, edited, published, and ready to repurpose.",
    homeOneLiner: "Content pipeline + status tracking + repurposing queue",
    bestFor: "Content pipelines, structured tracking, publishing databases",
    pricing: "Free plan; Team at $20/month",
    whyIUseIt:
      "Notion holds my ideas; Airtable keeps me honest. Every video moves through a pipeline — scripted, filmed, edited, published, repurposed — and a structured view shows me exactly what's stuck and what's ready to ship.",
    workflow: "New idea record → status field per stage → filtered views → repurpose queue",
    pros: ["Structured views keep the pipeline honest", "Powerful filters and automations", "Plays well with Make.com"],
    cons: ["Per-seat pricing adds up on teams", "Overkill for a simple list"],
    cta: "Try Airtable →",
    link: "https://airtable.com",
  },
];

export const site = {
  brand: { name: "Keys to AI", initial: "K", tagline: "YouTube companion hub" },
  watchUrl: YT_CHANNEL,

  // Scrolling marquee band shown just below the hero. Edit/reorder freely.
  marquee: [
    "Solopreneur focused",
    "No code required",
    "Free resources",
    "YouTube tutorials",
    "Weekly AI workflows",
  ],

  // Nav is shared. Route links use clean BrowserRouter paths; section links jump to home anchors.
  nav: [
    { label: "Home", href: "/" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Workflows", href: "/#workflow" },
    { label: "Resources", href: "/#resources" },
  ],

  social: {
    youtube: YT_CHANNEL,
    x: "https://x.com/to_keys94370",
    instagram: "https://www.instagram.com/keystoaiofficial/",
  },

  hero: {
    eyebrow: "OFFICIAL COMPANION SITE FOR THE KEYS TO AI YOUTUBE CHANNEL",
    title: ["AI Workflows", "Made Simple"],
    subtitle:
      "I teach solopreneurs how to use AI to run and grow their business — no-code tools like Claude, HeyGen, ElevenLabs, and more — broken down step by step. No tech background required.",
    primaryCta: { label: "Watch the Full Tutorial", href: "https://youtube.com/@keystoaiOfficial" },
    secondaryCta: { label: "Get the Free Worksheet", href: "#resources" },
    scrollCue: "SCROLL",
    image: "/images/hero-simone.png",
  },

  channel: {
    eyebrow: "FROM THE CHANNEL",
    title: "Start with the tutorials viewers watch first.",
    tutorials: [
      {
        badge: "CLAUDE",
        title: "Stop Re-Explaining Yourself to Claude",
        blurb: "Desktop setup tutorial for solopreneurs who want a reusable working context.",
        image: "/images/tutorial-claude.jpg",
        href: "https://www.youtube.com/watch?v=6tZTOkPWZ7o&t=248s&pp=0gcJCSgLAYcqIYzv",
        cta: "Watch on YouTube →",
      },
      {
        badge: "AI TOOLS",
        title: "The 8-Tool AI Stack Every Solopreneur Needs",
        blurb: "A guide to the core tools in a practical solopreneur AI workflow.",
        image: "/images/tutorial-tools.jpg",
        href: "https://www.youtube.com/watch?v=VquszjmTFrU&pp=0gcJCSgLAYcqIYzv",
        cta: "Watch on YouTube →",
      },
      {
        badge: "AVATAR",
        title: "Bring Your AI Avatar to Life with HeyGen",
        blurb: "Step-by-step HeyGen tutorial for building your AI avatar workflow.",
        image: "/images/tutorial-avatar.jpg",
        href: "https://www.youtube.com/watch?v=R0EmUT4EX2g&t=2s",
        cta: "Watch on YouTube →",
      },
    ],
  },

  featured: {
    eyebrow: "FEATURED TUTORIAL",
    badge: "CLAUDE",
    title: "Stop Re-Explaining Yourself to Claude",
    blurb: "The desktop setup tutorial every solopreneur should watch first.",
    videoId: "6tZTOkPWZ7o",
    embed: "https://www.youtube.com/embed/6tZTOkPWZ7o?autoplay=1&rel=0&start=248",
    href: "https://www.youtube.com/watch?v=6tZTOkPWZ7o&t=248s&pp=0gcJCSgLAYcqIYzv",
    cta: "Watch on YouTube →",
  },

  simone: {
    eyebrow: "FROM SIMONE",
    quote:
      "I teach the AI systems I would actually trust in a solo business: simple enough to repeat, useful enough to save real hours.",
    name: "Simone Keys",
    role: "Creator, Keys to AI",
    image: "/images/creator-portrait.jpg",
    video: "/videos/about-simone.mp4",
    ctaLabel: "Watch how I set it up →",
    ctaHref: "https://youtube.com/@keystoaiOfficial",
  },

  system: {
    eyebrow: "THE SYSTEM",
    title: "Three phases. One repeatable system.",
    steps: [
      { n: "01", title: "Capture", body: "Turn video notes, client questions, or trend research into a clear starting point." },
      { n: "02", title: "Build", body: "Choose the right AI tool, prompt structure, and automation path for the job." },
      { n: "03", title: "Ship", body: "Create templates, checklists, and repeatable systems you can return to every week." },
    ],
    footnote: "This is how every tutorial becomes a system you can actually use.",
  },

  // Home "AI Tools Library" strip (short cards). Uses the shared `tools` list.
  toolsLibrary: {
    eyebrow: "AI TOOLS LIBRARY",
    title: "Practical guides for the tools creators already use.",
    cta: { label: "Get tool updates →", href: "#newsletter" },
    intro:
      "Inside Simone's creator operating system. A curated stack of AI tools I am actively testing and building with — from Kimi K2.6 for research to HeyGen for avatars. What actually works.",
    tools,
  },

  startHere: {
    eyebrow: "NEW HERE? START HERE",
    title: "Your first three steps.",
    steps: [
      { n: "01", title: "Watch the Setup Tutorial", body: "See exactly how I configure Claude Desktop for deep work — the same setup I use every day.", cta: "Watch Now", href: YT_CHANNEL },
      { n: "02", title: "Download the Worksheet", body: "Get the AI content planning worksheet + automation audit checklist to turn what you learn into action.", cta: "Get the Worksheets", href: "#resources" },
      { n: "03", title: "Join the Newsletter", body: "One email a week with the single AI workflow worth your time — straight from my own stack.", cta: "Subscribe", href: "#newsletter" },
    ],
  },

  resources: {
    eyebrow: "FREE RESOURCES FROM VIDEOS",
    title: "Download the worksheets, prompt packs, and checklists mentioned on YouTube.",
    intro: "Curated companion materials. Built to help viewers turn a tutorial into a practical next step.",
    worksheetUrl: "/resources/ai-content-planning-worksheet.html",
    // `file` = the resource delivered after email capture (served from /public/resources).
    // `group` = optional MailerLite group id; fill it to route this resource's subscribers
    // to a group (e.g. for an automated email that sends the file). Empty = default list only.
    items: [
      { icon: "📋", iconKey: "calendar", tag: "UPDATED THIS WEEK", title: "AI content planning worksheet", desc: "Plan topics, angles, tools, and repurposing notes.", cta: "Send it to me →", file: "/resources/ai-content-planning-worksheet.html", group: "190662786364213155" },
      { icon: "☑", iconKey: "clipboard", tag: "POPULAR WORKFLOW", title: "Automation audit checklist", desc: "Find the repetitive tasks worth automating first.", cta: "Send it to me →", file: "/resources/automation-audit-checklist.html", group: "190662798984873767" },
      { icon: "❯", iconKey: "command", tag: "CREATOR NOTE", title: "Prompt pack for solopreneurs", desc: "Reusable prompts for planning, writing, and review.", cta: "Send it to me →", file: "/resources/prompt-pack-for-solopreneurs.html", group: "190662813994190116" },
      { icon: "▶", iconKey: "play", tag: "FROM TUTORIALS", title: "Video workflow templates", desc: "Simple systems pulled from Keys to AI walkthroughs.", cta: "Send it to me →", file: "/resources/video-workflow-templates.html", group: "190662835536135214" },
      { icon: "🧰", iconKey: "calculator", tag: "INTERACTIVE TOOLKIT", title: "Solopreneur Business Toolkit", desc: "Rate calculator, project scorer, and 50-state tax estimator — all in one.", cta: "Send it to me →", file: "/resources/solopreneur-toolkit.html", group: "190662772599555144" },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    items: [
      { q: "Who are these workflows for?", a: "These workflows are built for solopreneurs, creators, and one-person business owners who want to use AI to save hours every week. You don't need to be technical — every tutorial is designed to be followed step by step." },
      { q: "Do I need to know how to code?", a: "Not at all. The tools I teach — Claude, Notion, Canva, Make.com, Airtable — are all no-code. If you can follow a recipe, you can follow these workflows." },
      { q: "Are the resources really free?", a: "Yes, 100%. The worksheets, prompt packs, and checklists are all free downloads. I create them as companions to my YouTube tutorials so you can turn what you watch into what you actually do." },
      { q: "What makes Keys to AI different from other AI tutorials?", a: "I only teach systems I actually use in my own business. If a workflow can't survive a busy week, it doesn't make the cut. Simple enough to repeat, useful enough to save real hours." },
      { q: "How often do you publish new tutorials?", a: "I publish new tutorials weekly on YouTube, and the newsletter goes out every Monday with the single AI workflow worth your time that week." },
      { q: "Can I suggest a topic or tool?", a: "Absolutely. The best tutorials come from real questions. Reply to any newsletter email or drop a comment on YouTube — I read every single one." },
    ],
  },

  newsletter: {
    eyebrow: "NEWSLETTER",
    title: "One email. One workflow. Actually useful.",
    desc: "Simone's weekly pick: the one AI workflow worth your time this week — straight from my own stack.",
    button: "Send me the weekly workflow",
    note: "No spam. Unsubscribe anytime.",
    placeholder: "you@example.com",
    // MailerLite "Newsletter" group — routes signups so the welcome automation fires.
    // NOTE: this is the GROUP id, not the automation id. (Automation id is 191214763962795807.)
    group: "191213484469388463",
  },

  footer: {
    brand: "Keys to AI",
    tagline: "AI Workflows Made Simple",
    blurb: "The official content hub for the Keys to AI YouTube channel.",
    copyright: "© 2025 Keys to AI. All rights reserved.",
    links: [
      { label: "YouTube", href: YT_CHANNEL },
      { label: "Tutorials", href: "/tutorials" },
      { label: "AI Tools", href: "/ai-tools" },
      { label: "About", href: "/about" },
      { label: "Resources", href: "/#resources" },
    ],
    miniNewsletter: { eyebrow: "Get one AI workflow every week", title: "Join the newsletter", button: "Subscribe" },
  },


  // ── Page: /about ──
  aboutPage: {
    metaTitle: "About Keys to AI — Who We Are & How It Works | Keys to AI",
    metaDescription:
      "Keys to AI teaches solopreneurs practical, no-code AI workflows. Meet Simone Keys — our AI-generated host, built with the exact tools we teach — and see how every tutorial gets made.",
    eyebrow: "ABOUT KEYS TO AI",
    title: "Hey — welcome to Keys to AI.",
    intro:
      "We teach solopreneurs how to use AI to run and grow a one-person business. Real workflows, no code, no fluff — simple enough to repeat, useful enough to save real hours.",
    image: "/images/creator-portrait.jpg",
    sections: [
      {
        h2: "What Keys to AI is",
        paragraphs: [
          "Keys to AI is the companion site to the Keys to AI YouTube channel. Every week we publish a step-by-step tutorial that takes one AI workflow — planning content with Claude, building an avatar in HeyGen, automating admin with Make.com — and breaks it down so you can follow it like a recipe.",
          "Here's the thing: most AI content is either hype or theory. We only publish systems we actually run in our own business. If a workflow can't survive a busy week, it doesn't make the cut.",
        ],
      },
      {
        h2: "Meet Simone Keys — and yes, she's AI",
        paragraphs: [
          "Simone Keys, the host you see in every video, is an AI-generated avatar. Her face is built with HeyGen. Her voice is built with ElevenLabs. Her scripts are drafted with Claude — using the exact same workflows we teach on the channel.",
          "That's not a gimmick; it's the proof. Keys to AI is a real, independent one-person business, and Simone is what happens when a solopreneur actually uses the AI stack we recommend. Every tutorial you watch was made with the tools it teaches. You feel me?",
        ],
      },
      {
        h2: "Who this is for",
        paragraphs: [
          "Solopreneurs, creators, and one-person business owners — beginner to intermediate with AI — who are time-starved and tired of tool overwhelm. You don't need a tech background. If you can follow a recipe, you can follow these workflows.",
        ],
      },
      {
        h2: "How to get the most out of this site",
        paragraphs: [
          "Start with the Claude Desktop setup tutorial — it's the foundation every other workflow builds on. Then grab the free worksheets and prompt packs, browse the AI tools library for honest reviews with real pricing, and join the Monday newsletter: one email, one workflow worth your time.",
        ],
      },
    ],
    callout: {
      label: "Our transparency promise",
      text: "We will always tell you what's AI-made and what isn't. Simone is AI-generated and we say so everywhere. Tool recommendations are based on what we actually use — when a link earns us a commission, we'll disclose it.",
    },
    cta: {
      text: "Want to see how a one-person business runs on AI? Start with the tutorials.",
      label: "Watch the tutorials →",
      href: "/tutorials",
    },
  },

  // ── Page: /ai-tools ──
  aiToolsPage: {
    eyebrow: "AI TOOLS LIBRARY",
    title: "The tools I actually use.",
    intro: "A curated stack of AI tools I am actively testing and building with. No affiliate fluff — just what works.",
    filters: ["All", "RESEARCH & WRITING", "DEEP WORK", "VIDEO PRODUCTION", "AUDIO PRODUCTION", "WORKFLOW AUTOMATION", "CREATOR FAVORITE"],
    tools,
  },

  // ── Page: /tutorials ──
  tutorialsPage: {
    eyebrow: "FROM THE CHANNEL",
    title: "Tutorials",
    intro: "Practical AI workflows for solopreneurs. Watch, learn, and build systems that save real hours.",
    featuredLabel: "FEATURED",
    featured: [
      { badge: "CLAUDE", title: "Stop Re-Explaining Yourself to Claude", blurb: "Desktop setup tutorial for solopreneurs who want a reusable working context.", href: "https://www.youtube.com/watch?v=6tZTOkPWZ7o" },
      { badge: "CLAUDE", title: "Claude Desktop: The Setup That Actually Works", blurb: "A deeper dive into configuring Claude for consistent, high-quality output every time.", href: "https://www.youtube.com/watch?v=d95byYDBF4U" },
    ],
    filters: ["All", "Claude", "AI Tools", "Avatar"],
    items: [
      { badge: "CLAUDE", title: "Stop Re-Explaining Yourself to Claude", blurb: "Desktop setup tutorial for solopreneurs who want a reusable working context.", href: "https://www.youtube.com/watch?v=6tZTOkPWZ7o", cta: "Watch on YouTube →" },
      { badge: "CLAUDE", title: "Claude Desktop: The Setup That Actually Works", blurb: "A deeper dive into configuring Claude for consistent, high-quality output every time.", href: "https://www.youtube.com/watch?v=d95byYDBF4U", cta: "Watch on YouTube →" },
      { badge: "AI TOOLS", title: "The Only 8 AI Tools You Need", blurb: "A guide to the core tools in a practical solopreneur AI workflow.", href: "https://www.youtube.com/watch?v=VquszjmTFrU", cta: "Watch on YouTube →" },
      { badge: "AVATAR", title: "Bring Your AI Avatar to Life with HeyGen", blurb: "Step-by-step HeyGen tutorial for building your AI avatar workflow.", href: "https://www.youtube.com/watch?v=R0EmUT4EX2g", cta: "Watch on YouTube →" },
    ],
  },

  // ── Page: /blog (listing + article detail pages) ──
  blog: {
    eyebrow: "BLOG",
    title: "Every tutorial, written down.",
    intro: "Every video becomes a blog post. Read the summary, watch the full tutorial, download the resources.",
    posts: [
      {
        slug: "claude-desktop-setup",
        category: "CLAUDE",
        readTime: "6 min read",
        date: "2025-06-01",
        title: "Stop Re-Explaining Yourself to Claude: The Desktop Setup That Actually Works",
        summary: "How to configure Claude Desktop so you never have to re-explain your context again. A step-by-step setup for solopreneurs who want consistent, high-quality AI output.",
        href: "/blog/claude-desktop-setup",
        cta: "Read post →",
        image: "/images/tutorial-claude.jpg",
        videoId: "6tZTOkPWZ7o",
        author: "Simone Keys",
        dateModified: "2026-06-24",
        faq: [
          { q: "What is a Claude Project?", a: "A Project is a workspace inside Claude where you save a system prompt, reference files, and all related conversations. Everything inside the project shares that context, so Claude remembers who you are and how you work without re-explaining." },
          { q: "Do I need a paid Claude plan to use Projects?", a: "Projects are available on claude.ai including the free tier, but paid plans give you more usage and larger file uploads. The setup in this guide works the same on any plan." },
          { q: "How many projects should a solopreneur create?", a: "Start with two or three: one for content, one for research, and one for client or admin work. Each gets its own system prompt tuned to that task — that separation is what keeps the output consistent." },
        ],
        postCta: { text: "Download the AI Content Planning Worksheet to use alongside this setup.", label: "Get the worksheet →", href: "/#resources" },
        body: [
          { type: "p", text: "If you use Claude for work, you have felt this pain: you open a new chat, and you are right back at square one. Re-explaining your project, your voice, your constraints. Every. Single. Time." },
          { type: "p", text: "Claude Desktop with Projects fixes this. It is the single biggest time-saver in my entire AI stack. Here is exactly how I set it up." },
          { type: "h2", text: "The Problem: Context Amnesia" },
          { type: "p", text: "Most people use Claude like a search engine — one-off questions, one-off answers. That works for quick lookups, but it is terrible for deep work. When you are writing a script, planning content, or analyzing data, you need Claude to remember who you are, what you are building, and how you like to work." },
          { type: "callout", label: "Key Takeaway", text: "Claude Projects let you save system prompts, project context, and reference files. Claude remembers everything within that project — forever." },
          { type: "h2", text: "Step 1: Create a Project" },
          { type: "p", text: "Open Claude Desktop and click \"New Project\" in the sidebar. Name it something clear — I use project names like \"Keys to AI — Content\" or \"Keys to AI — Research\"." },
          { type: "p", text: "The project becomes your workspace. Every conversation inside this project shares the same context, same system prompt, and same reference files." },
          { type: "h2", text: "Step 2: Write Your System Prompt" },
          { type: "p", text: "The system prompt is where the magic happens. This is where you tell Claude who you are, what you do, and how you want things formatted. Be specific. The more detail, the better the output." },
          { type: "ul", items: [
            "Your name and role (e.g., \"I am Simone Keys, a solopreneur who teaches AI workflows\")",
            "Your audience (e.g., \"My audience is solopreneurs who are new to AI\")",
            "Your voice and tone (e.g., \"Warm, confident, straight-talking. No fluff.\")",
            "Output format preferences (e.g., \"Use bullet points for key points, include examples\")",
            "Constraints (e.g., \"Keep responses under 500 words unless I ask for more\")",
          ]},
          { type: "h2", text: "Step 3: Add Reference Files" },
          { type: "p", text: "This is the feature most people skip — and it is the most powerful. Upload documents that Claude should reference: brand guidelines, past scripts, research notes, audience profiles. Claude can read these and incorporate them into every response." },
          { type: "p", text: "I upload my content calendar, my best-performing scripts, and a document describing my ideal viewer. When I ask Claude to help with a new video, it already knows my format, my audience, and my voice." },
          { type: "h2", text: "Step 4: Test and Refine" },
          { type: "p", text: "Start a conversation in your project and test it. Ask for something specific and see how close it gets to your ideal output. If it is off, refine your system prompt. This is an iterative process — expect to tweak it 3-5 times before it feels right." },
          { type: "callout", label: "Pro Tip", text: "Create separate projects for different types of work. I have one for content planning, one for script writing, and one for research. Each has its own system prompt tuned for that specific task." },
          { type: "h2", text: "The Result" },
          { type: "p", text: "With this setup, I open Claude, pick the right project, and start working immediately. No re-explaining. No re-contextualizing. Just consistent, high-quality output that sounds like me." },
          { type: "video" },
        ] as ArticleBlock[],
      },
      {
        slug: "8-ai-tools-solopreneur",
        category: "AI TOOLS",
        readTime: "8 min read",
        date: "2025-05-25",
        title: "The Only 8 AI Tools You Need as a Solopreneur",
        summary: "A curated stack of AI tools that actually matter for a one-person business. No fluff, no affiliate spam — just what works.",
        href: "/blog/8-ai-tools-solopreneur",
        cta: "Read post →",
        image: "/images/tutorial-tools.jpg",
        videoId: "VquszjmTFrU",
        author: "Simone Keys",
        dateModified: "2026-06-24",
        faq: [
          { q: "How much does this 8-tool stack cost per month?", a: "Just over $100/month at full list prices — but almost every tool here has a free tier. Start free, then upgrade only the one or two tools that are clearly saving you the most hours." },
          { q: "Which AI tool should a solopreneur start with?", a: "Claude. It covers the widest range of daily work — writing, research, planning, analysis — and the Projects feature means the time you invest in setup pays off in every future session." },
          { q: "Do I really need all eight tools?", a: "No. Start with Claude plus Notion and add tools only when a specific task keeps eating your time. The rule: don't add a new tool until an existing one is clearly failing." },
        ],
        postCta: { text: "See detailed reviews of each tool in the AI Tools Library.", label: "Browse AI Tools →", href: "/ai-tools" },
        body: [
          { type: "p", text: "The AI tool market is overwhelming. Every week there is a new \"game-changer\" that promises to 10x your productivity. Most of them are noise." },
          { type: "p", text: "After testing dozens of tools, here is the stack I actually use every day. Eight tools. That is it. Each one earns its place by saving me real hours." },
          { type: "h2", text: "1. Claude (The Brain)" },
          { type: "p", text: "Claude is my thinking partner. I use it for research, writing, analysis, and brainstorming. The Projects feature is what makes it indispensable — I have separate projects for content, research, and client work." },
          { type: "callout", label: "Why it matters", text: "Claude has the largest context window and best instruction-following of any AI I have tested. When you give it a good system prompt, it consistently produces output that sounds like you." },
          { type: "h2", text: "2. Kimi K2.6 (The Researcher)" },
          { type: "p", text: "I am actively testing Kimi K2.6 for long-form research and writing. Its context memory is exceptional — it remembers details from 20+ messages back, which matters when you are building a 2000-word piece." },
          { type: "h2", text: "3. HeyGen (The Avatar)" },
          { type: "p", text: "For avatar-based videos, HeyGen is the best I have found. The lip-sync is genuinely impressive, and the avatars look natural — not uncanny. I use it for explainer content where being on camera is not the priority." },
          { type: "h2", text: "4. ElevenLabs (The Voice)" },
          { type: "p", text: "I cloned my own voice and use it for voiceovers when I do not want to record manually. The quality is good enough that most viewers do not notice the difference." },
          { type: "h2", text: "5. Make.com (The Automation)" },
          { type: "p", text: "Make.com runs my content pipeline: new video idea → Notion entry → draft created → thumbnail request sent. I switched from Zapier because the visual builder makes complex workflows easier to understand." },
          { type: "h2", text: "6. Notion (The Home Base)" },
          { type: "p", text: "Every creator needs a calm home base. Notion is mine. Video ideas, script drafts, resource links, and publishing schedules — all in one place. The built-in AI features are getting surprisingly good too." },
          { type: "h2", text: "7. Canva (The Visuals)" },
          { type: "p", text: "Thumbnails, social posts, lead magnets — Canva handles it all. I design once, then reuse the same visual language across everything." },
          { type: "h2", text: "8. Airtable (The Tracker)" },
          { type: "p", text: "I track what is filmed, edited, published, and ready to repurpose. A structured view keeps me honest about my content pipeline." },
          { type: "callout", label: "The Rule", text: "Do not add a new tool until an existing one is clearly failing. The goal is a small, reliable stack — not a collection of subscriptions." },
          { type: "video" },
        ] as ArticleBlock[],
      },
      {
        slug: "heygen-ai-avatar",
        category: "VIDEO PRODUCTION",
        readTime: "5 min read",
        date: "2025-05-18",
        title: "Bring Your AI Avatar to Life with HeyGen",
        summary: "A step-by-step guide to creating a realistic AI avatar for your content. From photo to speaking video in under 10 minutes.",
        href: "/blog/heygen-ai-avatar",
        cta: "Read post →",
        image: "/images/tutorial-avatar.jpg",
        videoId: "R0EmUT4EX2g",
        author: "Simone Keys",
        dateModified: "2026-06-24",
        faq: [
          { q: "How much does HeyGen cost?", a: "HeyGen has a free plan for testing, and paid plans start at $24/month. If you publish avatar videos regularly, the paid tier is what unlocks the length and quality you need." },
          { q: "Can I use my own voice with a HeyGen avatar?", a: "Yes — two ways. Record your voice directly in HeyGen, or clone your voice in ElevenLabs, export the audio as an MP3, and upload it. The ElevenLabs route gives noticeably better voice quality." },
          { q: "How long does it take to create an avatar video?", a: "Under 10 minutes end to end once your avatar is set up: paste your script, generate, and download. Processing itself takes about 2–5 minutes depending on video length." },
        ],
        postCta: { text: "Want the full prompt pack for writing avatar scripts?", label: "Get the Prompt Pack →", href: "/#resources" },
        body: [
          { type: "p", text: "Faceless channels are booming, but most AI avatar tools look robotic and cheap. HeyGen is different. The avatars look natural, the lip-sync is precise, and the whole process takes under 10 minutes." },
          { type: "p", text: "Here is exactly how I build my AI avatars for Keys to AI content." },
          { type: "h2", text: "Step 1: Choose Your Photo" },
          { type: "p", text: "Start with a clear, well-lit headshot. Face the camera directly, neutral background, good lighting. The quality of your source photo directly affects the quality of your avatar." },
          { type: "ul", items: [
            "Face the camera straight on",
            "Use a plain or neutral background",
            "Ensure even lighting (no harsh shadows)",
            "High resolution (at least 512x512)",
            "Neutral expression works best",
          ]},
          { type: "h2", text: "Step 2: Upload to HeyGen" },
          { type: "p", text: "In HeyGen, go to \"Avatars\" → \"Upload Photo\". Upload your headshot and wait for the processing — it takes about 1-2 minutes. HeyGen generates a 3D model from your 2D photo." },
          { type: "h2", text: "Step 3: Add Your Voice" },
          { type: "p", text: "You have two options: record your voice directly in HeyGen, or use a voice clone from ElevenLabs. I use ElevenLabs because the quality is better and I can use the same voice across multiple tools." },
          { type: "callout", label: "Pro Tip", text: "If you use ElevenLabs, export your voice clone as an MP3 and upload it to HeyGen. This gives you the best of both worlds: ElevenLabs voice quality + HeyGen avatar visuals." },
          { type: "h2", text: "Step 4: Write Your Script" },
          { type: "p", text: "Write your script in the HeyGen editor. Keep sentences relatively short — the lip-sync works best with natural pauses. Read it out loud to check the rhythm before generating." },
          { type: "h2", text: "Step 5: Generate and Download" },
          { type: "p", text: "Hit generate and wait. Processing takes 2-5 minutes depending on video length. Download the MP4 and drop it into your editor — I use Canva for quick edits and captions." },
          { type: "h2", text: "Best Practices" },
          { type: "ul", items: [
            "Keep videos under 3 minutes for best lip-sync quality",
            "Use hand gestures sparingly — HeyGen handles them okay but not perfectly",
            "Add captions in post-production — HeyGen captions are basic",
            "Test with a 10-second clip before committing to a full video",
          ]},
          { type: "video" },
        ] as ArticleBlock[],
      },
    ],
    newsletterCta: { text: "New posts drop weekly. Subscribe to get them in your inbox.", label: "Join the newsletter →", href: "/#newsletter" },
  },
};

export type Site = typeof site;

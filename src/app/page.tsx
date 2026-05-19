import { youtubeVideos } from "@/data/youtubeVideos";

const aiTools = [
  {
    title: "Claude research workspace",
    label: "Used in latest tutorial",
    role: "Thinking partner",
    stack: "Claude Desktop + saved project context",
    note: "The working setup Simone uses to stop re-explaining context before every deep work session."
  },
  {
    title: "ChatGPT prompt library",
    label: "Creator favorite",
    role: "Content planning",
    stack: "Reusable prompts + weekly planning rhythm",
    note: "A practical prompt system for turning ideas into outlines, captions, emails, and next steps."
  },
  {
    title: "Notion creator OS",
    label: "Recommended stack",
    role: "Creator hub",
    stack: "Ideas, scripts, resources, and publishing status",
    note: "The calm home base for keeping tutorials, client notes, content plans, and AI workflows organized."
  },
  {
    title: "Canva repurposing system",
    label: "Used weekly",
    role: "Visual production",
    stack: "Templates + brand assets + short-form layouts",
    note: "Design once, then reuse the same visual language across thumbnails, posts, and lead magnets."
  },
  {
    title: "Zapier automation starter",
    label: "Recently updated",
    role: "Simple automation",
    stack: "Forms, folders, email, and content handoffs",
    note: "Lightweight recipes for removing repetitive admin without building a complicated tech stack."
  },
  {
    title: "Airtable content tracker",
    label: "Most downloaded",
    role: "Operations",
    stack: "Assets, workflow status, and publish momentum",
    note: "A structured view for tracking what is filmed, edited, published, and ready to repurpose."
  }
];

const workflows = [
  {
    step: "01",
    title: "Capture the idea",
    copy: "Turn video notes, client questions, or trend research into a clear starting point.",
    reference: "Used in: Claude desktop setup"
  },
  {
    step: "02",
    title: "Build the workflow",
    copy: "Choose the right AI tool, prompt structure, and automation path for the job.",
    reference: "Tool pair: Claude + Notion"
  },
  {
    step: "03",
    title: "Ship and reuse",
    copy: "Create templates, checklists, and repeatable systems you can return to every week.",
    reference: "Resource: automation audit"
  }
];

const resources = [
  {
    title: "AI content planning worksheet",
    label: "Updated this week",
    note: "Plan topics, angles, tools, and repurposing notes."
  },
  {
    title: "Automation audit checklist",
    label: "Popular workflow",
    note: "Find the repetitive tasks worth automating first."
  },
  {
    title: "Prompt pack for solopreneurs",
    label: "Creator note",
    note: "Reusable prompts for planning, writing, and review."
  },
  {
    title: "Video workflow templates",
    label: "From tutorials",
    note: "Simple systems pulled from Keys to AI walkthroughs."
  }
];

function videoHref(url: string) {
  return url || undefined;
}

function thumbnailBackground(path: string) {
  return {
    backgroundImage: `url(${path})`
  };
}

export default function HomePage() {
  const featuredVideo = youtubeVideos[0];
  const recentVideos = youtubeVideos.slice(1);

  return (
    <main>
      <header className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Keys to AI home">
          <span className="brand-mark">K</span>
          <span>
            <strong>Keys to AI</strong>
            <small>YouTube companion hub</small>
          </span>
        </a>
        <nav>
          <a href="#top">Home</a>
          <a href="#tutorials">Tutorials</a>
          <a href="#tools">AI Tools</a>
          <a href="#workflows">Workflows</a>
          <a href="#resources">Resources</a>
          <a href="#newsletter">Newsletter</a>
          <a href="#youtube">YouTube</a>
        </nav>
        <a className="nav-cta" href="#youtube">
          Watch
        </a>
      </header>

      <section className="hero-section" id="top">
        <img
          className="hero-image"
          src="/simone-keys-hero.png"
          alt="Simone Keys in a cinematic workspace holding a mug beside a laptop and notebook"
        />
        <div className="hero-copy">
          <p className="hero-channel">Official companion site for the Keys to AI YouTube channel</p>
          <h1>AI Automation Made Simple</h1>
          <p>
            Practical tutorials, tools, and workflows to help solopreneurs save
            time, create smarter, and build with AI.
          </p>
          <div className="hero-actions" aria-label="Hero calls to action">
            <a className="button primary" href="#youtube">
              Watch Latest Video
            </a>
            <a className="button secondary" href="#tools">
              Explore AI Tools
            </a>
          </div>
        </div>

        <div className="hero-image-shade" aria-hidden="true" />
      </section>

      <section className="video-section" id="youtube">
        <div className="section-heading youtube-heading">
          <div>
            <p className="section-kicker">Latest from YouTube</p>
            <h2>Fresh tutorials, practical workflows, and tools worth testing.</h2>
          </div>
          <a href="#newsletter">Get upload notes</a>
        </div>

        <div className="video-card">
          <a
            className="video-frame"
            href={videoHref(featuredVideo.youtubeUrl)}
            aria-label={`Watch ${featuredVideo.title}`}
            style={thumbnailBackground(featuredVideo.thumbnailPath)}
          >
            <span className="play-button" aria-hidden="true" />
          </a>
          <div className="video-copy">
            <p className="video-content-meta">
              {[featuredVideo.categoryTag, featuredVideo.duration || "Watch tutorial"]
                .filter(Boolean)
                .join(" • ")}
            </p>
            <h2>{featuredVideo.title}</h2>
            <p>
              {featuredVideo.description}
            </p>
            <div className="video-actions">
              {featuredVideo.youtubeUrl ? (
                <a className="video-text-link" href={featuredVideo.youtubeUrl}>
                  Watch on YouTube →
                </a>
              ) : (
                <span className="video-text-link muted">Watch tutorial</span>
              )}
            </div>
            <div className="recent-stack" aria-label="Recent YouTube uploads">
              <div className="creator-note">
                <strong>Creator note</strong>
                <span>New guides are organized around real setup questions from solopreneurs.</span>
              </div>
              {recentVideos.map((video) => (
                <a
                  className="recent-upload"
                  href={videoHref(video.youtubeUrl)}
                  key={video.title}
                >
                  <span
                    className="mini-thumb"
                    aria-hidden="true"
                    style={thumbnailBackground(video.thumbnailPath)}
                  >
                    <span className="mini-play" />
                  </span>
                  <span>
                    <small>{[video.categoryTag, video.duration || "Watch tutorial"].join(" • ")}</small>
                    <strong>{video.title}</strong>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell" id="tutorials">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Featured YouTube tutorials</p>
            <h2>Start with practical lessons viewers are watching now.</h2>
          </div>
          <a href="#youtube">Watch latest uploads</a>
        </div>
        <div className="tutorial-grid">
          {youtubeVideos.map((video, index) => (
            <article
              className={[
                "tutorial-card",
                index === 0 ? "tutorial-card-featured" : "",
                index > 0 && index < 3 ? "tutorial-card-secondary" : "",
                index > 2 ? "tutorial-card-tertiary" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              key={video.title}
            >
              <div
                className="tutorial-thumb"
                aria-hidden="true"
                style={thumbnailBackground(video.thumbnailPath)}
              >
                <span className="play-button small" />
              </div>
              <div className="tutorial-meta-row">
                <p>{[video.categoryTag, video.duration || "Watch tutorial"].join(" • ")}</p>
              </div>
              <h3>{video.title}</h3>
              <span>{video.description}</span>
              {video.publishLabel ? <small>{video.publishLabel}</small> : null}
              {video.youtubeUrl ? (
                <a className="tutorial-card-action" href={video.youtubeUrl}>
                  Watch on YouTube →
                </a>
              ) : (
                <span className="tutorial-card-action muted">Watch tutorial</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="creator-presence" aria-label="A note from Simone Keys">
        <div className="creator-portrait">
          <img
            src="/simone-warm-authority.png"
            alt="Simone Keys seated in a warm workspace beside a laptop"
          />
        </div>
        <div className="creator-perspective">
          <p className="section-kicker">From Simone</p>
          <blockquote>
            I teach the AI systems I would actually trust in a solo business:
            simple enough to repeat, useful enough to save real hours.
          </blockquote>
          <div className="creator-signoff">
            <span>Simone Keys</span>
            <small>Creator, Keys to AI</small>
          </div>
        </div>
      </section>

      <section className="tools-library" id="tools">
        <div className="section-heading">
          <div>
            <p className="section-kicker">AI tools library</p>
            <h2>Practical guides for the tools creators already use.</h2>
          </div>
          <a href="#newsletter">Get tool updates</a>
        </div>
        <div className="toolkit-intro">
          <p>Inside Simone's creator operating system</p>
          <span>
            A curated stack of tools, prompts, and repeatable systems featured
            across Keys to AI tutorials.
          </span>
          <small>What I actually use when a workflow needs to survive a busy week.</small>
        </div>
        <div className="tool-list">
          {aiTools.map((tool, index) => (
            <a
              className={index === 0 ? "tool-card-featured" : ""}
              href="#newsletter"
              key={tool.title}
            >
              <span>
                <small>{tool.label}</small>
                <strong>{tool.title}</strong>
                <i>{tool.role}</i>
                <em>{tool.note}</em>
                <u>{tool.stack}</u>
              </span>
              <b>{index === 0 ? "Core system" : "Guide"}</b>
            </a>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="workflows">
        <div className="workflow-copy">
          <p className="section-kicker">Step-by-step workflow guides</p>
          <h2>Turn every tutorial into a repeatable system.</h2>
          <p>
            Keys to AI is built for follow-through: watch the video, use the
            guide, download the resource, and come back when you are ready for
            the next workflow.
          </p>
          <div className="simone-aside">
            <span>Simone's workflow rule</span>
            <p>If a setup cannot be reused next week, it is not finished yet.</p>
          </div>
        </div>
        <div className="workflow-panel">
          {workflows.map((workflow) => (
            <article className="workflow-row" key={workflow.title}>
              <span>{workflow.step}</span>
              <div>
                <h3>{workflow.title}</h3>
                <p>{workflow.copy}</p>
                <small>{workflow.reference}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resources-section" id="resources">
        <div>
          <p className="section-kicker">Free resources from videos</p>
          <h2>Download the worksheets, prompt packs, and checklists mentioned on YouTube.</h2>
          <div className="section-note">
            <span>Curated companion materials</span>
            <p>Built to help viewers turn a tutorial into a practical next step.</p>
            <small>This is where I keep the checklists I wish I had before testing a workflow on camera.</small>
          </div>
        </div>
        <div className="resource-grid">
          {resources.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <span aria-hidden="true" />
              <small>{resource.label}</small>
              <h3>{resource.title}</h3>
              <p>{resource.note}</p>
              <a href="#newsletter">Send it to me</a>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-section" id="newsletter">
        <div>
          <p className="section-kicker">Newsletter</p>
          <h2>Get the latest videos, tools, and AI workflows in one useful email.</h2>
          <div className="newsletter-note">
            <span>My weekly filter</span>
            <p>One practical idea, one tool worth testing, and one workflow you can actually use.</p>
          </div>
        </div>
        <form className="newsletter-form">
          <label htmlFor="email">Email address</label>
          <div>
            <input id="email" type="email" placeholder="you@example.com" />
            <button type="submit">Subscribe</button>
          </div>
        </form>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Keys to AI home">
          <span className="brand-mark">K</span>
          <span>
            <strong>Keys to AI</strong>
            <small>AI Automation Made Simple</small>
          </span>
        </a>
        <p>The official content hub for the Keys to AI YouTube channel.</p>
        <nav aria-label="Footer navigation">
          <a href="#youtube">YouTube</a>
          <a href="#tutorials">Tutorials</a>
          <a href="#tools">AI Tools</a>
          <a href="#resources">Resources</a>
        </nav>
      </footer>
    </main>
  );
}

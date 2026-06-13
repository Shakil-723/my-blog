const posts = [
  {
    id: "design-systems-that-scale",
    title: "Design Systems That Actually Scale",
    excerpt: "Most design systems fail not because of bad components, but because teams never agree on what \"done\" looks like. Here's a practical framework.",
    tag: "Design",
    date: "May 28, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/800/400?random=1",
    lead: "A design system is only as strong as the habits around it. Components are the easy part — alignment is the work.",
    body: `
      <p>Every team starts a design system with enthusiasm. Figma libraries get built, tokens are defined, and someone writes a glowing README. Six months later, the system is a graveyard of half-finished components and three competing button styles.</p>
      <h2>Start with decisions, not deliverables</h2>
      <p>Before you ship a single component, document the decisions that matter: spacing scale, type hierarchy, color semantics, and interaction patterns. These constraints reduce debate later and give designers and engineers a shared vocabulary.</p>
      <h2>Ship in slices, not suites</h2>
      <p>Don't wait for a complete library. Identify the highest-traffic UI patterns in your product — forms, navigation, cards — and nail those first. Each slice should be production-ready, documented, and adopted by at least one team before moving on.</p>
      <h2>Measure adoption, not output</h2>
      <p>Track how many screens use system components versus one-offs. Run quarterly audits. Celebrate teams that contribute back. A design system that nobody uses is just an expensive side project.</p>
    `
  },
  {
    id: "javascript-without-frameworks",
    title: "The Case for JavaScript Without Frameworks",
    excerpt: "Not every project needs React. Sometimes the best tool is the platform itself — and the results can be surprisingly delightful.",
    tag: "Development",
    date: "May 14, 2026",
    readTime: "5 min read",
    image: "https://picsum.photos/800/400?random=2",
    lead: "Frameworks solve real problems, but they also introduce complexity you may not need. Vanilla JS has come a long way.",
    body: `
      <p>Modern browsers ship with APIs that didn't exist a decade ago: fetch, IntersectionObserver, CSS custom properties, and native modules. For content-heavy sites, marketing pages, and small interactive tools, these primitives are often enough.</p>
      <h2>Less abstraction, more clarity</h2>
      <p>When you write plain JavaScript, you see exactly what runs in the browser. There's no virtual DOM reconciliation to debug, no build step to configure, and no dependency tree to audit every week.</p>
      <h2>Performance by default</h2>
      <p>A few kilobytes of hand-written JS loads instantly. No hydration, no code-splitting puzzles, no framework runtime tax. For blogs, portfolios, and documentation sites, that difference is tangible on slow connections.</p>
      <h2>Know when to reach for more</h2>
      <p>Complex state management, real-time collaboration, and large component trees still benefit from frameworks. The skill is knowing which side of that line your project falls on — and being honest about it upfront.</p>
    `
  },
  {
    id: "morning-pages-for-makers",
    title: "Morning Pages for Makers",
    excerpt: "A daily writing habit borrowed from Julia Cameron, adapted for people who build things with their hands and keyboards.",
    tag: "Creativity",
    date: "April 30, 2026",
    readTime: "4 min read",
    image: "https://picsum.photos/800/400?random=3",
    lead: "Three pages of stream-of-consciousness writing every morning sounds indulgent. It might be the most productive thing you do all day.",
    body: `
      <p>Julia Cameron introduced "morning pages" in <em>The Artist's Way</em> — three longhand pages written immediately after waking, with no goal other than filling the paper. Makers have adapted the practice for digital notebooks and quiet corners before the workday begins.</p>
      <h2>Clear the mental cache</h2>
      <p>Your brain accumulates open loops overnight: unresolved emails, half-formed ideas, anxieties about deadlines. Morning pages give those thoughts a place to land so they stop competing for attention during deep work.</p>
      <h2>Separate drafting from editing</h2>
      <p>The rule is simple: don't stop, don't reread, don't share. This trains you to produce without judging — a skill that transfers directly to prototyping, writing code, and sketching interfaces.</p>
      <h2>Start smaller than you think</h2>
      <p>Three pages is the goal, not the requirement. Begin with ten minutes. Use a text file, a notebook, whatever feels frictionless. Consistency matters more than volume, and the habit compounds quietly over weeks.</p>
    `
  }
];

function initTheme() {
  const saved = localStorage.getItem("inkwell-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("inkwell-theme", next);
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function renderPostCards() {
  const grid = document.getElementById("post-grid");
  if (!grid) return;

  grid.innerHTML = posts
    .map(
      (post) => `
    <a href="post.html?id=${post.id}" class="post-card">
      <img class="post-card-image" src="${post.image}" alt="" loading="lazy">
      <div class="post-card-body">
        <div class="post-card-meta">
          <span class="post-card-tag">${post.tag}</span>
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p class="post-card-excerpt">${post.excerpt}</p>
        <span class="post-card-link">Read article →</span>
      </div>
    </a>
  `
    )
    .join("");
}

function renderPostPage() {
  const container = document.getElementById("post-content");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts.find((p) => p.id === id);

  if (!post) {
    document.title = "Not Found — Inkwell";
    container.innerHTML = `
      <div class="post-not-found">
        <h1>Article not found</h1>
        <p>The post you're looking for doesn't exist or has been moved.</p>
        <a href="index.html" class="btn">← Back to home</a>
      </div>
    `;
    return;
  }

  document.title = `${post.title} — Inkwell`;
  container.innerHTML = `
    <header class="post-header">
      <a href="index.html" class="back-link">← All articles</a>
      <div class="post-card-meta">
        <span class="post-card-tag">${post.tag}</span>
        <span>${post.date}</span>
        <span>${post.readTime}</span>
      </div>
      <h1>${post.title}</h1>
      <p class="post-lead">${post.lead}</p>
    </header>
    <img class="post-cover" src="${post.image}" alt="">
    <div class="post-body">${post.body}</div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  renderPostCards();
  renderPostPage();

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});

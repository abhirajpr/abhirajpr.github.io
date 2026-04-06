// ======================================
// GITHUB PROJECTS
// ======================================

const GITHUB_USER = 'abhirajpr';
const CACHE_KEY = 'github_repos';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const LANG_COLORS = {
  'JavaScript': '#f1e05a',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Swift': '#F05138',
  'Python': '#3572A5',
  'Apex': '#1797c0',
  'Java': '#b07219',
  'C#': '#178600',
  'default': '#8b949e'
};

const FALLBACK_REPOS = [
  {
    name: 'Twitter-Social-Talk-for-an-Organization-using-Dynamics-365',
    description: 'Integrates Twitter social data with Microsoft Dynamics 365 for organizational social listening and engagement.',
    language: 'HTML',
    stargazers_count: 1,
    html_url: 'https://github.com/abhirajpr/Twitter-Social-Talk-for-an-Organization-using-Dynamics-365'
  },
  {
    name: 'LeadForm',
    description: 'A dynamic lead capture form application for collecting and managing prospect information.',
    language: 'HTML',
    stargazers_count: 0,
    html_url: 'https://github.com/abhirajpr/LeadForm'
  },
  {
    name: 'My-IOS-Salesforce-App',
    description: 'Salesforce Mobile SDK implementation for iOS — a native Swift app for Salesforce data access.',
    language: 'Swift',
    stargazers_count: 0,
    html_url: 'https://github.com/abhirajpr/My-IOS-Salesforce-App'
  },
  {
    name: 'open-cti-demo-adapter',
    description: 'Demo adapter for Salesforce Open CTI — enabling computer-telephony integration within Salesforce.',
    language: 'JavaScript',
    stargazers_count: 2,
    html_url: 'https://github.com/abhirajpr/open-cti-demo-adapter'
  },
  {
    name: 'RecruitmentManagementSystem',
    description: 'A full-stack recruitment management system for tracking candidates, interviews, and hiring workflows.',
    language: 'C#',
    stargazers_count: 0,
    html_url: 'https://github.com/abhirajpr/RecruitmentManagementSystem'
  },
  {
    name: 'MVC',
    description: 'ASP.NET MVC application with CRUD operations, search, and partial views for managing data records.',
    language: 'C#',
    stargazers_count: 0,
    html_url: 'https://github.com/abhirajpr/MVC'
  }
];

// --- Safe DOM helper ---
function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') node.className = v;
      else if (k === 'textContent') node.textContent = v;
      else if (k.startsWith('style_')) node.style[k.slice(6)] = v;
      else node.setAttribute(k, v);
    });
  }
  if (children) {
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }
  return node;
}

function svgIcon(pathData, w, h, fill, stroke) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', '0 0 24 24');
  if (fill) svg.setAttribute('fill', fill);
  else svg.setAttribute('fill', 'none');
  if (stroke) {
    svg.setAttribute('stroke', stroke);
    svg.setAttribute('stroke-width', '2');
  }
  // Parse simple path/polyline/line/polygon/circle from string
  const tmp = document.createElement('div');
  // Use a template for safe SVG paths (all are hardcoded, not user data)
  const wrapper = document.createElementNS(ns, 'g');
  pathData.forEach(d => {
    const shape = document.createElementNS(ns, d.tag);
    Object.entries(d.attrs).forEach(([k, v]) => shape.setAttribute(k, v));
    wrapper.appendChild(shape);
  });
  svg.appendChild(wrapper);
  return svg;
}

function createFolderIcon() {
  return svgIcon([
    { tag: 'path', attrs: { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' } }
  ], 20, 20, 'none', 'currentColor');
}

function createStarIcon() {
  return svgIcon([
    { tag: 'polygon', attrs: { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' } }
  ], 14, 14, 'currentColor', null);
}

function createArrowIcon() {
  return svgIcon([
    { tag: 'line', attrs: { x1: '7', y1: '17', x2: '17', y2: '7' } },
    { tag: 'polyline', attrs: { points: '7 7 17 7 17 17' } }
  ], 16, 16, 'none', 'currentColor');
}

function createSkeletonLine(widthPct, isFirst) {
  const line = el('div', { className: 'project__skeleton-line' });
  line.style.width = widthPct;
  if (isFirst) line.style.height = '18px';
  return line;
}

function createSkeletons(count) {
  const grid = document.getElementById('projectsGrid');
  for (let i = 0; i < count; i++) {
    const skeleton = el('div', { className: 'project__skeleton' }, [
      createSkeletonLine('60%', true),
      createSkeletonLine('100%', false),
      createSkeletonLine('80%', false),
      createSkeletonLine('40%', false)
    ]);
    skeleton.lastChild.style.marginTop = '20px';
    grid.appendChild(skeleton);
  }
}

function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid');
  grid.textContent = '';

  const filtered = repos
    .filter(r => !r.fork || r.stargazers_count > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const reposToRender = filtered.length > 0 ? filtered : repos.slice(0, 6);

  reposToRender.forEach((repo, i) => {
    const langColor = LANG_COLORS[repo.language] || LANG_COLORS['default'];
    const name = repo.name.replace(/-/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');

    // Build card header
    const headerChildren = [createFolderIcon()];
    if (repo.stargazers_count > 0) {
      const starsSpan = el('span', { className: 'project__card-stars' }, [
        createStarIcon(),
        document.createTextNode(' ' + repo.stargazers_count)
      ]);
      headerChildren.push(starsSpan);
    }
    const header = el('div', { className: 'project__card-header' }, headerChildren);
    header.firstChild.classList.add('project__card-icon');

    // Build footer
    const langSpan = repo.language
      ? el('span', { className: 'project__card-lang' }, [
          el('span', { className: 'project__card-lang-dot', style_background: langColor }),
          document.createTextNode(repo.language)
        ])
      : el('span');

    const arrowSvg = createArrowIcon();
    arrowSvg.classList.add('project__card-arrow');

    const footer = el('div', { className: 'project__card-footer' }, [langSpan, arrowSvg]);

    // Assemble card
    const card = el('a', {
      href: repo.html_url,
      target: '_blank',
      rel: 'noopener',
      className: 'project__card'
    }, [
      header,
      el('h3', { textContent: name }),
      el('p', { textContent: repo.description || 'No description available.' }),
      footer
    ]);

    grid.appendChild(card);

    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add('project__card--visible'), i * 80);
    });
  });
}

async function fetchRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        renderProjects(data);
        return;
      }
    } catch (e) { /* cache corrupted, fetch fresh */ }
  }

  createSkeletons(6);

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );

    if (!response.ok) throw new Error('GitHub API: ' + response.status);

    const repos = await response.json();

    sessionStorage.setItem(CACHE_KEY, JSON.stringify({
      data: repos,
      timestamp: Date.now()
    }));

    renderProjects(repos);
  } catch (error) {
    console.warn('GitHub API unavailable, using fallback data:', error.message);
    renderProjects(FALLBACK_REPOS);
  }
}

fetchRepos();

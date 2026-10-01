import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const googleAnalyticsMeasurementId = "G-0H82M97S0K";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://nurturemap.example${pathname}`, {
      headers: {
        accept: "text/html",
        host: "nurturemap.example",
        "x-forwarded-host": "nurturemap.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function assertGoogleAnalytics(html) {
  const documentHtml = html.slice(0, html.indexOf("</html>") + "</html>".length);

  assert.equal(
    documentHtml.match(
      new RegExp(
        `https://www\\.googletagmanager\\.com/gtag/js\\?id=${googleAnalyticsMeasurementId}`,
        "g",
      ),
    )?.length,
    1,
  );
  assert.equal(
    documentHtml.match(
      new RegExp(
        `gtag\\(['\"]config['\"],\\s*['\"]${googleAnalyticsMeasurementId}['\"]`,
        "g",
      ),
    )?.length,
    1,
  );
  assert.match(documentHtml, /allow_google_signals/);
  assert.match(documentHtml, /allow_ad_personalization_signals/);
}

test("renders the privacy-limited GA4 tag on every public route", async () => {
  for (const pathname of ["/", "/people/yun-wang"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assertGoogleAnalytics(await response.text());
  }
});

test("server-renders the finished Nurture Map site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /Nurture Map Lab \| AI &amp; Quantitative MRI for Maternal–Infant Health/i,
  );
  assert.match(
    html,
    /NIH-funded computational maternal–fetal imaging program at Emory University/i,
  );
  assert.match(
    html,
    /Nurture Map Lab — tracing pathways from maternal health to the developing brain/i,
  );
  assert.match(
    html,
    /Tracing the pathways from maternal health to the developing\s*brain/i,
  );
  assert.match(
    html,
    /We develop AI and quantitative MRI methods to map how maternal health\s*shapes placental function, fetal physiology, brain development, and early\s*neurobehavior/i,
  );
  assert.match(html, /<b>2<\/b>\s*R01s/i);
  assert.match(html, /Where we(?:’|')re going/i);
  assert.match(html, />Measure</i);
  assert.match(html, />Explain</i);
  assert.match(html, /Predict &amp; Prevent/i);
  assert.match(html, /AI methodology/i);
  assert.match(html, /Imaging methodology/i);
  assert.match(html, /Maternal context/i);
  assert.match(html, /One connected developmental story/i);
  assert.match(html, /Recent activity/i);
  assert.match(html, /News archive/i);
  assert.match(html, />Grant</i);
  assert.match(html, />Papers</i);
  assert.match(html, />Media</i);
  assert.match(html, /Placental and Fetal-Circulatory Pathways/i);
  assert.match(html, /NeuroLangSeg/i);
  assert.match(html, /R01HD121683/i);
  assert.match(html, /R01MH133313/i);
  assert.match(html, /Recruiting participants/i);
  assert.match(html, /Participate in our research/i);
  assert.match(html, /Contacting us does not\s*enroll you/i);
  assert.match(html, /do not include\s*medical records or sensitive health information/i);
  assert.match(
    html,
    /Following the maternal health–placenta–brain pathway from\s*pregnancy to infancy/i,
  );
  assert.match(html, /Medical Imaging with Deep Learning/i);
  assert.match(html, /生生之谓易/);
  assert.match(html, /《周易·系辞上传》/);
  assert.match(html, /Life is a continuous process of becoming/i);
  assert.match(html, /hero-life-sprite-pregnancy/i);
  assert.match(html, /hero-life-sprite-infant/i);
  assert.match(html, /hero-life-sprite-child/i);
  assert.match(
    html,
    /Watercolor sequence showing pregnancy, infancy, and a young child in motion/i,
  );
  assert.match(html, /research-placenta\.png/i);
  assert.match(html, /research-circulation\.png/i);
  assert.match(html, /research-brain\.png/i);
  assert.match(
    html,
    /connected view of placental function, fetal circulation,\s*and the developing brain/i,
  );
  assert.match(html, /mailto:yun\.wang2@emory\.edu/i);
  assert.match(
    html,
    /https:\/\/wangyunai\.github\.io\/og-nurture-map-v1\.png/i,
  );
  assert.match(html, /https:\/\/wangyunai\.github\.io\/people\/yun-wang\//i);
  assert.match(
    html,
    /<meta name="google-site-verification" content="yHnQfGtxYITrz_1wQaYFI2cyAWuikGDwt81frJaCdhA"\/?>/i,
  );
  assert.match(html, /0000-0003-2426-2876/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=Inter/i);
  assert.match(html, /Source\+Serif\+4/i);
  assert.match(html, /href="#research"/i);
  assert.match(html, /href="#participate"/i);
  assert.match(html, /id="participate"/i);
  assert.match(html, /id="connect"/i);
  assert.match(html, /View complete publication record/i);
  assert.doesNotMatch(html, /yun-wang-cv\.pdf/i);

  const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "rendered HTML IDs must be unique");
  const localHashes = [...html.matchAll(/\shref="#([^"]+)"/gi)].map(
    (match) => match[1],
  );
  for (const hash of localHashes) {
    assert.ok(ids.includes(hash), `local anchor #${hash} must resolve`);
  }
  assert.doesNotMatch(
    html,
    /Your site is taking shape|codex-preview|react-loading-skeleton/i,
  );
  assert.doesNotMatch(
    html,
    /219-484-9247|NSF CAREER|nexmii2024|NEXMII Lab/i,
  );
});

test("renders one accessible life-course illustration with a decorative three-stage growth path", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  const lifeCourseFigure = html.match(
    /<figure[^>]*class="hero-sketch hero-life-cycle"[\s\S]*?<\/figure>/i,
  )?.[0];

  assert.ok(lifeCourseFigure, "the life-course illustration should render");
  assert.match(
    lifeCourseFigure,
    /aria-label="Watercolor sequence showing pregnancy, infancy, and a young child in motion"/i,
  );
  assert.match(
    lifeCourseFigure,
    /<svg[^>]*class="hero-growth-path"[^>]*aria-hidden="true"[^>]*focusable="false"/i,
  );
  assert.match(lifeCourseFigure, /class="hero-growth-path-line"/i);
  assert.equal(
    [...lifeCourseFigure.matchAll(/class="hero-growth-milestone/g)].length,
    3,
    "the path should mark pregnancy, infancy, and childhood",
  );
});

test("invites visitors into an accessible, explorable Nurture Map", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  const heroActions = html.match(
    /<nav[^>]*class="hero-actions"[\s\S]*?<\/nav>/i,
  )?.[0];
  const nurturePath = html.match(
    /<section[^>]*class="[^"]*nurture-path[^"]*"[\s\S]*?<\/section>/i,
  )?.[0];

  assert.ok(heroActions, "hero actions should render");
  assert.match(heroActions, /href="#nurture-path-title"/i);
  assert.match(heroActions, /Explore the Nurture Map/i);

  assert.ok(nurturePath, "the Nurture Map should render");
  assert.equal(
    [...nurturePath.matchAll(/<button\b/gi)].length,
    5,
    "each developmental stage should be directly explorable",
  );
  assert.match(nurturePath, /aria-pressed="true"/i);
  assert.match(nurturePath, /What we measure/i);
  assert.match(nurturePath, /Why it matters/i);
});

test("progressively discloses deeper context for every research direction", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  const researchSection = html.match(
    /<section[^>]*id="research"[\s\S]*?<\/section>/i,
  )?.[0];

  assert.ok(researchSection, "the research section should render");
  assert.equal(
    [...researchSection.matchAll(/<details[^>]*class="research-item"/gi)].length,
    3,
    "every research direction should be expandable",
  );
  assert.equal(
    [...researchSection.matchAll(/<summary\b/gi)].length,
    3,
    "every research direction should have a keyboard-accessible summary",
  );
  assert.match(researchSection, /Core question/i);
  assert.match(researchSection, /Current work/i);
  assert.match(researchSection, /Why it matters/i);
});

test("removes disposable starter code and preserves core accessibility", async () => {
  const [page, nurturePath, layout, css, packageJson, sitemap] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/nurture-path.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="skip-link"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /className="hero-epigraph"/);
  assert.match(page, /className="hero-sketch hero-life-cycle"/);
  assert.match(page, /hero-life-stage-pregnancy/);
  assert.match(page, /hero-life-stage-infant/);
  assert.match(page, /hero-life-stage-child/);
  assert.match(page, /hero-life-sprite-pregnancy/);
  assert.match(page, /hero-life-sprite-infant/);
  assert.match(page, /hero-life-sprite-child/);
  assert.match(page, /id="main-content"/);
  assert.match(page, /className="narrative-shell"/);
  assert.match(page, /className="site-frame lab-identity-bar"/);
  assert.match(page, /className="latest-strip"/);
  assert.match(page, /latestHighlights\.map/);
  assert.match(page, /<NurturePath stages=\{nurturePathStages\}/);
  assert.match(nurturePath, /className=\{`site-frame nurture-path/);
  assert.match(nurturePath, /IntersectionObserver/);
  assert.match(nurturePath, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(page, /className="profile-sidebar"/);
  const identityLinks = page.match(
    /<nav\s+className="lab-identity-links"[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(identityLinks, "homepage identity links should exist");
  assert.equal(
    [...identityLinks.matchAll(/<(?:a|Link)\b/g)].length,
    3,
    "homepage identity bar should contain exactly three links",
  );
  assert.match(identityLinks, />PI profile<\/Link>/);
  assert.match(identityLinks, />Email<\/a>/);
  assert.match(identityLinks, />\s*ORCID\s*<\/a>/);
  assert.doesNotMatch(identityLinks, /CV \(PDF\)|Emory|DBLP|GitHub|LinkedIn/);
  assert.ok(
    page.indexOf('className="hero-epigraph"') >
      page.indexOf('className="hero"'),
    "guiding quote should be integrated into the hero",
  );
  assert.doesNotMatch(page, /className="top-quote"/);
  assert.doesNotMatch(page, /className="favorite-quote"/);
  assert.match(page, /className="research-number"/);
  assert.match(page, /className="section methods-section"/);
  assert.match(page, /className="scientific-plate"/);
  assert.match(page, /aria-labelledby="scientific-plate-caption"/);
  assert.match(page, /research-placenta\.png/);
  assert.match(page, /research-circulation\.png/);
  assert.match(page, /research-brain\.png/);
  assert.match(page, /className="publication-marker"/);
  assert.match(page, /className="hero-actions"/);
  assert.match(page, /className="study-list"/);
  assert.match(page, /className="featured-story"/);
  assert.match(page, /className="section vision-section"/);
  assert.match(page, /className="methods-framework"/);
  assert.match(page, /className="engagement-grid"/);
  assert.match(page, /Please do not include/);
  assert.match(layout, /url:\s*"\/og-nurture-map-v1\.png"/);
  assert.match(layout, /canonicalSiteUrl/);
  assert.match(layout, /Yun Wang, PhD/);
  assert.match(layout, /fonts\.googleapis\.com/);
  assert.match(layout, /Source\+Serif\+4/);
  assert.doesNotMatch(layout, /Geist|next\/font/);
  assert.match(
    layout,
    /google:\s*"yHnQfGtxYITrz_1wQaYFI2cyAWuikGDwt81frJaCdhA"/,
  );
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /watercolor-wash\.webp/);
  assert.match(css, /@keyframes watercolor-drift/);
  assert.match(css, /@keyframes hero-stage-pregnancy/);
  assert.match(css, /@keyframes hero-stage-infant/);
  assert.match(css, /@keyframes hero-stage-child/);
  assert.match(css, /@keyframes hero-growth-path-draw/);
  assert.match(css, /@keyframes hero-growth-milestone-reveal/);
  assert.match(css, /@keyframes hero-sprite-five/);
  assert.match(css, /@keyframes hero-sprite-seven/);
  assert.match(css, /hero-stage-child 7\.8s[\s\S]*?1 both/);
  assert.match(css, /hero-sprite-five 1s steps\(4, end\)/);
  assert.match(css, /hero-sprite-five 1\.1s steps\(4, end\) 2\.2s/);
  assert.match(css, /hero-sprite-seven 0\.76s steps\(6, end\) 4\.85s/);
  assert.doesNotMatch(css, /hero-sketch-breathe/);
  assert.doesNotMatch(
    css,
    /hero-stage-(?:pregnancy|infant|child)[^\n]*infinite/,
  );
  assert.doesNotMatch(css, /hero-sprite-(?:five|seven)[^\n]*infinite/);
  assert.match(css, /@keyframes nurture-thread-draw/);
  assert.match(css, /@keyframes nurture-thread-draw-vertical/);
  assert.match(css, /@keyframes nurture-stage-reveal/);
  assert.match(css, /--font-sans:\s*"Inter"/);
  assert.match(css, /--font-serif:\s*"Source Serif 4"/);
  assert.match(css, /font-family:\s*var\(--font-sans\)/);
  assert.match(css, /font-family:\s*var\(--font-serif\)/);
  assert.match(css, /"Songti SC",\s*"STSong"/);
  assert.match(css, /animation-iteration-count:\s*1\s*!important/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(
    page,
    /trajectory-field|developmental-axis|evidence-band|federated-map|news-tags|nav-cta|Xuzhe Zhang|松子兵法|孙子兵法|兵无常势/,
  );
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|codex-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.match(layout, /AI & Quantitative MRI for Maternal–Infant Health/);
  assert.match(
    layout,
    /tracing pathways from maternal health to the developing brain/,
  );
  assert.match(sitemap, /<lastmod>2026-08-12<\/lastmod>/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("public/_sites-preview", projectRoot)));
  await access(new URL("public/watercolor-wash.webp", projectRoot));
  await access(new URL("public/og-nurture-map-v1.png", projectRoot));
  await access(new URL("public/mother-pregnancy-sketch.webp", projectRoot));
  await access(new URL("public/mother-pregnancy-motion.webp", projectRoot));
  await access(new URL("public/mother-infant-sketch.webp", projectRoot));
  await access(new URL("public/mother-infant-motion.webp", projectRoot));
  await access(new URL("public/child-running-sketch.webp", projectRoot));
  await access(new URL("public/child-running-motion.webp", projectRoot));
  await access(new URL("public/mother-pregnancy-sprite-v2.webp", projectRoot));
  await access(new URL("public/mother-infant-sprite-v2.webp", projectRoot));
  await access(new URL("public/child-running-sprite-v2.webp", projectRoot));
  await access(new URL("public/research-placenta.png", projectRoot));
  await access(new URL("public/research-circulation.png", projectRoot));
  await access(new URL("public/research-brain.png", projectRoot));
  await assert.rejects(access(new URL("public/yun-wang-cv.pdf", projectRoot)));
  await assert.rejects(access(new URL("public/yun-wang.jpg", projectRoot)));
  await access(new URL("public/yun-wang-illustrated.png", projectRoot));
  await assert.rejects(access(new URL("public/og.png", projectRoot)));
  await assert.rejects(access(new URL("public/og-theme-v2.png", projectRoot)));
  await assert.rejects(access(new URL("public/og-editorial-v3.png", projectRoot)));
  await access(new URL("public/robots.txt", projectRoot));
  await access(new URL("public/sitemap.xml", projectRoot));
});

test("server-renders Yun Wang's canonical academic profile", async () => {
  const response = await render("/people/yun-wang");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h1[^>]*>Yun Wang, Ph\.D\.<\/h1>/i);
  assert.match(html, /Yun Wang, PhD \| AI &amp; Quantitative MRI at Emory/i);
  assert.match(html, /Principal Investigator · Nurture Map Lab/i);
  assert.match(html, /Assistant Professor of Biomedical Informatics/i);
  assert.match(html, /independently funded/i);
  assert.match(html, /two R01s/i);
  assert.match(html, /quantitative MRI/i);
  assert.match(html, /Appointments and training/i);
  assert.match(html, /Selected publications/i);
  assert.doesNotMatch(html, /yun-wang-cv\.pdf|CV \(PDF\)/i);
  assert.doesNotMatch(html, /yun-wang\.jpg/i);
  assert.match(html, /yun-wang-illustrated\.png/i);
  assert.match(html, /ProfilePage/i);
  assert.match(
    html,
    /https:\/\/wangyunai\.github\.io\/people\/yun-wang\//i,
  );
  assert.doesNotMatch(html, /219-484-9247|101 Woodruff Circle/i);
});

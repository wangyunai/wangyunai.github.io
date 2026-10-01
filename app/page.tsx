import Link from "next/link";
import NurturePath from "./components/nurture-path";

const navigation = [
  { label: "Research", href: "#research" },
  { label: "For families", href: "#participate", highlight: true },
  { label: "Methods", href: "#methods" },
  { label: "Publications", href: "#publications" },
  { label: "People", href: "#people" },
  { label: "Connect", href: "#connect" },
];

const nurturePathStages = [
  {
    number: "01",
    title: "Maternal context",
    detail: "Health · metabolism · environment",
    measure:
      "Maternal metabolic, inflammatory, environmental, and psychosocial context.",
    meaning:
      "These are potentially modifiable influences that begin the developmental pathway.",
  },
  {
    number: "02",
    title: "Placenta",
    detail: "Exchange · function · signaling",
    measure:
      "Placental structure, perfusion, oxygenation, exchange, and molecular signaling.",
    meaning:
      "The placenta is a dynamic mediator between maternal health and fetal development.",
  },
  {
    number: "03",
    title: "Fetal circulation",
    detail: "Flow · hemodynamics · oxygen delivery",
    measure:
      "Blood flow, cardiovascular adaptation, hemodynamics, and oxygen delivery.",
    meaning:
      "Fetal physiology connects placental function to the environment reaching the brain.",
  },
  {
    number: "04",
    title: "Developing brain",
    detail: "Structure · connectivity · growth",
    measure:
      "Brain structure, tissue maturation, connectivity, and region-specific growth.",
    meaning:
      "Quantitative phenotypes can reveal emerging developmental differences early in life.",
  },
  {
    number: "05",
    title: "Early neurobehavior",
    detail: "Regulation · attention · communication",
    measure:
      "Regulation, attention, social communication, and other early behavioral outcomes.",
    meaning:
      "Behavior links early biology with outcomes that matter to children and families.",
  },
];

const researchAreas = [
  {
    title: "AI Methods for Perinatal Imaging Phenotypes",
    description:
      "We develop learning methods for fetal, placental, newborn, and infant MRI. Our work addresses motion, changing anatomy, variable contrast, scanner differences, and limited labels to produce interpretable developmental phenotypes.",
    focus: "Self-supervised learning · Domain adaptation · Foundation models",
    question:
      "How can we recover reliable phenotypes from moving, rapidly changing anatomy and limited labels?",
    currentWork:
      "Motion-robust fetal, placental, newborn, and infant MRI across heterogeneous scanners.",
    impact:
      "Interpretable and reproducible measurements that can travel across studies and clinical settings.",
  },
  {
    title: "Placental and Fetal-Circulatory Pathways",
    description:
      "We study how maternal metabolism, inflammation, stress, medications, and environmental context shape placental function, fetal hemodynamics, oxygen delivery, and early brain development.",
    focus: "Placental MRI · Fetal circulation · Multi-omics",
    question:
      "Where does risk emerge along the maternal–placental–fetal pathway?",
    currentWork:
      "Longitudinal MRI and multi-omics across pregnancy and infancy in two NIH-funded studies.",
    impact:
      "Potentially modifiable biological pathways before developmental differences become established.",
  },
  {
    title: "From Perinatal Phenotypes to Neurobehavioral Risk",
    description:
      "We connect perinatal imaging phenotypes with regulation, attention, social communication, NICU course, and early psychopathology risk, with an emphasis on modifiable pathways and early prevention.",
    focus: "Longitudinal outcomes · Early behavior · Prevention",
    question:
      "Which perinatal phenotypes signal later neurobehavioral risk or resilience?",
    currentWork:
      "Linking imaging with regulation, attention, communication, NICU course, and early psychopathology.",
    impact:
      "Earlier risk stratification and prevention grounded in measurable developmental pathways.",
  },
];

const researchVision = [
  {
    number: "01",
    title: "Measure",
    description:
      "Develop quantitative MRI and AI biomarkers of placental, fetal-circulatory, and developing-brain physiology.",
  },
  {
    number: "02",
    title: "Explain",
    description:
      "Connect maternal metabolic and environmental factors to placental function, fetal physiology, and neurodevelopment.",
  },
  {
    number: "03",
    title: "Predict & Prevent",
    description:
      "Identify early, modifiable pathways that can guide risk stratification and intervention before neurodevelopmental differences become established.",
  },
];

const methods = [
  {
    title: "FINNEAS",
    meta: "Federated infant neuroimaging platform · 2022",
    description:
      "Privacy-preserving, cloud-based analysis that makes advanced infant MRI methods accessible without requiring programming expertise.",
    links: [{ label: "Platform", href: "https://www.finneas.ai/" }],
  },
  {
    title: "MAPSeg",
    meta: "Medical image segmentation · CVPR 2024",
    description:
      "Unified domain adaptation for heterogeneous 3D medical images using masked autoencoding and pseudo-labeling.",
    links: [
      {
        label: "Paper",
        href: "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_MAPSeg_Unified_Unsupervised_Domain_Adaptation_for_Heterogeneous_Medical_Image_Segmentation_CVPR_2024_paper.html",
      },
      { label: "Code", href: "https://github.com/XuzheZ/MAPSeg" },
    ],
  },
  {
    title: "NeuroLangSeg",
    meta: "Language-guided segmentation · MIDL 2026",
    description:
      "Subcortical segmentation with pseudo-supervision and anatomical–linguistic validation.",
    links: [
      {
        label: "Paper",
        href: "https://proceedings.mlr.press/v315/liu26b.html",
      },
      { label: "Code", href: "https://github.com/jlliu2001/SAT_MPL" },
    ],
  },
  {
    title: "Fetal MRI Super-Resolution",
    meta: "Diffusion reconstruction · MIDL 2026",
    description:
      "Orientation-aware diffusion models that recover 3T-like detail from routine 1.5T fetal MRI.",
    links: [
      {
        label: "Paper",
        href: "https://proceedings.mlr.press/v315/zhong26a.html",
      },
    ],
  },
  {
    title: "Placental MRI Phenotyping",
    meta: "Quantitative placental MRI · MICCAI 2025",
    description:
      "Contrast-invariant self-supervised segmentation for reproducible measurement across imaging conditions.",
    links: [
      {
        label: "Paper",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12498333/",
      },
    ],
  },
  {
    title: "PTNet3D",
    meta: "Longitudinal MRI synthesis · IEEE TMI 2022",
    description:
      "A 3D transformer-based framework for high-resolution longitudinal infant brain MRI synthesis.",
    links: [
      {
        label: "Paper",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9529847/",
      },
      { label: "Code", href: "https://github.com/XuzheZ/PTNet3D" },
    ],
  },
];

const scientificPlate = [
  {
    number: "01",
    title: "Placental function",
    src: "/research-placenta.png",
    alt: "Anatomical illustration of the placenta and its branching maternal–fetal vasculature",
    width: 230,
    height: 185,
  },
  {
    number: "02",
    title: "Fetal circulation",
    src: "/research-circulation.png",
    alt: "Anatomical illustration representing the fetal heart and circulation",
    width: 150,
    height: 190,
  },
  {
    number: "03",
    title: "Developing brain",
    src: "/research-brain.png",
    alt: "Anatomical illustration of the developing brain in lateral view",
    width: 190,
    height: 155,
  },
];

const funding = [
  {
    agency: "NICHD",
    id: "R01HD121683",
    period: "2026–2031",
    role: "PI",
    href: "https://reporter.nih.gov/project-details/11342946",
    title:
      "The Maternal Obesity–Placenta–Brain Axis: Longitudinal MRI from Gestation to Infancy",
    recruiting: true,
  },
  {
    agency: "NIMH",
    id: "R01MH133313",
    period: "2024–2029",
    role: "Multiple PI",
    href: "https://reporter.nih.gov/project-details/11314497",
    title:
      "Prenatal Maternal Obesity and Neurodevelopment: The Mediating Role of the Microbiome and Metabolome",
    recruiting: true,
  },
  {
    agency: "NICHD",
    id: "R00HD103912",
    period: "2024–2027",
    role: "PI",
    href: "https://reporter.nih.gov/project-details/11324922",
    title:
      "Leveraging Artificial Intelligence to Develop Novel Tools for Studying Infant Brain Development",
    recruiting: false,
  },
  {
    agency: "NIH",
    id: "U54HD122209",
    period: "2025–2030",
    role: "Co-Investigator",
    href: "https://reporter.nih.gov/project-details/11173107",
    title:
      "ARISEN: Autoimmunity, Rasmussen’s, Inflammation & Status Epilepticus Research Network",
    recruiting: false,
  },
];

const recruitingStudies = [
  {
    id: "R01HD121683",
    agency: "NICHD",
    title: "Maternal Obesity–Placenta–Brain Study",
    description:
      "We are following families from pregnancy through infancy to understand how maternal health, placental function, fetal circulation, infant brain development, and early behavior are connected.",
  },
  {
    id: "R01MH133313",
    agency: "NIMH",
    title: "Maternal Metabolism and Neurodevelopment Study",
    description:
      "This study examines how maternal metabolic health, the microbiome and metabolome, and early neurodevelopment may be linked across pregnancy and early life.",
    href: "https://psychiatry.duke.edu/duke-momma-study",
  },
];

const publications = [
  {
    year: "2026",
    title:
      "NeuroLangSeg: Language-Guided Subcortical Segmentation with Pseudo-Supervision and Anatomical–Linguistic Validation",
    authors: "Liu, R., Liu, J., Zhang, X., Huang, C., & Wang, Y.",
    venue: "Medical Imaging with Deep Learning",
    href: "https://proceedings.mlr.press/v315/liu26b.html",
  },
  {
    year: "2026",
    title:
      "Orientation-Aware Diffusion Super-Resolution for 3T-Like Fetal MRI from Routine 1.5T Scans",
    authors:
      "Zhong, X., Liu, R., Lin, G., Huang, C., Goldman-Yassen, A., Mehollin-Ray, A., & Wang, Y.",
    venue: "Medical Imaging with Deep Learning",
    href: "https://proceedings.mlr.press/v315/zhong26a.html",
  },
  {
    year: "2026",
    title:
      "A Two-Stage Multi-Modal MRI Framework for Lifespan Brain Age Prediction",
    authors: "Zhang, D., et al., & Wang, Y.",
    venue: "Medical Imaging with Deep Learning",
    href: "https://openreview.net/forum?id=YWDQpIgWFK",
  },
  {
    year: "2025",
    title:
      "Contrast-Invariant Self-supervised Segmentation for Quantitative Placental MRI",
    authors:
      "Zhong, X., Liu, R., Nichols, E. S., Zhang, X., Laine, A. F., Duerden, E. G., & Wang, Y.",
    venue: "MICCAI PIPPI",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12498333/",
  },
  {
    year: "2025",
    title: "Prediction of Mental Health Risk in Adolescents",
    authors:
      "Hill, E. D., Kashyap, P., Raffanello, E., Wang, Y., Moffitt, T. E., Caspi, A., et al.",
    venue: "Nature Medicine",
    href: "https://doi.org/10.1038/s41591-025-03560-7",
  },
  {
    year: "2024",
    title:
      "MAPSeg: Unified Unsupervised Domain Adaptation for Heterogeneous Medical Image Segmentation",
    authors:
      "Zhang, X., Wu, Y., Angelini, E., Li, A., Guo, J., Rasmussen, J. M., O’Connor, T. G., Wang, Y., et al.",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    href: "https://openaccess.thecvf.com/content/CVPR2024/html/Zhang_MAPSeg_Unified_Unsupervised_Domain_Adaptation_for_Heterogeneous_Medical_Image_Segmentation_CVPR_2024_paper.html",
  },
  {
    year: "2024",
    title:
      "Segmenting Hypothalamic Subunits in Human Newborn Magnetic Resonance Imaging Data",
    authors:
      "Rasmussen, J. M., Wang, Y., Graham, A. M., Fair, D. A., Posner, J., O’Connor, T. G., et al.",
    venue: "Human Brain Mapping",
    href: "https://doi.org/10.1002/hbm.26582",
  },
  {
    year: "2019",
    title:
      "The Association Between Antidepressant Treatment and Brain Connectivity in Two Double-Blind, Placebo-Controlled Clinical Trials",
    authors:
      "Wang, Y., Bernanke, J., Peterson, B. S., McGrath, P., Stewart, J., Chen, Y., et al.",
    venue: "The Lancet Psychiatry",
    href: "https://doi.org/10.1016/S2215-0366(19)30179-8",
  },
];

const people = [
  {
    name: "Ruiying Liu, Ph.D.",
    role: "Postdoctoral Fellow",
    focus: "Segmentation, motion correction, and foundation models",
  },
  {
    name: "Xinliu Zhong",
    role: "Ph.D. Candidate · Emory University",
    focus: "Placental and fetal MRI",
  },
];

const news = [
  {
    date: "June 2026",
    dateTime: "2026-06",
    category: "Grant",
    prominent: true,
    title:
      "New NICHD R01 supports a longitudinal study of the maternal obesity–placenta–brain axis.",
    href: "https://reporter.nih.gov/project-details/11342946",
  },
  {
    date: "2026",
    dateTime: "2026",
    category: "Papers",
    prominent: true,
    title:
      "Three senior-author papers accepted at Medical Imaging with Deep Learning.",
    href: "https://proceedings.mlr.press/v315/liu26b.html",
  },
  {
    date: "September 2025",
    dateTime: "2025-09",
    category: "Network",
    prominent: false,
    title: "Nurture Map Lab joins the NIH U54 ARISEN research network.",
    href: "https://www.rarediseasesnetwork.org/consortia-directory",
  },
  {
    date: "March 2025",
    dateTime: "2025-03",
    category: "Media",
    prominent: true,
    title:
      "Mental health prediction study published in Nature Medicine and featured by Georgia Public Broadcasting.",
    href: "https://www.gpb.org/news/2025/03/20/emory-researcher-uses-artificial-intelligence-predict-youth-mental-health-risks",
  },
];

const latestHighlights = news.filter((item) => item.prominent);

const identityLinks = {
  emory: "https://med.emory.edu/directory/profile/?u=YWAN303",
  orcid: "https://orcid.org/0000-0003-2426-2876",
  dblp: "https://dblp.org/pid/36/3235-49.html",
  github: "https://github.com/wangyunai",
  linkedin: "https://www.linkedin.com/in/yun-wang-8308713b/",
};

const siteDescription =
  "Yun Wang, PhD, leads an NIH-funded computational maternal–fetal imaging program at Emory University, developing AI and quantitative MRI methods from maternal health through placental and fetal physiology to early brain development.";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://wangyunai.github.io/#website",
      url: "https://wangyunai.github.io/",
      name: "Nurture Map Lab",
      description: siteDescription,
      inLanguage: "en",
      publisher: {
        "@id": "https://wangyunai.github.io/#lab",
      },
    },
    {
      "@type": "ResearchOrganization",
      "@id": "https://wangyunai.github.io/#lab",
      name: "Nurture Map Lab",
      alternateName: "Nurture Map Laboratory",
      slogan: "Maternal–Infant Imaging, AI & Neurodevelopment",
      url: "https://wangyunai.github.io/",
      logo: "https://wangyunai.github.io/brand-mark.png",
      email: "yun.wang2@emory.edu",
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "Emory University",
        url: "https://www.emory.edu/",
      },
      member: {
        "@id": "https://wangyunai.github.io/people/yun-wang/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://wangyunai.github.io/people/yun-wang/#person",
      name: "Yun Wang",
      honorificSuffix: "PhD",
      url: "https://wangyunai.github.io/people/yun-wang/",
      image: "https://wangyunai.github.io/yun-wang-illustrated.png",
      jobTitle: "Assistant Professor of Biomedical Informatics",
      worksFor: {
        "@id": "https://wangyunai.github.io/#lab",
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Emory University",
        url: "https://www.emory.edu/",
      },
      sameAs: Object.values(identityLinks),
      knowsAbout: [
        "Artificial intelligence for medical imaging",
        "Quantitative magnetic resonance imaging",
        "Maternal–fetal imaging",
        "Placental and fetal physiology",
        "Infant brain development",
        "Biomedical informatics",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-frame header-inner">
          <Link className="brand" href="/" aria-label="Nurture Map Lab home">
            Nurture Map Lab
          </Link>

          <nav className="primary-navigation" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                className={item.highlight ? "navigation-cta" : undefined}
                key={item.href}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="narrative-shell">
        <main id="main-content">
          <section className="hero" id="home">
            <div className="site-frame hero-layout">
              <div className="hero-copy">
                <p className="hero-kicker">
                  Maternal–Infant Imaging, AI &amp; Neurodevelopment
                </p>
                <h1>
                  Tracing the pathways from maternal health to the developing
                  brain.
                </h1>
                <p className="hero-summary">
                  We develop AI and quantitative MRI methods to map how
                  maternal health shapes placental function, fetal physiology,
                  brain development, and early neurobehavior.
                </p>
                <nav className="hero-actions" aria-label="Introduction">
                  <a className="button-link" href="#nurture-path-title">
                    Explore the Nurture Map
                  </a>
                  <a className="text-arrow-link" href="#participate">
                    Participate in a study <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </div>
              <div className="hero-visual">
                <figure
                  className="hero-sketch hero-life-cycle"
                  role="img"
                  aria-label="Watercolor sequence showing pregnancy, infancy, and a young child in motion"
                >
                  <svg
                    className="hero-growth-path"
                    viewBox="0 0 320 480"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      className="hero-growth-path-wash"
                      d="M 45 390 C 52 310, 119 292, 146 238 S 221 173, 276 90"
                      pathLength="1"
                    />
                    <path
                      className="hero-growth-path-line"
                      d="M 45 390 C 52 310, 119 292, 146 238 S 221 173, 276 90"
                      pathLength="1"
                    />
                    <circle
                      className="hero-growth-milestone hero-growth-milestone-pregnancy"
                      cx="45"
                      cy="390"
                      r="4.5"
                    />
                    <circle
                      className="hero-growth-milestone hero-growth-milestone-infant"
                      cx="146"
                      cy="238"
                      r="4.5"
                    />
                    <circle
                      className="hero-growth-milestone hero-growth-milestone-child"
                      cx="276"
                      cy="90"
                      r="4.5"
                    />
                  </svg>
                  <span
                    className="hero-life-stage hero-life-stage-pregnancy"
                    aria-hidden="true"
                  >
                    <span className="hero-life-sprite hero-life-sprite-pregnancy" />
                  </span>
                  <span
                    className="hero-life-stage hero-life-stage-infant"
                    aria-hidden="true"
                  >
                    <span className="hero-life-sprite hero-life-sprite-infant" />
                  </span>
                  <span
                    className="hero-life-stage hero-life-stage-child"
                    aria-hidden="true"
                  >
                    <span className="hero-life-sprite hero-life-sprite-child" />
                  </span>
                </figure>
                <figure
                  className="hero-epigraph"
                  aria-label="Guiding passage"
                >
                  <blockquote lang="zh-Hans">
                    <p>生生之谓易。</p>
                  </blockquote>
                  <figcaption>
                    <cite>《周易·系辞上传》</cite>
                    <span>Life is a continuous process of becoming.</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            <NurturePath stages={nurturePathStages} />
          </section>

          <aside
            className="site-frame lab-identity-bar"
            aria-label="Laboratory profile"
          >
            <div className="lab-identity-copy">
              <span>Led by</span>
              <strong>
                <Link href="/people/yun-wang/">Yun Wang, Ph.D.</Link>
              </strong>
              <small>Assistant Professor of Biomedical Informatics</small>
            </div>
            <div className="lab-identity-copy">
              <span>Based at</span>
              <strong>Emory University School of Medicine</strong>
              <small>Atlanta, Georgia</small>
            </div>
            <div className="lab-evidence" aria-label="Laboratory activity">
              <span>
                <b>2</b> R01s
              </span>
              <span>
                <b>4</b> active NIH awards
              </span>
              <span>
                <b>32</b> peer-reviewed publications
              </span>
            </div>
            <nav
              className="lab-identity-links"
              aria-label="Contact and profiles"
            >
              <Link href="/people/yun-wang/">PI profile</Link>
              <a href="mailto:yun.wang2@emory.edu">Email</a>
              <a href={identityLinks.orcid} target="_blank" rel="noreferrer">
                ORCID
              </a>
            </nav>
          </aside>

          <section
            className="latest-strip"
            id="latest"
            aria-labelledby="latest-title"
          >
            <div className="site-frame latest-layout">
              <header className="latest-heading">
                <p>Latest</p>
                <h2 id="latest-title">Recent activity</h2>
              </header>
              <div className="latest-list">
                {latestHighlights.map((item) => (
                  <article
                    className="latest-item"
                    key={`${item.date}-${item.title}`}
                  >
                    <div className="latest-meta">
                      <span>{item.category}</span>
                      <time dateTime={item.dateTime}>{item.date}</time>
                    </div>
                    <h3>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

        <section className="section participate-section" id="participate">
          <div className="site-frame">
            <header className="section-heading participate-heading">
              <p className="section-kicker">For families</p>
              <h2>Participate in our research</h2>
              <p>
                Two NIH-funded Nurture Map studies are currently recruiting
                participants. Together, they examine how health during
                pregnancy relates to placental function, the maternal
                microbiome and metabolome, and early neurodevelopment.
              </p>
            </header>

            <div className="study-list">
              {recruitingStudies.map((study) => (
                <article className="study-card" key={study.id}>
                  <p className="study-status">
                    <span aria-hidden="true" /> Recruiting participants
                  </p>
                  <p className="study-code">
                    {study.agency} · {study.id}
                  </p>
                  <h3>{study.title}</h3>
                  <p>{study.description}</p>
                  <div className="study-actions">
                    <a
                      className="text-arrow-link"
                      href={`mailto:yun.wang2@emory.edu?subject=${encodeURIComponent(`Interest in ${study.id} participation`)}`}
                    >
                      Ask about participating <span aria-hidden="true">→</span>
                    </a>
                    {study.href ? (
                      <a href={study.href} target="_blank" rel="noreferrer">
                        Study details
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <p className="participant-note">
              Eligibility and study activities differ by project. Contact the
              study team for current, approved details. Contacting us does not
              enroll you, and participation is voluntary. Please do not include
              medical records or sensitive health information in your first
              email.
            </p>
          </div>
        </section>

        <section className="section" id="research">
          <div className="site-frame">
            <header className="section-heading">
              <h2>Research</h2>
              <p>
                Our program is supported by four active NIH awards and has
                contributed to 32 peer-reviewed publications.
              </p>
              <p>
                By combining imaging, machine learning, multi-omics, and
                longitudinal behavioral data, we build measurable phenotypes
                and identify potentially modifiable pathways for earlier
                intervention.
              </p>
            </header>

            <div className="research-list">
              {researchAreas.map((area, index) => (
                <details
                  className="research-item"
                  key={area.title}
                  open={index === 0}
                >
                  <summary>
                    <span className="research-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="research-summary-copy">
                      <h3>{area.title}</h3>
                      <small>{area.focus}</small>
                    </span>
                    <span className="research-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="research-detail">
                    <p className="research-description">{area.description}</p>
                    <dl className="research-facts">
                      <div>
                        <dt>Core question</dt>
                        <dd>{area.question}</dd>
                      </div>
                      <div>
                        <dt>Current work</dt>
                        <dd>{area.currentWork}</dd>
                      </div>
                      <div>
                        <dt>Why it matters</dt>
                        <dd>{area.impact}</dd>
                      </div>
                    </dl>
                  </div>
                </details>
              ))}
            </div>

            <article className="featured-story" aria-labelledby="featured-program-title">
              <div className="featured-story-copy">
                <p className="section-kicker">
                  Featured program · NICHD R01HD121683
                </p>
                <h3 id="featured-program-title">
                  Following the maternal health–placenta–brain pathway from
                  pregnancy to infancy
                </h3>
                <p className="featured-story-lead">
                  How do conditions during pregnancy shape placental function
                  and early brain development? This longitudinal program uses
                  multimodal MRI and interpretable computational methods to
                  study connected changes from gestation through infancy.
                </p>
                <dl className="story-facts">
                  <div>
                    <dt>Question</dt>
                    <dd>Where along this connected pathway does risk emerge?</dd>
                  </div>
                  <div>
                    <dt>Approach</dt>
                    <dd>Longitudinal imaging, biological measures, and early behavior.</dd>
                  </div>
                  <div>
                    <dt>Why it matters</dt>
                    <dd>To identify measurable and potentially modifiable pathways.</dd>
                  </div>
                </dl>
                <a className="text-arrow-link" href="#participate">
                  Learn about participation <span aria-hidden="true">→</span>
                </a>
              </div>

              <figure
                className="scientific-plate"
                aria-labelledby="scientific-plate-caption"
              >
                <div className="scientific-plate-grid">
                  {scientificPlate.map((image) => (
                    <div className="scientific-plate-slot" key={image.title}>
                      <div className="scientific-plate-image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                        />
                      </div>
                      <div className="scientific-plate-label">
                        <span aria-hidden="true">{image.number}</span>
                        <strong>{image.title}</strong>
                      </div>
                    </div>
                  ))}
                </div>
                <figcaption id="scientific-plate-caption">
                  A connected view of placental function, fetal circulation,
                  and the developing brain.
                </figcaption>
              </figure>
            </article>

            <div className="support-block" id="funding">
              <div className="subsection-heading">
                <h3>Active support</h3>
                <p>Current federally funded research programs.</p>
              </div>
              <div className="funding-list">
                {funding.map((grant) => (
                  <article className="funding-item" key={grant.id}>
                    <div className="funding-code">
                      <strong>{grant.agency}</strong>
                      <span>{grant.id}</span>
                    </div>
                    <p>
                      <a href={grant.href} target="_blank" rel="noreferrer">
                        {grant.title}
                      </a>
                    </p>
                    <div className="funding-meta">
                      <span>{grant.role}</span>
                      <span>{grant.period}</span>
                      {grant.recruiting ? (
                        <a className="recruiting-badge" href="#participate">
                          Recruiting participants
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="section vision-section"
          id="vision"
          aria-labelledby="vision-title"
        >
          <div className="site-frame vision-layout">
            <header className="section-heading vision-heading">
              <p className="section-kicker">Research trajectory</p>
              <h2 id="vision-title">Where we’re going</h2>
              <p>
                Our next phase connects measurement, mechanism, and prevention
                across the maternal–placental–fetal–brain pathway.
              </p>
            </header>
            <ol className="vision-list">
              {researchVision.map((direction) => (
                <li className="vision-item" key={direction.title}>
                  <span aria-hidden="true">{direction.number}</span>
                  <div>
                    <h3>{direction.title}</h3>
                    <p>{direction.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section methods-section" id="methods">
          <div className="site-frame">
            <header className="section-heading">
              <h2>Methods and software</h2>
              <p>
                Our methods account for motion, rapid anatomical change, sparse
                labels, and heterogeneous scanners in fetal, placental,
                newborn, and infant MRI.
              </p>
            </header>

            <dl className="methods-framework" aria-label="Methodological program">
              <div>
                <dt>AI methodology</dt>
                <dd>
                  Self-supervised learning · Foundation models · Domain
                  adaptation · Generative modeling
                </dd>
              </div>
              <div>
                <dt>Imaging methodology</dt>
                <dd>
                  Motion-robust reconstruction · Quantitative MRI ·
                  Segmentation · Multimodal phenotyping
                </dd>
              </div>
            </dl>

            <div className="methods-list">
              {methods.slice(0, 4).map((method) => (
                <article className="method-item" key={method.title}>
                  <p>{method.meta}</p>
                  <h3>{method.title}</h3>
                  <div>
                    {method.description}
                    <nav className="method-links" aria-label={`${method.title} resources`}>
                      {method.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </article>
              ))}
            </div>
            <details className="more-content">
              <summary>View two more methods</summary>
              <div className="methods-list">
                {methods.slice(4).map((method) => (
                  <article className="method-item" key={method.title}>
                    <p>{method.meta}</p>
                    <h3>{method.title}</h3>
                    <div>
                      {method.description}
                      <nav className="method-links" aria-label={`${method.title} resources`}>
                        {method.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section className="section publications-section" id="publications">
          <div className="site-frame">
            <header className="section-heading">
              <h2>Selected publications</h2>
              <p>
                Recent and representative work across medical imaging, machine
                learning, neurodevelopment, and mental health.
              </p>
            </header>

            <div className="publication-list">
              {publications.slice(0, 5).map((publication, index) => (
                <article
                  className="publication-item"
                  key={`${publication.year}-${publication.title}`}
                >
                  <span className="publication-marker">
                    <b aria-hidden="true">
                      [{String(index + 1).padStart(2, "0")}]
                    </b>
                    <time dateTime={publication.year}>{publication.year}</time>
                  </span>
                  <div>
                    <h3>
                      {publication.href ? (
                        <a
                          href={publication.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {publication.title}
                        </a>
                      ) : (
                        publication.title
                      )}
                    </h3>
                    <p>{publication.authors}</p>
                    <em>{publication.venue}</em>
                  </div>
                </article>
              ))}
            </div>
            <details className="more-content publication-more">
              <summary>View three more selected publications</summary>
              <div className="publication-list">
                {publications.slice(5).map((publication, index) => (
                  <article
                    className="publication-item"
                    key={`${publication.year}-${publication.title}`}
                  >
                    <span className="publication-marker">
                      <b aria-hidden="true">
                        [{String(index + 6).padStart(2, "0")}]
                      </b>
                      <time dateTime={publication.year}>{publication.year}</time>
                    </span>
                    <div>
                      <h3>
                        <a href={publication.href} target="_blank" rel="noreferrer">
                          {publication.title}
                        </a>
                      </h3>
                      <p>{publication.authors}</p>
                      <em>{publication.venue}</em>
                    </div>
                  </article>
                ))}
              </div>
            </details>
            <a
              className="profile-record-link"
              href={identityLinks.dblp}
              target="_blank"
              rel="noreferrer"
            >
              View complete publication record →
            </a>
          </div>
        </section>

        <section className="section people-section" id="people">
          <div className="site-frame">
            <header className="section-heading">
              <h2>People</h2>
              <p>
                We are a small interdisciplinary group working where
                computation, imaging, and maternal–infant health meet. We train
                researchers to develop rigorous methods grounded in biological
                and clinical questions.
              </p>
            </header>

            <article className="pi-profile">
              <div>
                <p className="profile-label">Principal Investigator</p>
                <h3>
                  <Link href="/people/yun-wang/">Yun Wang, Ph.D.</Link>
                </h3>
                <p className="pi-title">
                  Tenure-track Assistant Professor of Biomedical Informatics
                </p>
                <p>
                  Dr. Wang holds secondary appointments in Gynecology &amp;
                  Obstetrics and Radiology &amp; Imaging Sciences at Emory
                  University School of Medicine. Her research develops
                  interpretable computational methods for maternal, placental,
                  fetal, and infant health.
                </p>
                <a href="mailto:yun.wang2@emory.edu">
                  yun.wang2@emory.edu
                </a>
                <Link
                  className="profile-detail-link"
                  href="/people/yun-wang/"
                >
                  View full profile
                </Link>
              </div>
            </article>

            <div className="member-list" aria-label="Lab members">
              {people.map((person) => (
                <article className="member-item" key={person.name}>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                  <span>{person.focus}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section connect-section" id="connect">
          <div className="site-frame">
            <header className="section-heading">
              <p className="section-kicker">Work with us</p>
              <h2>Connect with the lab</h2>
              <p>
                We welcome thoughtful conversations across perinatal imaging,
                maternal–infant health, biomedical informatics, and responsible
                medical AI.
              </p>
            </header>
            <div className="engagement-grid">
              <article className="engagement-card">
                <h3>Collaborate</h3>
                <p>
                  Researchers and clinical partners are invited to share a
                  focused question, dataset, method, or translational idea.
                </p>
                <a
                  className="text-arrow-link"
                  href="mailto:yun.wang2@emory.edu?subject=Collaboration%20inquiry"
                >
                  Start a conversation <span aria-hidden="true">→</span>
                </a>
              </article>
              <article className="engagement-card">
                <h3>Train with us</h3>
                <p>
                  Prospective students and fellows may introduce their
                  background and research interests. Specific opportunities
                  depend on project needs and available funding.
                </p>
                <a
                  className="text-arrow-link"
                  href="mailto:yun.wang2@emory.edu?subject=Prospective%20trainee%20inquiry"
                >
                  Introduce yourself <span aria-hidden="true">→</span>
                </a>
              </article>
              <article className="engagement-card engagement-card-accent">
                <h3>Participate</h3>
                <p>
                  Both maternal–infant R01 studies are recruiting participants.
                  Families can contact the study team for current details.
                </p>
                <a className="text-arrow-link" href="#participate">
                  View recruiting studies <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section news-section" id="news">
          <div className="site-frame">
            <header className="section-heading compact-heading">
              <h2>News archive</h2>
            </header>

            <div className="news-list">
              {news.map((item) => (
                <article className="news-item" key={`${item.date}-${item.title}`}>
                  <time dateTime={item.dateTime}>{item.date}</time>
                  <p>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="site-frame contact-inner">
            <div>
              <h2>Contact</h2>
              <p>
                Research, collaboration, training, and study participation
                inquiries are welcome.
              </p>
            </div>
            <div className="contact-details">
              <a href="mailto:yun.wang2@emory.edu">
                yun.wang2@emory.edu
              </a>
              <p>Emory University School of Medicine · Atlanta, Georgia</p>
              <nav aria-label="External profiles">
                <a
                  href={identityLinks.emory}
                  target="_blank"
                  rel="noreferrer"
                >
                  Emory profile
                </a>
                <a
                  href={identityLinks.orcid}
                  target="_blank"
                  rel="noreferrer"
                >
                  ORCID
                </a>
                <a
                  href={identityLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={identityLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>
        </section>
        </main>
      </div>

      <footer className="site-footer">
        <div className="site-frame">
          <span>© 2026 Nurture Map Lab</span>
          <span>Maternal–Infant Imaging, AI &amp; Neurodevelopment</span>
        </div>
      </footer>
    </>
  );
}

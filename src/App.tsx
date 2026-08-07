import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useLanguage } from './i18n/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Crosshair,
  Eye,
  FileSearch,
  Flame,
  Globe2,
  Hospital,
  Landmark,
  MapPin,
  Menu,
  Network,
  Play,
  Search,
  Shield,
  Siren,
  SlidersHorizontal,
  Target,
  Users,
  Video,
  X,
  Zap,
  Lock,
  Cpu,
  Activity,
  Radio,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  Camera,
  ScanFace,
  Radar,
  Fingerprint,
  Gauge,
  Layers,
  EyeOff,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

// ============ DATA ============
const industries = [
  { name: 'Education', icon: Building2, img: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Healthcare', icon: Hospital, img: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Airports', icon: Globe2, img: 'https://images.pexels.com/photos/1716826/pexels-photo-1716826.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Government', icon: Landmark, img: 'https://images.pexels.com/photos/28589263/pexels-photo-28589263.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Manufacturing', icon: Cpu, img: 'https://images.pexels.com/photos/236709/pexels-photo-236709.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Stadiums', icon: Users, img: 'https://images.pexels.com/photos/24524185/pexels-photo-24524185.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const capabilities: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: 'Real-time facial recognition', detail: 'Identify people of interest as they move through your environment.', icon: Crosshair },
  { title: 'Unknown person detection', detail: 'Know when an unrecognized individual enters a monitored space.', icon: Eye },
  { title: 'Threat classification', detail: 'Prioritize low, medium, high and critical events instantly.', icon: Siren },
  { title: 'Natural language search', detail: 'Ask your security history a question and find the answer.', icon: Search },
  { title: 'Historical timeline', detail: 'Trace activity across time, cameras and locations in seconds.', icon: Clock3 },
  { title: 'Unlimited camera monitoring', detail: 'Bring every camera, alert and profile into one calm interface.', icon: SlidersHorizontal },
  { title: 'Face enrollment', detail: 'Enroll authorized and restricted individuals via webcam or image upload.', icon: UserPlus },
  { title: 'Advanced filters', detail: 'Filter by name, category, date, time, camera and recognition status.', icon: FileSearch },
  { title: 'Scalable infrastructure', detail: 'Deploy across multiple facilities with enterprise-grade architecture.', icon: Network },
  { title: 'Person profile management', detail: 'Manage authorized, restricted, flagged and missing individuals.', icon: Target },
  { title: 'Instant notifications', detail: 'Real-time alerts delivered to the right people the moment it matters.', icon: Bell },
  { title: 'Enterprise ready', detail: 'Built for the standards, accountability and control critical environments demand.', icon: Shield },
];

const howItWorks = [
  { num: '01', icon: Video },
  { num: '02', icon: UserPlus },
  { num: '03', icon: Cpu },
  { num: '04', icon: Bell },
];

const securityFeatures: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: 'Encrypted data', detail: 'All data encrypted in transit and at rest.', icon: Lock },
  { title: 'Role-based access', detail: 'The right information for the right people.', icon: Users },
  { title: 'Audit logs', detail: 'Accountability across every event and action.', icon: FileSearch },
  { title: 'Privacy-first architecture', detail: 'Purpose-built controls for responsible intelligence.', icon: Shield },
  { title: 'Built for compliance', detail: 'Designed to meet enterprise security standards.', icon: Check },
  { title: 'Works with existing cameras', detail: 'Deploy on your current infrastructure.', icon: Video },
];

const comingSoon: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: 'Automatic camera-to-camera tracking', detail: 'Follow a person of interest seamlessly across every camera in your facility.', icon: Radar },
  { title: 'Alert video replay', detail: 'Replay the exact video moment that triggered an alert, instantly.', icon: Play },
  { title: 'Weapon detection', detail: 'Identify firearms and weapons the moment they appear on camera.', icon: AlertTriangle },
  { title: 'Fire & smoke detection', detail: 'Detect fire and smoke early, before it spreads.', icon: Flame },
  { title: 'Person down detection', detail: 'Automatically detect when someone has fallen or is incapacitated.', icon: Activity },
  { title: 'Aggressive behavior detection', detail: 'Identify escalating behavior before it becomes an incident.', icon: Siren },
  { title: 'Complete audit logs', detail: 'Full accountability with tamper-proof audit trails.', icon: FileSearch },
  { title: 'Role-based permissions', detail: 'Granular access control across teams, sites and functions.', icon: Lock },
  { title: 'Risk scoring', detail: 'AI-driven risk assessment for every person and event.', icon: Gauge },
  { title: 'Incident reports', detail: 'Generate detailed incident reports with one click.', icon: FileSearch },
  { title: 'Enterprise API', detail: 'Integrate Bimeon intelligence into your existing systems.', icon: Network },
  { title: 'Camera-to-camera tracking', detail: 'Track movement across your entire facility in real time.', icon: Layers },
];

const platformTabs = [
  { id: 'overview', icon: Eye },
  { id: 'recognition', icon: ScanFace },
  { id: 'alerts', icon: Bell },
  { id: 'search', icon: Search },
  { id: 'enrollment', icon: UserPlus },
];

// ============ HOOKS ============
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useParallax(strength = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * strength));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [strength]);
  return offset;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return progress;
}

function useCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

// ============ APP ============
function App() {
  const { translation: t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSearch, setActiveSearch] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [statsVisible, setStatsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ email: '', organization: '', industry: t.modal.industries[0] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const { error } = await supabase.from('demo_requests').insert({
        email: formData.email,
        organization: formData.organization,
        industry: formData.industry,
      });
      if (error) throw error;
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  const openModal = () => {
    setFormStatus('idle');
    setFormData({ email: '', organization: '', industry: t.modal.industries[0] });
    setDemoOpen(true);
  };

  const closeModal = () => {
    setDemoOpen(false);
    setTimeout(() => setFormStatus('idle'), 300);
  };
  const parallax = useParallax(0.15);
  const scrollProgress = useScrollProgress();

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (demoOpen) return;
    const interval = setInterval(() => {
      setActiveSearch((prev) => (prev + 1) % t.searchExamples.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [demoOpen, t.searchExamples.length]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const camCount = useCounter(24, 1500, statsVisible);
  const eventCount = useCounter(184, 1800, statsVisible);
  const peopleCount = useCounter(1284, 2200, statsVisible);
  const facilityCount = useCounter(12, 1600, statsVisible);

  return (
    <div className="site-shell">
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Bimeon home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>BIMEON</span>
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <button onClick={() => scrollTo('platform')}>{t.nav.platform}</button>
          <button onClick={() => scrollTo('industries')}>{t.nav.industries}</button>
          <button onClick={() => scrollTo('capabilities')}>{t.nav.capabilities}</button>
          <button onClick={() => scrollTo('roadmap')}>{t.nav.roadmap}</button>
          <button onClick={() => scrollTo('security')}>{t.nav.security}</button>
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          <button className="text-button" onClick={() => scrollTo('contact')}>{t.nav.contact}</button>
          <button className="outline-button" onClick={openModal}>{t.nav.bookDemo} <ArrowRight size={15} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        {/* ========== HERO ========== */}
        <section className="hero-section">
          <div className="hero-bg">
            <img
              src="https://images.pexels.com/photos/30692441/pexels-photo-30692441.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Security operations center"
              style={{ transform: `translateY(${parallax}px) scale(1.1)` }}
            />
            <div className="hero-overlay" />
            <div className="hero-grid-lines" />
            <div className="hero-glow" />
          </div>
          <div className="hero-content">
            <Reveal>
              <div className="eyebrow"><span className="pulse-dot" /> {t.hero.eyebrow}</div>
            </Reveal>
            <Reveal delay={100}>
              <h1>{t.hero.title1}<br /><span>{t.hero.title2}</span></h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-lede">{t.hero.lede}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="hero-actions">
                <button className="primary-button" onClick={openModal}>{t.hero.bookDemo} <ArrowRight size={16} /></button>
                <button className="play-button" onClick={openModal}><span className="play-icon"><Play size={13} fill="currentColor" /></span> {t.hero.watchOverview}</button>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="hero-note"><Shield size={14} /> {t.hero.note}</div>
            </Reveal>
          </div>

          {/* Floating live alert badge */}
          <Reveal delay={600}>
            <div className="hero-badge">
              <div className="badge-pulse" />
              <div className="badge-icon"><CircleAlert size={16} /></div>
              <div className="badge-text">
                <small>{t.hero.liveAlert}</small>
                <b>{t.hero.unknownPerson}</b>
                <span>{t.hero.alertLocation}</span>
              </div>
              <span className="badge-level">{t.hero.high}</span>
            </div>
          </Reveal>

          {/* Animated stats */}
          <div className="hero-stats" ref={statsRef}>
            <Reveal delay={500}>
              <div className="stat-bar">
                <div className="stat-item"><Activity size={16} /><div><strong>24/7</strong><span>{t.hero.continuousMonitoring}</span></div></div>
                <div className="stat-item"><Video size={16} /><div><strong>{camCount}</strong><span>{t.hero.activeCameras}</span></div></div>
                <div className="stat-item"><Zap size={16} /><div><strong>{eventCount}</strong><span>{t.hero.eventsToday}</span></div></div>
                <div className="stat-item"><Users size={16} /><div><strong>{peopleCount.toLocaleString()}</strong><span>{t.hero.peopleRecognized}</span></div></div>
                <div className="stat-item"><Building2 size={16} /><div><strong>{facilityCount}</strong><span>{t.hero.facilities}</span></div></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ========== TRUST STRIP ========== */}
        <section className="trust-strip">
          <p>{t.trust.title}</p>
          <div className="trust-logos">
            {['MERIDIAN', 'ATLAS GROUP', 'NORTHGATE', 'VANTAGE', 'SENTINEL', 'BEACON', 'CITADEL'].map((logo) => (
              <span key={logo} className="trust-logo">{logo}</span>
            ))}
          </div>
          <div className="trust-items">
            <span><Shield size={16} /> {t.trust.enterpriseReady}</span>
            <span><Zap size={16} /> {t.trust.realtimeIntelligence}</span>
            <span><Network size={16} /> {t.trust.scalableArchitecture}</span>
            <span><Target size={16} /> {t.trust.criticalEnvironments}</span>
          </div>
        </section>

        {/* ========== PROBLEM ========== */}
        <section className="problem-section section-pad">
          <Reveal>
            <div className="section-kicker">{t.problem.kicker}</div>
            <div className="problem-grid">
              <h2>{t.problem.title1}<br /><span>{t.problem.title2}</span></h2>
              <div className="problem-cards">
                {t.problem.cards.map((card) => {
                  const Icon = card.title === t.problem.cards[0].title ? CircleAlert : card.title === t.problem.cards[1].title ? Clock3 : FileSearch;
                  return (
                    <div className="problem-card" key={card.title}><Icon size={20} /><div><b>{card.title}</b><p>{card.text}</p></div></div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========== BEFORE / AFTER ========== */}
        <section className="comparison-section section-pad">
          <Reveal>
            <div className="section-kicker">{t.comparison.kicker}</div>
            <div className="comparison-heading">
              <h2>{t.comparison.title1}<br /><span>{t.comparison.title2}</span></h2>
            </div>
          </Reveal>
          <div className="comparison-grid">
            <Reveal>
              <div className="compare-card before">
                <div className="compare-label">{t.comparison.without}</div>
                <div className="compare-list">
                  {t.comparison.withoutItems.map((item) => (
                    <div className="compare-item neg" key={item}><X size={16} /><span>{item}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="compare-card after">
                <div className="compare-label accent">{t.comparison.with}</div>
                <div className="compare-list">
                  {t.comparison.withItems.map((item) => (
                    <div className="compare-item pos" key={item}><Check size={16} /><span>{item}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ========== SOLUTION ========== */}
        <section className="solution-section section-pad">
          <Reveal>
            <div className="section-kicker">{t.solution.kicker}</div>
            <div className="solution-heading">
              <h2>{t.solution.title1}<br /><span>{t.solution.title2}</span></h2>
              <p>{t.solution.lede}</p>
            </div>
          </Reveal>
          <div className="solution-grid">
            {t.solution.cards.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="solution-card">
                  <div className="solution-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== PLATFORM WITH INTERACTIVE TABS ========== */}
        <section className="platform-section section-pad" id="platform">
          <Reveal>
            <div className="section-kicker">{t.platform.kicker}</div>
            <div className="platform-heading">
              <h2>{t.platform.title1}<br /><span>{t.platform.title2}</span></h2>
            </div>
          </Reveal>

          {/* Interactive tabs */}
          <Reveal delay={80}>
            <div className="platform-tabs">
              {platformTabs.map((tab) => {
                const Icon = tab.icon;
                const label = t.platform.tabs[tab.id as keyof typeof t.platform.tabs];
                return (
                  <button
                    key={tab.id}
                    className={activeTab === tab.id ? 'active' : ''}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={15} /> {label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Tab content */}
          <Reveal delay={120}>
            <div className="dashboard-mockup">
              <div className="dashboard-frame">
                <div className="dashboard-topbar">
                  <div className="dash-brand"><span className="mini-mark" /><span>BIMEON</span><span className="live-pill"><i />{t.platform.dashboard.live}</span></div>
                  <div className="dash-controls"><span>{t.platform.dashboard.westCampus}</span><Bell size={15} /><span className="dash-avatar">AC</span></div>
                </div>
                <div className="dash-body">
                  <aside className="dash-sidebar">
                    <div className={activeTab === 'overview' ? 'side-active' : ''}><Eye size={14} /> {t.platform.dashboard.sidebar.overview}</div>
                    <div className={activeTab === 'recognition' ? 'side-active' : ''}><ScanFace size={14} /> {t.platform.dashboard.sidebar.recognition}</div>
                    <div className={activeTab === 'alerts' ? 'side-active' : ''}><CircleAlert size={14} /> {t.platform.dashboard.sidebar.alerts} <b className="alert-count">03</b></div>
                    <div className={activeTab === 'search' ? 'side-active' : ''}><Search size={14} /> {t.platform.dashboard.sidebar.search}</div>
                    <div className={activeTab === 'enrollment' ? 'side-active' : ''}><UserPlus size={14} /> {t.platform.dashboard.sidebar.enroll}</div>
                    <div><Video size={14} /> {t.platform.dashboard.sidebar.cameras} <b>24</b></div>
                    <div><Users size={14} /> {t.platform.dashboard.sidebar.people} <b>1.2K</b></div>
                    <div><SlidersHorizontal size={14} /> {t.platform.dashboard.sidebar.settings}</div>
                  </aside>
                  <div className="dash-main">
                    {activeTab === 'overview' && (
                      <>
                        <div className="dash-head"><div><p>{t.platform.dashboard.overview.date}</p><h3>{t.platform.dashboard.overview.greeting}</h3></div><button className="filter-btn"><SlidersHorizontal size={12} /> {t.platform.dashboard.overview.allCameras} <ChevronDown size={12} /></button></div>
                        <div className="dash-metrics">
                          <div className="metric"><span>{t.platform.dashboard.overview.activeCameras}</span><strong>24<small>/24</small></strong><i className="up">+100%</i></div>
                          <div className="metric"><span>{t.platform.dashboard.overview.eventsToday}</span><strong>184</strong><i className="up">+12.4%</i></div>
                          <div className="metric"><span>{t.platform.dashboard.overview.peopleRecognized}</span><strong>1,284</strong><i className="up">+8.1%</i></div>
                        </div>
                        <div className="dash-feeds">
                          <div className="feed-tile">
                            <div className="feed-img"><img src="https://images.pexels.com/photos/1716826/pexels-photo-1716826.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Camera feed" /><div className="feed-scan" /><div className="feed-detection"><span className="det-box" /><span className="det-label">J. Williams<small>{t.platform.dashboard.overview.authorized}</small></span></div><div className="feed-detection d2"><span className="det-box unknown" /><span className="det-label unknown-tag">{t.platform.dashboard.overview.unknown}<small>{t.platform.dashboard.overview.review}</small></span></div></div>
                            <div className="feed-top"><span><i />{t.platform.dashboard.live}</span><b>{t.platform.dashboard.overview.cam04}</b></div>
                            <div className="feed-bottom"><span><MapPin size={10} /> {t.platform.dashboard.overview.northEntry}</span><span>08:42:16</span></div>
                          </div>
                          <div className="feed-tile">
                            <div className="feed-img"><img src="https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Camera feed" /><div className="feed-scan" /></div>
                            <div className="feed-top"><span><i />{t.platform.dashboard.live}</span><b>{t.platform.dashboard.overview.cam12}</b></div>
                            <div className="feed-bottom"><span><MapPin size={10} /> {t.platform.dashboard.overview.adminHall}</span><span>08:41:02</span></div>
                          </div>
                          <div className="feed-tile">
                            <div className="feed-img"><img src="https://images.pexels.com/photos/236709/pexels-photo-236709.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Camera feed" /><div className="feed-scan" /></div>
                            <div className="feed-top"><span><i />{t.platform.dashboard.live}</span><b>{t.platform.dashboard.overview.cam07}</b></div>
                            <div className="feed-bottom"><span><MapPin size={10} /> {t.platform.dashboard.overview.loadingBay}</span><span>08:40:47</span></div>
                          </div>
                          <div className="alert-list">
                            <div className="alert-head"><b>{t.platform.dashboard.overview.priorityEvents}</b><span>{t.platform.dashboard.overview.viewAll} <ArrowRight size={11} /></span></div>
                            <div className="alert-row critical"><span className="alert-ic"><CircleAlert size={13} /></span><div><b>{t.platform.dashboard.overview.unknownDetected}</b><small>{t.platform.dashboard.overview.unknownLoc}</small></div><span className="lvl">{t.platform.dashboard.high}</span></div>
                            <div className="alert-row"><span className="alert-ic soft"><Target size={13} /></span><div><b>{t.platform.dashboard.overview.personRecognized}</b><small>{t.platform.dashboard.overview.personLoc}</small></div><span className="lvl low">{t.platform.dashboard.low}</span></div>
                            <div className="alert-row"><span className="alert-ic soft"><Check size={13} /></span><div><b>{t.platform.dashboard.overview.restrictedEntered}</b><small>{t.platform.dashboard.overview.restrictedLoc}</small></div><span className="lvl med">{t.platform.dashboard.med}</span></div>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'recognition' && (
                      <>
                        <div className="dash-head"><div><p>{t.platform.dashboard.recognition.title}</p><h3>{t.platform.dashboard.recognition.subtitle}</h3></div><button className="filter-btn"><SlidersHorizontal size={12} /> {t.platform.dashboard.recognition.allPeople} <ChevronDown size={12} /></button></div>
                        <div className="recognition-view">
                          <div className="recog-feed">
                            <img src="https://images.pexels.com/photos/1716826/pexels-photo-1716826.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Camera" />
                            <div className="feed-scan" />
                            <div className="recog-box">
                              <span className="det-box big" />
                              <div className="recog-info">
                                <div className="recog-name">J. Williams</div>
                                <div className="recog-status auth">{t.platform.dashboard.recognition.authorized}</div>
                                <div className="recog-meta">{t.platform.dashboard.recognition.match}</div>
                              </div>
                            </div>
                          </div>
                          <div className="recog-side">
                            <div className="recog-head"><b>{t.platform.dashboard.recognition.recentMatches}</b><span>{t.platform.dashboard.recognition.live}</span></div>
                            <div className="recog-match"><div className="recog-avatar">JW</div><div><b>J. Williams</b><small>{t.platform.dashboard.recognition.authLabel} · 98.7%</small></div><Check size={14} /></div>
                            <div className="recog-match"><div className="recog-avatar warn">?</div><div><b>{t.platform.dashboard.overview.unknown}</b><small>{t.platform.dashboard.recognition.reviewLabel}</small></div><CircleAlert size={14} /></div>
                            <div className="recog-match"><div className="recog-avatar">MR</div><div><b>M. Rodriguez</b><small>{t.platform.dashboard.recognition.authLabel} · 96.2%</small></div><Check size={14} /></div>
                            <div className="recog-match"><div className="recog-avatar danger">RS</div><div><b>R. Smith</b><small>{t.platform.dashboard.recognition.restrictedLabel} · 94.1%</small></div><Siren size={14} /></div>
                            <div className="recog-match"><div className="recog-avatar">LK</div><div><b>L. Kim</b><small>{t.platform.dashboard.recognition.authLabel} · 97.8%</small></div><Check size={14} /></div>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'alerts' && (
                      <>
                        <div className="dash-head"><div><p>{t.platform.dashboard.alerts.title}</p><h3>{t.platform.dashboard.alerts.subtitle}</h3></div><button className="filter-btn"><SlidersHorizontal size={12} /> {t.platform.dashboard.alerts.allSeverity} <ChevronDown size={12} /></button></div>
                        <div className="alerts-view">
                          <div className="alert-big critical">
                            <div className="alert-big-icon"><CircleAlert size={22} /></div>
                            <div className="alert-big-content"><div className="alert-big-tag">{t.platform.dashboard.alerts.highPriority}</div><b>{t.platform.dashboard.alerts.unknownDetected}</b><small>{t.platform.dashboard.alerts.unknownLoc}</small></div>
                            <span className="lvl">{t.platform.dashboard.high}</span>
                          </div>
                          <div className="alert-big">
                            <div className="alert-big-icon soft"><Siren size={22} /></div>
                            <div className="alert-big-content"><div className="alert-big-tag">{t.platform.dashboard.alerts.restricted}</div><b>{t.platform.dashboard.alerts.restrictedDesc}</b><small>{t.platform.dashboard.alerts.restrictedLoc}</small></div>
                            <span className="lvl med">{t.platform.dashboard.med}</span>
                          </div>
                          <div className="alert-big">
                            <div className="alert-big-icon soft"><Target size={22} /></div>
                            <div className="alert-big-content"><div className="alert-big-tag">{t.platform.dashboard.alerts.recognized}</div><b>{t.platform.dashboard.alerts.recognizedDesc}</b><small>{t.platform.dashboard.alerts.recognizedLoc}</small></div>
                            <span className="lvl low">{t.platform.dashboard.low}</span>
                          </div>
                          <div className="alert-big">
                            <div className="alert-big-icon soft"><Check size={22} /></div>
                            <div className="alert-big-content"><div className="alert-big-tag">{t.platform.dashboard.alerts.authorized}</div><b>{t.platform.dashboard.alerts.authorizedDesc}</b><small>{t.platform.dashboard.alerts.authorizedLoc}</small></div>
                            <span className="lvl low">{t.platform.dashboard.low}</span>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'search' && (
                      <>
                        <div className="dash-head"><div><p>{t.platform.dashboard.search.title}</p><h3>{t.platform.dashboard.search.subtitle}</h3></div></div>
                        <div className="search-view">
                          <div className="search-bar-big">
                            <Search size={18} />
                            <div className="search-rotator-big">
                              {t.searchExamples.map((ex, i) => (
                                <span key={ex} className={i === activeSearch ? 'active' : ''}>{ex}</span>
                              ))}
                            </div>
                            <button className="search-go"><ArrowRight size={16} /></button>
                          </div>
                          <div className="search-results">
                            <div className="search-results-head"><b>{t.platform.dashboard.search.results}</b><span>{t.platform.dashboard.search.eventsFound}</span></div>
                            <div className="search-result-row"><Clock3 size={14} /><div><b>{t.platform.dashboard.search.result1Desc}</b><small>{t.platform.dashboard.search.result1Loc}</small></div><span className="lvl med">{t.platform.dashboard.med}</span></div>
                            <div className="search-result-row"><Eye size={14} /><div><b>{t.platform.dashboard.search.result2Desc}</b><small>{t.platform.dashboard.search.result2Loc}</small></div><span className="lvl">{t.platform.dashboard.high}</span></div>
                            <div className="search-result-row"><Target size={14} /><div><b>{t.platform.dashboard.search.result3Desc}</b><small>{t.platform.dashboard.search.result3Loc}</small></div><span className="lvl med">{t.platform.dashboard.med}</span></div>
                            <div className="search-result-row"><Check size={14} /><div><b>{t.platform.dashboard.search.result4Desc}</b><small>{t.platform.dashboard.search.result4Loc}</small></div><span className="lvl low">{t.platform.dashboard.low}</span></div>
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab === 'enrollment' && (
                      <>
                        <div className="dash-head"><div><p>{t.platform.dashboard.enrollment.title}</p><h3>{t.platform.dashboard.enrollment.subtitle}</h3></div><button className="filter-btn"><Camera size={12} /> {t.platform.dashboard.enrollment.webcam} <ChevronDown size={12} /></button></div>
                        <div className="enroll-view">
                          <div className="enroll-camera">
                            <div className="enroll-placeholder">
                              <Camera size={40} />
                              <b>{t.platform.dashboard.enrollment.webcamReady}</b>
                              <small>{t.platform.dashboard.enrollment.positionFace}</small>
                            </div>
                            <div className="enroll-frame" />
                          </div>
                          <div className="enroll-form">
                            <div className="enroll-field"><label>{t.platform.dashboard.enrollment.name}</label><div className="enroll-input">{t.platform.dashboard.enrollment.nameValue}</div></div>
                            <div className="enroll-field"><label>{t.platform.dashboard.enrollment.category}</label><div className="enroll-select">{t.platform.dashboard.enrollment.categoryValue} <ChevronDown size={14} /></div></div>
                            <div className="enroll-field"><label>{t.platform.dashboard.enrollment.threatLevel}</label><div className="enroll-select">{t.platform.dashboard.enrollment.threatValue} <ChevronDown size={14} /></div></div>
                            <div className="enroll-field"><label>{t.platform.dashboard.enrollment.notes}</label><div className="enroll-input">{t.platform.dashboard.enrollment.notesValue}</div></div>
                            <button className="enroll-btn"><UserPlus size={16} /> {t.platform.dashboard.enrollment.button}</button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Feature highlights with images */}
          <div className="platform-features">
            <Reveal>
              <div className="pf-card pf-large">
                <div className="pf-img"><img src="https://images.pexels.com/photos/29866272/pexels-photo-29866272.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Security camera" /></div>
                <div className="pf-content"><div className="pf-tag">{t.platform.features.recognitionTag}</div><h3>{t.platform.features.recognitionTitle}</h3><p>{t.platform.features.recognitionText}</p><button className="inline-link" onClick={openModal}>{t.platform.features.learnMore} <ArrowRight size={15} /></button></div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="pf-card">
                <div className="pf-img"><img src="https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Infrastructure" /></div>
                <div className="pf-content"><div className="pf-tag">{t.platform.features.alertsTag}</div><h3>{t.platform.features.alertsTitle}</h3><p>{t.platform.features.alertsText}</p></div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="pf-card">
                <div className="pf-img"><img src="https://images.pexels.com/photos/19317897/pexels-photo-19317897.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Control room" /></div>
                <div className="pf-content"><div className="pf-tag">{t.platform.features.searchTag}</div><h3>{t.platform.features.searchTitle}</h3><p>{t.platform.features.searchText}</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ========== CAPABILITIES ========== */}
        <section className="capabilities-section section-pad" id="capabilities">
          <Reveal>
            <div className="section-kicker">{t.capabilities.kicker}</div>
            <div className="capabilities-heading">
              <h2>{t.capabilities.title1}<br /><span>{t.capabilities.title2}</span></h2>
              <p>{t.capabilities.lede}</p>
            </div>
          </Reveal>
          <div className="capability-grid">
            {t.capabilities.items.map(({ title, detail, icon: Icon }, i) => (
              <Reveal key={title} delay={(i % 4) * 60}>
                <div className="capability">
                  <div className="capability-icon"><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== INDUSTRIES ========== */}
        <section className="industries-section section-pad" id="industries">
          <Reveal>
            <div className="section-kicker">{t.industries.kicker}</div>
            <div className="industries-heading">
              <h2>{t.industries.title1}<br /><span>{t.industries.title2}</span></h2>
              <p>{t.industries.lede}</p>
            </div>
          </Reveal>
          <div className="industry-grid">
            {industries.map(({ name, icon: Icon, img }, i) => (
              <Reveal key={name} delay={(i % 3) * 80}>
                <button className="industry-card" onClick={openModal}>
                  <div className="industry-img"><img src={img} alt={name} /><div className="industry-overlay" /></div>
                  <div className="industry-body">
                    <Icon size={22} strokeWidth={1.5} />
                    <h3>{name}</h3>
                    <p>{t.industries.items[i].text}</p>
                    <span className="industry-link">{t.industries.learnMore} <ArrowUpRight size={14} /></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="howitworks-section section-pad">
          <Reveal>
            <div className="section-kicker">{t.howItWorks.kicker}</div>
            <div className="howitworks-heading">
              <h2>{t.howItWorks.title}</h2>
            </div>
          </Reveal>
          <div className="howitworks-grid">
            {howItWorks.map(({ num, icon: Icon }, i) => (
              <Reveal key={num} delay={i * 100}>
                <div className="step-card">
                  <div className="step-num">{num}</div>
                  <div className="step-icon"><Icon size={22} /></div>
                  <h3>{t.howItWorks.steps[i].title}</h3>
                  <p>{t.howItWorks.steps[i].text}</p>
                  {i < howItWorks.length - 1 && <div className="step-connector"><ArrowRight size={16} /></div>}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== ENTERPRISE BENEFITS ========== */}
        <section className="benefits-section section-pad">
          <Reveal>
            <div className="section-kicker">{t.benefits.kicker}</div>
            <div className="benefits-grid">
              <div className="benefits-left">
                <h2>{t.benefits.title1}<br /><span>{t.benefits.title2}</span></h2>
                <p>{t.benefits.lede}</p>
                <button className="outline-button" onClick={openModal}>{t.benefits.bookDemo} <ArrowRight size={15} /></button>
              </div>
              <div className="benefits-list">
                {t.benefits.items.map((b, i) => (
                  <Reveal key={b} delay={i * 50}>
                    <div className="benefit-item"><Check size={18} /><span>{b}</span></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========== COMING SOON / ROADMAP ========== */}
        <section className="roadmap-section section-pad" id="roadmap">
          <Reveal>
            <div className="section-kicker">{t.roadmap.kicker}</div>
            <div className="roadmap-heading">
              <h2>{t.roadmap.title}</h2>
              <p>{t.roadmap.lede}</p>
            </div>
          </Reveal>
          <div className="roadmap-grid">
            {comingSoon.map(({ title, detail, icon: Icon }, i) => (
              <Reveal key={title} delay={(i % 4) * 60}>
                <div className="roadmap-card">
                  <div className="roadmap-badge">{t.roadmap.soon}</div>
                  <div className="capability-icon"><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== SECURITY ========== */}
        <section className="security-section section-pad" id="security">
          <Reveal>
            <div className="section-kicker">{t.security.kicker}</div>
            <div className="security-heading">
              <h2>{t.security.title1}<br /><span>{t.security.title2}</span></h2>
              <p>{t.security.lede}</p>
            </div>
          </Reveal>
          <div className="security-grid">
            {securityFeatures.map(({ title, detail, icon: Icon }, i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <div className="security-card">
                  <div className="security-icon"><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="final-cta section-pad" id="contact">
          <div className="cta-bg">
            <img src="https://images.pexels.com/photos/8380659/pexels-photo-8380659.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" style={{ transform: `translateY(${parallax * 0.5}px) scale(1.1)` }} />
            <div className="cta-overlay" />
          </div>
          <div className="cta-content">
            <Reveal>
              <div className="section-kicker">{t.finalCta.kicker}</div>
              <h2>{t.finalCta.title1}<br /><span>{t.finalCta.title2}</span></h2>
              <p>{t.finalCta.lede}</p>
              <button className="primary-button" onClick={openModal}>{t.finalCta.bookDemo} <ArrowRight size={16} /></button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <button className="brand" onClick={() => scrollTo('top')}><span className="brand-mark"><span /><span /><span /></span><span>BIMEON</span></button>
            <p>{t.footer.tagline1}<br />{t.footer.tagline2}</p>
          </div>
          <div className="footer-links">
            <div><b>{t.footer.explore}</b><button onClick={() => scrollTo('platform')}>{t.nav.platform}</button><button onClick={() => scrollTo('industries')}>{t.nav.industries}</button><button onClick={() => scrollTo('capabilities')}>{t.nav.capabilities}</button><button onClick={() => scrollTo('roadmap')}>{t.nav.roadmap}</button><button onClick={() => scrollTo('security')}>{t.nav.security}</button></div>
            <div><b>{t.footer.company}</b><button onClick={() => scrollTo('contact')}>{t.footer.contact}</button><button onClick={openModal}>{t.footer.requestDemo}</button><button>{t.footer.privacyPolicy}</button><button>{t.footer.terms}</button></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.domain}</span>
        </div>
      </footer>

      {/* ========== DEMO MODAL ========== */}
      {demoOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><X size={18} /></button>

            {formStatus === 'success' ? (
              <div className="demo-success">
                <div className="success-icon"><Check size={36} /></div>
                <h2>{t.modal.successTitle}</h2>
                <p>{t.modal.successText}</p>
                <button className="primary-button" onClick={closeModal}>{t.modal.done}</button>
              </div>
            ) : (
              <>
                <div className="section-kicker">{t.modal.kicker}</div>
                <h2>{t.modal.title1}<br /><span>{t.modal.title2}</span></h2>
                <p>{t.modal.lede}</p>
                <form onSubmit={handleSubmit}>
                  <label>{t.modal.workEmail}
                    <input
                      type="email"
                      placeholder={t.modal.emailPlaceholder}
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </label>
                  <label>{t.modal.organization}
                    <input
                      type="text"
                      placeholder={t.modal.orgPlaceholder}
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </label>
                  <label>{t.modal.industry}
                    <select
                      className="enroll-select-wide"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      {t.modal.industries.map((ind) => (
                        <option key={ind}>{ind}</option>
                      ))}
                    </select>
                  </label>
                  {formStatus === 'error' && (
                    <div className="form-error">{t.modal.error}</div>
                  )}
                  <button className="primary-button" type="submit" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? t.modal.submitting : t.modal.requestDemo}
                    {formStatus !== 'submitting' && <ArrowRight size={16} />}
                  </button>
                </form>
                <small>{t.modal.bySubmitting}</small>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

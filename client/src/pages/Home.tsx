/* Design: Evidence & Warmth — keep the page calm, editorial, precise, and human; every CTA must explain its next step. */
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleArrowRight,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FlaskConical,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const assets = {
  mark: "/manus-storage/dahua-mark_0995cfa5.png",
  hero: "/manus-storage/dahua-hero-lab_988c4a13.jpg",
  interior: "/manus-storage/dahua-clinic-interior_34f2aff3.jpg",
  specimen: "/manus-storage/dahua-specimen-detail_631410cc.jpg",
  education: "/manus-storage/dahua-health-education_c9a22efd.jpg",
  clinicFront: "/manus-storage/dhlp1_59441b65.webp",
  clinicStreet: "/manus-storage/dhlp2_a55b5e97.webp",
  clinicDesk: "/manus-storage/dhlp3_2370cfb6.webp",
  clinicLab: "/manus-storage/dhlp4_a501f01d.webp",
  articleCover: "/manus-storage/card1_cover_7379907f.jpg",
};

type Package = {
  code: string;
  name: string;
  category: "一般健檢" | "專項檢驗";
  description: string;
  items: string[];
  icon: string;
};

const packages: Package[] = [
  { code: "DH1", name: "新生活健康檢查", category: "一般健檢", description: "適合首次健檢或年度例行篩檢，從血液、尿液到肝腎功能建立基礎健康輪廓。", items: ["血液常規、尿液常規", "肝膽與腎功能", "血糖、血脂與痛風", "胰臟與心肌酵素"], icon: "01" },
  { code: "DH2", name: "幸福型健康檢查", category: "一般健檢", description: "在基礎檢查上補充心血管硬化指數、肝癌篩檢與糖化血色素。", items: ["包含 DH1 全部項目", "血管硬化指數", "肝癌篩檢 AFP", "糖化血色素 HbA1c"], icon: "02" },
  { code: "DH3", name: "精緻型健康檢查", category: "一般健檢", description: "進一步觀察肝炎、甲狀腺、類風濕與發炎相關指標。", items: ["包含 DH2 全部項目", "B 型、C 型肝炎", "甲狀腺功能", "類風濕與 hsCRP"], icon: "03" },
  { code: "DH5", name: "尊榮型健康檢查", category: "一般健檢", description: "更完整的全方位方案，適合希望一次整理多項健康線索的你。", items: ["包含 DH3 全部項目", "胃幽門桿菌", "過敏體質與荷爾蒙", "腫瘤標記篩檢"], icon: "04" },
  { code: "DHA", name: "菁英型健康檢查", category: "一般健檢", description: "聚焦心血管與代謝狀態，加入胰島素阻抗、骨質與營養相關指標。", items: ["心血管風險指標", "胰島素阻抗", "維生素 D、Ferritin", "發炎與自體免疫指標"], icon: "05" },
  { code: "DH12", name: "抗衰老健康檢查", category: "一般健檢", description: "以基礎健檢為底，延伸觀察荷爾蒙與身體老化相關指標。", items: ["包含基礎檢查", "雄性與雌性激素", "DHEA-S", "甲狀腺與 SHBG"], icon: "06" },
  { code: "DH6", name: "婚前甜蜜健康檢查", category: "專項檢驗", description: "為準新人整理血液、傳染病、血型與個別需求的檢查組合。", items: ["地中海型貧血評估", "B 型、C 型肝炎", "梅毒、HIV", "血型與族群專屬項目"], icon: "07" },
  { code: "DH7", name: "防癌健康檢查", category: "專項檢驗", description: "依不同需求整理腫瘤標記與相關篩檢項目，先從諮詢開始。", items: ["男性專屬項目", "女性專屬項目", "腫瘤標記組合", "由專業人員說明適用性"], icon: "08" },
  { code: "DH8", name: "肝臟組合檢查", category: "專項檢驗", description: "針對肝炎病毒、肝功能與肝癌標記做較完整的整理。", items: ["肝膽功能", "B 型、C 型肝炎", "肝癌篩檢 AFP", "A 型肝炎抗體"], icon: "09" },
  { code: "DH9", name: "性病組合檢查", category: "專項檢驗", description: "提供私密且有條理的性傳染病篩檢諮詢與檢驗選擇。", items: ["梅毒與 HIV", "疱疹、披衣菌", "淋病相關檢查", "尿液常規"], icon: "10" },
  { code: "DH10", name: "好孕連連組合檢查", category: "專項檢驗", description: "備孕前的男女生育力與相關指標整理，從需求討論開始。", items: ["男性精液與睪固酮", "女性 FSH、LH", "泌乳激素與甲狀腺", "抗穆勒氏管荷爾蒙"], icon: "11" },
];

const geneTests = [
  ["全基因圖譜掃描", "涵蓋疾病與癌症風險相關基因"],
  ["癌症預防基因檢測", "依男性／女性方案提供評估"],
  ["慢性病預防基因檢測", "觀察慢性病相關體質線索"],
  ["心血管疾病預防基因", "整理心血管相關遺傳風險"],
  ["兒童天生潛能基因", "提供成長與學習方向參考"],
  ["體重管理基因", "了解代謝與體重管理線索"],
  ["逆齡美妍基因", "觀察肌膚與修護相關因子"],
  ["喚時淨白基因", "整理環境與肌膚相關指標"],
];

const articles = [
  { slug: "mineral-iron-calcium", category: "礦物質科普", title: "鐵與鈣：從日常檢驗讀懂身體線索", summary: "用容易理解的方式認識鐵與鈣在身體中的角色，以及檢驗數字可以如何協助日常判讀。", tags: ["鐵質", "鈣質", "血液檢驗"], cover: assets.specimen, body: ["鐵與鈣都是日常健康討論中常出現的礦物質，但真正有意義的理解，應該回到飲食、生活狀況與檢驗指標一起看。", "衛教內容可以協助你建立問題清單，實際檢驗結果仍應交由醫事人員依個人情況說明。", "如果你不確定該從哪一項開始，可以先透過預約諮詢，把想了解的狀況告訴我們。"] },
  { slug: "active-calcium", category: "營養補充", title: "鈣質與日常生活：先理解，再選擇", summary: "整理鈣質、骨骼與日常飲食的基礎觀念，避免只看單一產品或單一數字。", tags: ["鈣質", "骨骼", "生活"], cover: assets.education, body: ["鈣質的討論不只關於補充，也包括日常飲食、活動量與整體健康狀態。", "若有特殊生理狀況、用藥或長期不適，應先向合適的醫療專業人員詢問，再決定下一步。"] },
  { slug: "pet-health", category: "寵物保健", title: "毛孩的關節與日常營養觀察", summary: "從生活習慣與活動狀態出發，建立毛孩健康觀察筆記。", tags: ["寵物", "關節", "觀察"], cover: assets.interior, body: ["寵物的活動量、步態與食慾變化，都可以成為日常照護時值得記錄的線索。", "本篇提供一般觀察方向，不取代獸醫診斷；若出現明顯異常，請儘早尋求獸醫協助。"] },
  { slug: "iron-deficiency", category: "血液檢驗", title: "缺鐵性貧血：檢驗指標與飲食問題清單", summary: "認識 Ferritin 等常見名詞，帶著更好的問題與專業人員討論。", tags: ["貧血", "Ferritin", "血液檢查"], cover: assets.clinicLab, body: ["疲倦或注意力下降可能有很多原因，不能只靠單一症狀判斷是否缺鐵。", "Ferritin 等指標需要搭配完整檢驗與個人狀況判讀；如果你有疑問，可以在諮詢時把症狀、飲食與過往檢查一起提出。"] },
  { slug: "vitamin-d", category: "營養補充", title: "維生素 D：從檢測結果開始理解", summary: "了解 25-OH-D 常見名詞與檢測結果在健康管理中的位置。", tags: ["維生素 D", "檢測", "日常"], cover: assets.clinicFront, body: ["維生素 D 常被放在免疫、骨骼與生活型態的討論中，但解讀仍要回到檢測方法與個人狀況。", "任何補充決策都不應只依據網路文章；若有長期用藥或特殊狀況，請先詢問醫療專業人員。"] },
  { slug: "sleep-quality", category: "睡眠與神經", title: "睡眠品質：先留下可觀察的線索", summary: "用睡眠時間、夜間醒來與生活節奏建立自己的觀察記錄。", tags: ["睡眠", "神經", "生活"], cover: assets.clinicDesk, body: ["睡眠品質會受到生活節奏、壓力、環境與身體狀態共同影響。", "與其只追求單一營養素，不如先記錄一至兩週的睡眠狀況，再帶著具體資訊與專業人員討論。"] },
];

function SectionLabel({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: string; intro: string }) {
  return (
    <div className="section-heading">
      <div className="section-index"><span>{index}</span><i /></div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-intro">{intro}</p>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand${compact ? " brand-compact" : ""}`}>
      <img src={assets.mark} alt="大華醫事檢驗所標誌" />
      <span><strong>大華醫事檢驗所</strong><small>DAHUA MEDICAL LABORATORY</small></span>
    </Link>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  const anchor = (id: string) => path === "/" ? `#${id}` : `/#${id}`;
  const close = () => setOpen(false);
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Brand />
        <button className="menu-button" type="button" aria-label={open ? "關閉選單" : "開啟選單"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="main-navigation" className={`main-navigation${open ? " is-open" : ""}`}>
          <a href={anchor("services")} onClick={close}>服務內容</a>
          <a href={anchor("packages")} onClick={close}>檢驗方案</a>
          <Link href="/health-education" onClick={close}>衛教知識</Link>
          <a className="nav-cta" href={anchor("booking")} onClick={close}>預約諮詢 <ArrowRight size={15} /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const stats = useMemo(() => [
    [String(packages.length), "可諮詢檢驗方案"],
    [String(geneTests.length), "基因檢測方向"],
    ["224", "過敏原檢測項目"],
  ], []);
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="pulse-dot" /> CHANGHUA · EVIDENCE-LED CARE</div>
          <h1>先理解身體，<em>再決定下一步。</em></h1>
          <p className="hero-lede">大華醫事檢驗所用清楚的檢驗資訊、專業的說明與可以被理解的健康內容，陪你把每一次檢查變成更有方向的照護。</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#packages">探索檢驗方案 <ArrowRight size={16} /></a>
            <a className="button button-quiet" href="#booking">預約諮詢 <CircleArrowRight size={16} /></a>
          </div>
          <div className="hero-stats">
            {stats.map(([number, label]) => <div className="hero-stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img src={assets.hero} alt="現代醫事檢驗所中的精密檢測設備" /></div>
          <div className="hero-note"><span>01 / PRECISION</span><strong>每一個數字，都值得好好解釋。</strong><small>從檢驗選擇到結果理解，讓專業回到人的身上。</small></div>
          <div className="hero-stamp"><Microscope size={18} /><span>LAB<br />QUALITY</span></div>
        </div>
      </div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}

function Services() {
  const cards = [
    { icon: <ClipboardCheck />, label: "01", title: "健康檢查", desc: "從基礎篩檢到完整健康評估，依照你的年齡、生活與關心的問題開始。" },
    { icon: <FlaskConical />, label: "02", title: "專項檢驗", desc: "過敏原、營養素、婚前與其他專項需求，先諮詢再選擇適合的組合。" },
    { icon: <Activity />, label: "03", title: "基因檢測", desc: "把遺傳風險放回完整脈絡理解，作為健康管理與專業討論的參考。" },
  ];
  return (
    <section className="services-section" id="services">
      <div className="content-shell">
        <SectionLabel index="01" eyebrow="WHAT WE DO" title="讓檢驗變成可以理解的照護" intro="我們不只提供項目清單，也在你做選擇之前，把目的、適用情境與下一步說清楚。" />
        <div className="service-grid">
          {cards.map((card) => <article className="service-card" key={card.label}><div className="card-topline"><span>{card.label}</span><div className="service-icon">{card.icon}</div></div><h3>{card.title}</h3><p>{card.desc}</p><a href="#booking">了解如何開始 <ArrowRight size={15} /></a></article>)}
        </div>
        <div className="trust-strip"><div className="trust-photo"><img src={assets.interior} alt="明亮整潔的醫事檢驗所空間" /></div><div className="trust-copy"><p className="eyebrow">A PLACE TO ASK</p><h3>不確定從哪裡開始，<br /><em>先問一個問題就好。</em></h3><p>我們將檢驗選擇留在專業對話裡，不用先猜價格、不用先理解所有名詞，也不用為了預約建立會員。</p><a href="#booking" className="text-link">與我們討論你的需求 <ArrowRight size={16} /></a></div></div>
      </div>
    </section>
  );
}

function PackageCard({ item, expanded, onToggle }: { item: Package; expanded: boolean; onToggle: () => void }) {
  return <article className={`package-card${expanded ? " is-expanded" : ""}`}><button type="button" className="package-trigger" aria-expanded={expanded} onClick={onToggle}><span className="package-number">{item.icon}</span><span className="package-code">{item.code}</span><span className="package-name">{item.name}</span><ChevronDown size={19} className="package-chevron" /></button><p>{item.description}</p><div className="package-details">{item.items.map((detail) => <span key={detail}><Check size={14} />{detail}</span>)}<a href="#booking">詢問這個方案 <ArrowRight size={14} /></a></div></article>;
}

function Packages() {
  const [filter, setFilter] = useState<Package["category"]>("一般健檢");
  const [expanded, setExpanded] = useState("DH2");
  const filtered = packages.filter((item) => item.category === filter);
  return <section className="packages-section" id="packages"><div className="content-shell"><SectionLabel index="02" eyebrow="CHECKUP PACKAGES" title="從你的問題開始選方案" intro="每一套方案都有不同的觀察範圍。先瀏覽，再把真正關心的事帶進諮詢。" /><div className="package-toolbar"><div className="filter-tabs" role="tablist">{(["一般健檢", "專項檢驗"] as const).map((value) => <button key={value} type="button" role="tab" aria-selected={filter === value} className={filter === value ? "active" : ""} onClick={() => { setFilter(value); setExpanded(value === "一般健檢" ? "DH2" : "DH6"); }}>{value}</button>)}</div><span className="package-count">{filtered.length} 個方案可諮詢</span></div><div className="package-list">{filtered.map((item) => <PackageCard key={item.code} item={item} expanded={expanded === item.code} onToggle={() => setExpanded(expanded === item.code ? "" : item.code)} />)}</div><div className="package-disclaimer"><ShieldCheck size={18} /><p>檢驗方案需要依個人狀況判斷適用性。網站內容提供一般資訊，實際選擇請與專業人員討論。</p></div></div></section>;
}

function GeneSection() {
  return <section className="gene-section"><div className="content-shell gene-grid"><div className="gene-image"><img src={assets.clinicLab} alt="明亮的醫事檢驗所工作空間" /><span className="image-caption">03 / GENETIC INSIGHT</span></div><div className="gene-copy"><p className="eyebrow">GENETIC TESTING</p><h2>把先天線索，放回完整的生活脈絡。</h2><p>基因檢測提供的是一組參考線索，不是命運的答案。了解檢測目的、適用範圍與結果限制，再決定是否需要進一步諮詢。</p><div className="gene-list">{geneTests.map(([name, desc], index) => <div className="gene-item" key={name}><span>0{index + 1}</span><div><strong>{name}</strong><small>{desc}</small></div><ArrowRight size={15} /></div>)}</div><a href="#booking" className="button button-primary">詢問基因檢測 <ArrowRight size={16} /></a></div></div></section>;
}

function EducationSection() {
  return <section className="education-section" id="education"><div className="content-shell"><SectionLabel index="04" eyebrow="HEALTH EDUCATION" title="先讀懂，再做選擇" intro="把常見健康名詞寫得清楚一點，讓你在下一次和專業人員對話時，有更好的問題。" /><div className="education-feature"><div className="education-image"><img src={assets.education} alt="衛教筆記與生活觀察物件" /></div><div className="education-feature-copy"><span className="article-kicker">FEATURED NOTE / {articles[0].category}</span><h3>{articles[0].title}</h3><p>{articles[0].summary}</p><Link href={`/health-education/${articles[0].slug}`} className="text-link">閱讀完整內容 <ArrowRight size={16} /></Link></div></div><div className="article-grid">{articles.slice(1, 4).map((article) => <Link href={`/health-education/${article.slug}`} className="article-card" key={article.slug}><div className="article-card-top"><span>{article.category}</span><ArrowRight size={16} /></div><h3>{article.title}</h3><p>{article.summary}</p><div className="article-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></Link>)}</div><div className="education-footer"><Link href="/health-education" className="button button-outline">瀏覽全部衛教 <ArrowRight size={16} /></Link><span>共 {articles.length} 篇可閱讀內容</span></div></div></section>;
}

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", package: "", note: "" });
  const [stage, setStage] = useState<"idle" | "ready" | "fallback">("idle");
  const lineUrl = "https://line.me/R/oaMessage/@932cczax/?text=";
  const message = `【大華醫事檢驗所 預約諮詢】\n姓名：${form.name}\n電話：${form.phone}\n諮詢方案：${form.package}\n備註：${form.note}`;
  const openLine = () => { const popup = window.open(`${lineUrl}${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); setStage(popup ? "ready" : "fallback"); };
  const copyMessage = async () => { await navigator.clipboard?.writeText(message); setStage("ready"); };
  return <section className="booking-section" id="booking"><div className="content-shell booking-grid"><div className="booking-copy"><p className="eyebrow">05 / CONTACT & BOOKING</p><h2>把你的問題，<em>帶來聊聊。</em></h2><p>不用註冊，不用先猜方案。留下基本聯絡方式與想了解的方向，我們會把內容整理進 LINE 對話，請你確認後再按下傳送。</p><div className="contact-lines"><a href="tel:047616801"><Phone size={17} /><span><small>諮詢專線</small>04-7616801</span></a><a href="https://maps.google.com/?q=彰化市崙平南路532號" target="_blank" rel="noreferrer"><MapPin size={17} /><span><small>地址</small>彰化市崙平南路 532 號</span></a><a href="https://line.me/ti/p/@932cczax" target="_blank" rel="noreferrer"><MessageCircle size={17} /><span><small>LINE 官方帳號</small>@932cczax</span></a></div></div><div className="booking-card">{stage === "idle" || stage === "fallback" ? <form onSubmit={(event) => { event.preventDefault(); openLine(); }}><div className="form-header"><span>CONSULTATION FORM</span><small>01 — 先留下想了解的事</small></div><div className="form-row"><label>你的稱呼<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="姓名或單位名稱" autoComplete="name" /></label><label>聯絡電話<input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="方便聯絡的電話" autoComplete="tel" /></label></div><label>想了解的方案<select required value={form.package} onChange={(event) => setForm({ ...form, package: event.target.value })}><option value="">請選擇一個方向</option>{packages.map((item) => <option value={item.code + " " + item.name} key={item.code}>{item.code}｜{item.name}</option>)}<option value="其他 / 不確定">其他／不確定</option></select></label><label>想先問的事情<textarea required value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="例如：想了解適合我的健檢方向……" rows={4} /></label><button className="button button-primary form-submit" type="submit">{stage === "fallback" ? "重新開啟 LINE" : "整理內容並開啟 LINE"}<ArrowRight size={16} /></button>{stage === "fallback" && <div className="fallback-note"><strong>LINE 沒有自動開啟。</strong><span>可以改用複製內容，再貼到 LINE 官方帳號。</span><button type="button" onClick={copyMessage}><Copy size={14} />複製預約內容</button></div>}</form> : <div className="booking-success"><div className="success-mark"><Check /></div><p className="eyebrow">MESSAGE READY</p><h3>內容已準備好。</h3><p>LINE 對話已開啟的話，請確認內容後按下傳送；只有完成這一步，我們才會收到你的訊息。</p><div><button className="button button-primary" type="button" onClick={openLine}>重新開啟 LINE <ExternalLink size={15} /></button><button className="button button-quiet" type="button" onClick={copyMessage}><Copy size={15} />複製內容</button></div><button className="reset-link" type="button" onClick={() => { setStage("idle"); setForm({ name: "", phone: "", package: "", note: "" }); }}>重新填寫</button></div>}</div></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="content-shell footer-grid"><div><Brand compact /><p className="footer-note">把檢驗結果，交給能好好解釋的人。</p></div><div className="footer-links"><span>DAHUA MEDICAL LABORATORY</span><a href="tel:047616801">04-7616801</a><a href="https://line.me/ti/p/@932cczax" target="_blank" rel="noreferrer">LINE 官方帳號</a></div><div className="footer-address"><MapPin size={15} />彰化市崙平南路 532 號</div></div><div className="content-shell footer-bottom"><span>© 2026 大華醫事檢驗所</span><span>一般健康資訊，不取代個別醫療建議。</span></div></footer>;
}

export default function Home() {
  const [path] = useLocation();
  const isEducation = path === "/health-education";
  return <div className="site"><SiteNav />{isEducation ? <main className="education-page"><div className="content-shell education-page-heading"><p className="eyebrow">HEALTH EDUCATION / FIELD NOTES</p><h1>把健康資訊，<em>寫得清楚一點。</em></h1><p>這裡整理檢驗、營養與日常觀察的基礎知識。文章提供一般資訊，實際狀況請與合適的專業人員討論。</p></div><div className="content-shell archive-feature"><div className="archive-feature-image"><img src={articles[0].cover} alt="" /><span>01 / FEATURED NOTE</span></div><div className="archive-feature-copy"><p className="eyebrow">{articles[0].category}</p><h2>{articles[0].title}</h2><p>{articles[0].summary}</p><Link href={`/health-education/${articles[0].slug}`} className="text-link">閱讀完整內容 <ArrowRight size={16} /></Link></div></div><div className="content-shell archive-list"><div className="archive-list-head"><span>02—06 / FIELD NOTES</span><span>CURATED HEALTH EDUCATION</span></div>{articles.slice(1).map((article, index) => <Link href={`/health-education/${article.slug}`} className="archive-row" key={article.slug}><span className="archive-row-index">0{index + 2}</span><div className="archive-row-image"><img src={article.cover} alt="" /></div><div className="archive-row-copy"><span>{article.category}</span><h2>{article.title}</h2><p>{article.summary}</p><div className="article-tags">{article.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div><ArrowRight className="archive-row-arrow" size={18} /></Link>)}</div></main> : <main><Hero /><Services /><Packages /><GeneSection /><EducationSection /><Booking /></main>}<Footer /></div>;
}

export function ArticlePage() {
  const [path] = useLocation();
  const slug = path.split("/").pop();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundArticle />;
  return <div className="site"><SiteNav /><main className="article-page"><div className="content-shell article-layout"><div className="article-main"><Link href="/health-education" className="back-link">← 回到衛教知識</Link><p className="eyebrow">{article.category} / HEALTH NOTE</p><h1>{article.title}</h1><p className="article-lede">{article.summary}</p><div className="article-meta"><span>{article.tags.join(" · ")}</span><span>一般健康資訊</span></div><img className="article-hero" src={article.cover} alt="" />{article.body.map((paragraph) => <p className="article-paragraph" key={paragraph}>{paragraph}</p>)}<div className="article-callout"><BookOpen size={18} /><div><strong>想把內容放回自己的狀況理解？</strong><span>可以帶著你的問題，從預約諮詢開始。</span></div><a href="/#booking"><ArrowRight size={16} /></a></div></div><aside className="article-aside"><span className="aside-label">RELATED PATH</span><strong>從一個問題開始</strong><p>文章只能提供共同語言，實際的檢驗與健康選擇，留給專業對話。</p><a href="/#booking" className="text-link">預約諮詢 <ArrowRight size={15} /></a></aside></div></main><Footer /></div>;
}

function NotFoundArticle() {
  return <div className="site"><SiteNav /><main className="not-found-page"><p className="eyebrow">404 / NOT FOUND</p><h1>這篇內容還在整理中。</h1><p>先回到衛教知識列表，看看目前可以閱讀的內容。</p><Link href="/health-education" className="button button-primary">回到衛教列表 <ArrowRight size={15} /></Link></main><Footer /></div>;
}

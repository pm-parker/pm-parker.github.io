(() => {
  const ZH = {
    "skip":"跳到正文",
    "nav.projects":"项目","nav.timeline":"时间线","nav.contact":"联系",
    "hero.eyebrow":"独立开发者 · 公开构建",
    "hero.title":"小工具，<br>实测说话。",
    "hero.sub":"我是 PM Parker，做了十年产品经理，现在专注为路由器、Chromebook、Linux 桌面和家用 NAS 打造离线优先的软件。",
    "hero.cta1":"查看项目","hero.cta2":"阅读博客 ↗",
    "hero.quiet":"5 个项目 · 4 个公开仓库 · 离线优先，零遥测",
    "reel.cap":"28 秒项目速览，每一帧都是真实录屏。",
    "ns.k":"OpenWrt · LuCI 应用",
    "ns.lead":"OpenWrt 路由器的整合网络加速。智能排队、多核分流与 P2P 直通收进一个总开关，并用 A/B 实测告诉你在自己设备上到底快了多少。",
    "ns.f1":"吞吐提升（20 路并发下载）","ns.f2":"延迟（设备端实测）","ns.f3":"GitHub Star · MIT",
    "dv.k":"Omarchy · Linux 桌面",
    "dv.lead":"Omarchy 的离线语音输入。按住右 Alt 说话，松手文字就落进当前窗口。语音识别完全在本机 CPU 上运行。",
    "dv.f1":"支持语言：中英日韩粤","dv.f2":"Qt Quick 原生单二进制","dv.f3":"最新版本 · MIT",
    "gl.k":"Web · AI 情报雷达","gl.t":"观澜 GUANLAN",
    "gl.lead":"实时的 AI 新闻雷达。聚合数百个信源，把重复报道归并为同一事件，每小时自动生成一段快讯视频。",
    "gl.f1":"追踪信源","gl.f2":"聚合事件","gl.f3":"数据刷新",
    "cv.k":"ChromeOS · Chrome 扩展",
    "cv.lead":"ChromeOS 的中文语音输入。点一下 Search+A 说话，本地模型自动断句、纠正同音字，再把文字填进输入框。",
    "cv.f1":"离线模型，仅需下载一次","cv.f2":"遥测、上传、账号","cv.f3":"首个版本 · MIT",
    "px.k":"飞牛 fnOS · Beta","px.lead":"跑在 NAS 上的 AI 人像精修。浏览器打开就能修图，照片和模型都不出 NAS。",
    "px.f1":"LUT 滤镜","px.f2":"场景预设","px.f3":"当前 Beta 版本",
    "l.site":"官网 ↗","l.post":"发布帖 ↗","l.post2":"X 帖子 ↗","l.dash":"实时看板 ↗",
    "tl.h":"最近发布",
    "tl.d1":"11 月 12 日","tl.e1":"duckvox 发布；v2.5.0 与 NetSteer v1.22.14 同日上线",
    "tl.d2":"11 月 7 日","tl.e2":"NetSteer 升级为整合加速方案",
    "tl.d3":"11 月 4 日","tl.e3":"NetSteer 真机实测后开源",
    "tl.d4":"11 月 3 日","tl.e4":"CrostiVoice v1.0.0",
    "tl.d5":"10 月 31 日","tl.e5":"CrostiVoice 源码公开",
    "tl.d6":"10 月 16 日","tl.e6":"在 X 上分享观澜",
    "ct.h":"打个招呼。","ct.sub":"所有仓库都开放 Issues，中文或英文都欢迎。","ct.blog":"博客",
    "ft.top":"回到顶部 ↑"
  };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {}; nodes.forEach(n => EN[n.dataset.i18n] = n.innerHTML);
  const btn = document.getElementById('lang');
  function setLang(l){
    const dict = l === 'zh' ? ZH : EN;
    nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    btn.querySelectorAll('[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === l));
    try { localStorage.setItem('lang', l); } catch(e){}
  }
  let cur = (()=>{ try { return localStorage.getItem('lang') } catch(e){ return null } })() || 'en';
  setLang(cur);
  btn.addEventListener('click', () => { cur = cur === 'en' ? 'zh' : 'en'; setLang(cur); });

  const nav = document.querySelector('.nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fades = document.querySelectorAll('.fade');
  if (reduce || !('IntersectionObserver' in window)) fades.forEach(e => e.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin:'0px 0px -10% 0px' });
    fades.forEach(e => io.observe(e));
  }

  // Videos: lazy-load, play only on screen; reduced motion keeps the poster.
  const vids = document.querySelectorAll('video[data-src]');
  if (reduce) { vids.forEach(v => { v.removeAttribute('autoplay'); v.controls = true; v.preload = 'none'; v.src = v.dataset.src; }); }
  else if ('IntersectionObserver' in window) {
    const vo = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(()=>{}); }
      else if (!v.paused) v.pause();
    }), { threshold: 0.25 });
    vids.forEach(v => vo.observe(v));
  }
})();

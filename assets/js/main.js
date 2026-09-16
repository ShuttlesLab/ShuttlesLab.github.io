/* ShuttlesLab 站点脚本：导航/页脚注入 + 中英双语切换 */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { id: 'home', zh: '首页', en: 'Home', href: 'index.html' },
    { id: 'research', zh: '成员方向', en: 'Members & Directions', href: 'research.html' },
    { id: 'publications', zh: '发表论文', en: 'Publications', href: 'publications.html' },
    { id: 'news', zh: '新闻动态', en: 'News', href: 'news.html' },
    { id: 'join', zh: '加入我们', en: 'Join Us', href: 'join.html' }
  ];

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var page = document.body.getAttribute('data-page');
    var links = NAV_ITEMS.map(function (item) {
      var cls = item.id === page ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + cls +
        ' data-zh="' + item.zh + '" data-en="' + item.en + '">' + item.zh + '</a>';
    }).join('');

    host.innerHTML =
      '<div class="container nav">' +
        '<a class="logo" href="index.html">' +
          '<img src="assets/img/logo-icon.png" alt="ShuttlesLab">' +
          'Shuttles<span>Lab</span>' +
        '</a>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="menu">&#9776;</button>' +
        '<nav class="nav-links" id="nav-links">' +
          links +
          '<button class="lang-toggle" id="lang-toggle">EN</button>' +
        '</nav>' +
      '</div>';
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var year = new Date().getFullYear();
    var quickLinks = NAV_ITEMS.map(function (item) {
      return '<a href="' + item.href + '" data-zh="' + item.zh + '" data-en="' + item.en + '">' + item.zh + '</a>';
    }).join('');

    host.innerHTML =
      '<div class="container footer-grid">' +
        '<div>' +
          '<div class="logo footer-logo">' +
            '<img src="assets/img/logo-icon.png" alt="ShuttlesLab">' +
            'Shuttles<span>Lab</span>' +
          '</div>' +
          '<p data-zh="依托哈尔滨工业大学（深圳）智能科学与工程学院，聚焦航天器控制与智能机器人研究。"' +
          ' data-en="Based at the School of Intelligence Science and Engineering, Harbin Institute of Technology (Shenzhen), focusing on spacecraft control and intelligent robotics.">' +
          '依托哈尔滨工业大学（深圳）智能科学与工程学院，聚焦航天器控制与智能机器人研究。</p>' +
        '</div>' +
        '<div>' +
          '<h4 data-zh="快速链接" data-en="Quick Links">快速链接</h4>' +
          quickLinks +
        '</div>' +
        '<div>' +
          '<h4 data-zh="联系我们" data-en="Contact">联系我们</h4>' +
          '<p data-zh="邮箱：zhangyinghit@hit.edu.cn" data-en="Email: zhangyinghit@hit.edu.cn">邮箱：zhangyinghit@hit.edu.cn</p>' +
          '<p data-zh="地址：广东省深圳市南山区 哈尔滨工业大学（深圳）智能科学与工程学院" data-en="Address: School of Intelligence Science and Engineering, Harbin Institute of Technology (Shenzhen), Nanshan District, Shenzhen, Guangdong, China">地址：广东省深圳市南山区 哈尔滨工业大学（深圳）智能科学与工程学院</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span data-zh="&copy; ' + year + ' ShuttlesLab 版权所有" data-en="&copy; ' + year + ' ShuttlesLab. All rights reserved.">&copy; ' + year + ' ShuttlesLab 版权所有</span>' +
      '</div>';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    var nodes = document.querySelectorAll('[data-zh]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      el.innerHTML = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';
    try { localStorage.setItem('shuttlelab-lang', lang); } catch (e) {}
  }

  function currentLang() {
    try { return localStorage.getItem('shuttlelab-lang') || 'zh'; } catch (e) { return 'zh'; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    applyLang(currentLang());

    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        applyLang(currentLang() === 'zh' ? 'en' : 'zh');
      });
    }

    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
      });
      navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') navLinks.classList.remove('open');
      });
    }
  });
})();

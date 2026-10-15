/* ShuttlesLab site script: injects the navigation bar and footer. */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { id: 'research', label: 'Research', href: '#research' },
    { id: 'news', label: 'News', href: '#news' },
    { id: 'members', label: 'Members', href: '#members' },
    { id: 'join', label: 'Join Us', href: '#join' }
  ];

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var links = NAV_ITEMS.map(function (item) {
      return '<a href="' + item.href + '" data-target="' + item.id + '">' +
        item.label + '</a>';
    }).join('');

    host.innerHTML =
      '<div class="container nav">' +
        '<a class="logo" href="#top">' +
          '<img src="assets/img/logo-icon.png" alt="ShuttlesLab">' +
          'Shuttles<span>Lab</span>' +
        '</a>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="menu">&#9776;</button>' +
        '<nav class="nav-links" id="nav-links">' +
          links +
        '</nav>' +
      '</div>';
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var year = new Date().getFullYear();
    var quickLinks = NAV_ITEMS.map(function (item) {
      return '<a href="' + item.href + '">' + item.label + '</a>';
    }).join('');

    host.innerHTML =
      '<div class="container footer-grid">' +
        '<div>' +
          '<div class="logo footer-logo">' +
            '<img src="assets/img/logo-icon.png" alt="ShuttlesLab">' +
            'Shuttles<span>Lab</span>' +
          '</div>' +
          '<p>Based at the School of Intelligence Science and Engineering, ' +
          'Harbin Institute of Technology (Shenzhen), focusing on spacecraft ' +
          'control and intelligent robotics.</p>' +
        '</div>' +
        '<div>' +
          '<h4>Quick Links</h4>' +
          quickLinks +
        '</div>' +
        '<div>' +
          '<h4>Contact</h4>' +
          '<p>Email: zhangyinghit@hit.edu.cn</p>' +
          '<p>Address: School of Intelligence Science and Engineering, ' +
          'Harbin Institute of Technology (Shenzhen), Nanshan District, ' +
          'Shenzhen, Guangdong, China</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; ' + year + ' ShuttlesLab. All rights reserved.</span>' +
      '</div>';
  }

  function initScrollSpy() {
    var links = document.querySelectorAll('#nav-links a[data-target]');
    if (!links.length) return;
    var sections = [];
    for (var i = 0; i < links.length; i++) {
      var sec = document.getElementById(links[i].getAttribute('data-target'));
      if (sec) sections.push({ link: links[i], section: sec });
    }
    if (!sections.length) return;

    function update() {
      var pos = window.pageYOffset + 120;
      var current = sections[0].link;
      for (var j = 0; j < sections.length; j++) {
        if (sections[j].section.offsetTop <= pos) current = sections[j].link;
      }
      for (var k = 0; k < links.length; k++) {
        links[k].classList.remove('active');
      }
      current.classList.add('active');
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.lang = 'en';
    renderHeader();
    renderFooter();
    initScrollSpy();

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

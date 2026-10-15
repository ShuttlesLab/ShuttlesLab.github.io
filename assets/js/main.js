/* ShuttlesLab site script: injects the navigation bar and footer. */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'research', label: 'Members & Directions', href: 'research.html' },
    { id: 'news', label: 'News', href: 'news.html' },
    { id: 'join', label: 'Join Us', href: 'join.html' }
  ];

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var page = document.body.getAttribute('data-page');
    var links = NAV_ITEMS.map(function (item) {
      var cls = item.id === page ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + cls + '>' + item.label + '</a>';
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

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.lang = 'en';
    renderHeader();
    renderFooter();

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

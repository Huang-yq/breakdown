// navigation bar routing
document.addEventListener('DOMContentLoaded', function() {
    var navHome = document.getElementById('home');
    navHome.onclick = function() {
        window.location.href = '/home/homePage/home.html';
    };
});

document.addEventListener('DOMContentLoaded', function() {
    var navTimeline = document.getElementById('timeline');
    navTimeline.onclick = function() {
        window.location.href = '/timeline/timelinePage/timeline.html';
    };
});

document.addEventListener('DOMContentLoaded', function() {
    var navAnalytics = document.getElementById('analytics');
    navAnalytics.onclick = function() {
        window.location.href = '/analytics/analyticsPage/analytics.html';
    };
});

        // عناصر DOM
        const menuBtn = document.getElementById('menuBtn');
        const closeMenu = document.getElementById('closeMenu');
        const overlay = document.getElementById('overlay');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = mobileNav.querySelectorAll('a');
        
        // فتح القائمة
        function openMenu() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            menuBtn.classList.add('open');
            document.body.style.overflow = 'hidden'; // منع التمرير عند فتح القائمة
        }
        
        // إغلاق القائمة
        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.classList.remove('open');
            document.body.style.overflow = 'auto'; // إعادة التمرير
        }
        
        // إضافة مستمعي الأحداث
        if (menuBtn) {
            menuBtn.addEventListener('click', openMenu);
        }
        
        if (closeMenu) {
            closeMenu.addEventListener('click', closeMobileMenu);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        // إغلاق القائمة عند النقر على أي رابط
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // إغلاق القائمة بمفتاح ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // إغلاق القائمة عند تغيير حجم الشاشة (إذا كانت مفتوحة)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });


        // 1. التحكم في القائمة الجانبية (Mobile Menu)



// 2. منطق الانتقال للمسارات والدروس
function goToPath(category, level) {
    // سينقلك لصفحة الدروس مع إرسال القسم والمستوى في الرابط
    window.location.href = `lessons.html?category=${category}&level=${level}`;
}

// 3. إضافة تأثير عند التمرير (إختياري لتحسين المظهر)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = "0.5rem 5%";
        header.style.background = "rgba(250, 247, 242, 0.95)";
    } else {
        header.style.padding = "1rem 5%";
        header.style.background = "#FAF7F2";
    }
});


async function loadLatestArticles() {
    try {
        const res = await fetch('data/articles.json');
        const articles = await res.json();
        
        // هناخد أول 3 مقالات فقط (الأحدث)
        const latest = articles.slice(0, 3);
        const container = document.getElementById('articles-grid');
        
        container.innerHTML = latest.map(art => `
            <div class="article-card" style="border-radius:20px; overflow:hidden; box-shadow:0 10px 20px rgba(0,0,0,0.05); border:1px solid #eee;">
                <img src="${art.image}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding:20px;">
                    <small style="color:var(--secondary); font-weight:bold;">${art.date}</small>
                    <h3 style="margin:10px 0; font-size:1.2rem; color:var(--primary);">${art.title}</h3>
                    <p style="color:#666; font-size:0.9rem;">${art.excerpt}</p>
                    <a href="article-details.html?id=${art.id}" style="color:var(--secondary); font-weight:bold; text-decoration:none; display:inline-block; margin-top:15px;">اقرأ المزيد ←</a>
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error("خطأ في تحميل المقالات");
    }
}

// استدعي الدالة عند فتح الصفحة
loadLatestArticles();
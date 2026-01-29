let allArticles = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('data/articles.json');
        allArticles = await res.json();
        renderArticles(allArticles);
    } catch (e) {
        console.error("خطأ في تحميل المقالات");
    }
});

function renderArticles(data) {
    const container = document.getElementById('all-articles-container');
    
    if (data.length === 0) {
        container.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">عذراً، لم يتم العثور على مقالات بهذا الاسم.</p>`;
        return;
    }

    container.innerHTML = data.map(art => `
        <div class="article-card" style="background:white; border-radius:20px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.05); border:1px solid #eee; transition: 0.3s;">
            <img src="${art.image}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:20px;">
                <small style="color:var(--secondary); font-weight:bold;">${art.date}</small>
                <h3 style="margin:10px 0; color:var(--primary);">${art.title}</h3>
                <p style="color:#666; font-size:0.95rem;">${art.excerpt}</p>
                <a href="article-details.html?id=${art.id}" style="color:var(--secondary); font-weight:bold; text-decoration:none; display:inline-block; margin-top:15px;">قراءة المقال بالكامل ←</a>
            </div>
        </div>
    `).join('');
}

// ميزة البحث الذكي
document.getElementById('articleSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allArticles.filter(art => 
        art.title.toLowerCase().includes(term) || 
        art.excerpt.toLowerCase().includes(term)
    );
    renderArticles(filtered);
});

function renderArticles(data) {
    const container = document.getElementById('all-articles-container');
    container.innerHTML = data.map(art => `
        <div class="article-card">
            <div class="article-img-container">
                <img src="${art.image}" style="width:100%; height:100%; object-fit:cover;">
                <span class="article-badge">نصائح</span>
            </div>
            <div class="article-body">
                <small style="color: #888; margin-bottom: 10px; display: block;">
                    <i class="far fa-calendar-alt"></i> ${art.date}
                </small>
                <h3>${art.title}</h3>
                <p style="color: #666; margin-bottom: 20px;">${art.excerpt}</p>
                <a href="article-details.html?id=${art.id}" class="read-more-link">
                    اقرأ المقال بالكامل <i class="fas fa-long-arrow-alt-left"></i>
                </a>
            </div>
        </div>
    `).join('');
}
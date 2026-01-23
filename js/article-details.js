document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        try {
            const res = await fetch('data/articles.json');
            const articles = await res.json();
            const article = articles.find(a => a.id === id);

            if (article) {
                document.title = article.title;
                document.getElementById('art-title').textContent = article.title;
                document.getElementById('art-date').textContent = `تاريخ النشر: ${article.date}`;
                document.getElementById('art-image').src = article.image;
                // هنا بنعرض الـ content اللي هيكون فيه النص الكامل للمقال
                document.getElementById('art-body').innerHTML = article.content;
            }
        } catch (e) {
            console.error("خطأ في تحميل المقال");
        }
    }
});
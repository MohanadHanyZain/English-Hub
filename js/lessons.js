document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const level = params.get('level');

    if (category && level) {
        loadData(category, level);
    }
});

async function loadData(category, level) {
    const list = document.getElementById('lessonsList');
    const title = document.getElementById('pathTitle');
    
    // تحديث العناوين بناءً على الاختيار
    const names = { 'grammar': 'قواعد اللغة', 'vocabulary': 'المفردات', 'listening': 'الاستماع' };
    const lvls = { 'beginner': 'المستوى المبتدئ', 'intermediate': 'المستوى المتوسط', 'advanced': 'المستوى المتقدم' };
    
    title.innerHTML = `${names[category]} - <span>${lvls[level]}</span>`;

    try {
        const res = await fetch(`data/${category}.json`);
        const data = await res.json();
        
        const filtered = data.filter(d => d.level === level);
        list.innerHTML = '';

        filtered.forEach(lesson => {
            list.innerHTML += `
                <a href="/${category}/${lesson.id}.html" class="lesson-item">
                    <div>
                        <h3 style="color:var(--primary); margin-bottom:5px;">${lesson.title}</h3>
                        <p style="font-size:0.9rem; color:#666;">${lesson.description}</p>
                    </div>
                    <div class="play-icon">←</div>
                </a>
            `;
        });
    } catch (e) {
        list.innerHTML = "<p>عذراً، لم يتم العثور على دروس في هذا القسم حالياً.</p>";
    }
}

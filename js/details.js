document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type');

    if (id && type) {
        loadLessonDetails(id, type);
    }
});

async function loadLessonDetails(id, type) {
    try {
        const res = await fetch(`data/${type}.json`);
        const data = await res.json();
        const lesson = data.find(l => l.id == id);

        if (lesson) {
            document.getElementById('lessonTitle').textContent = lesson.title;
            document.getElementById('lessonContent').innerHTML = lesson.content;

            if (lesson.quiz) {
                renderQuiz(lesson.quiz);
            }
        }
    } catch (e) {
        console.error("Error loading details:", e);
    }
}

function renderQuiz(quiz) {
    const area = document.getElementById('quizArea');
    const qText = document.getElementById('questionText');
    const optionsBox = document.getElementById('optionsContainer');
    const submitBtn = document.getElementById('submitAnswer');
    const feedback = document.getElementById('quizFeedback');

    area.style.display = 'block';
    qText.textContent = quiz.question;
    optionsBox.innerHTML = '';

    quiz.options.forEach(opt => {
        optionsBox.innerHTML += `
            <label class="option-label">
                <input type="radio" name="quiz-opt" value="${opt}"> ${opt}
            </label>
        `;
    });

    submitBtn.onclick = () => {
        const selected = document.querySelector('input[name="quiz-opt"]:checked');
        if (!selected) {
            feedback.textContent = "يرجى اختيار إجابة أولاً!";
            feedback.style.color = "orange";
            return;
        }

        if (selected.value === quiz.answer) {
            feedback.textContent = "✅ أحسنت! إجابة صحيحة.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = `❌ خطأ. الإجابة الصحيحة هي: ${quiz.answer}`;
            feedback.style.color = "red";
        }
    };
}



let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type');

    if (id && type) {
        await loadQuizData(id, type);
    }
});

async function loadQuizData(id, type) {
    try {
        const res = await fetch(`data/${type}.json`);
        const data = await res.json();
        const lesson = data.find(l => l.id == id);

        if (lesson && lesson.quizzes) {
            currentQuestions = lesson.quizzes;
            showQuestion();
        }
    } catch (e) {
        console.error("خطأ في تحميل الأسئلة");
    }
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('total-q').textContent = currentQuestions.length;
    document.getElementById('current-q').textContent = currentIndex + 1;
    document.getElementById('question-text').textContent = q.question;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, opt);
        container.appendChild(btn);
    });

    document.getElementById('next-btn').disabled = true;
}

function selectOption(btn, value) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userAnswers[currentIndex] = value;
    document.getElementById('next-btn').disabled = false;
}

document.getElementById('next-btn').onclick = () => {
    if (userAnswers[currentIndex] === currentQuestions[currentIndex].answer) {
        score++;
    }

    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

// أضف هذا المتغير في بداية الملف لتخزين الأسئلة مع إجابات المستخدم
let quizReviewData = [];

// تعديل على دالة الضغط على الزر (التالي)
document.getElementById('next-btn').onclick = () => {
    const currentQ = currentQuestions[currentIndex];
    const userAns = userAnswers[currentIndex];
    
    // حفظ البيانات للمراجعة
    quizReviewData.push({
        question: currentQ.question,
        correct: currentQ.answer,
        user: userAns,
        isCorrect: userAns === currentQ.answer
    });

    if (userAns === currentQ.answer) {
        score++;
    }

    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {


    document.getElementById('question-screen').style.display = 'none';
    const resultScreen = document.getElementById('result-screen');
    resultScreen.style.display = 'block';
    
    document.getElementById('final-score').textContent = `${score}/${currentQuestions.length}`;
    if (score === currentQuestions.length) {
    // تأثير بسيط مبهج
    document.querySelector('.score-circle').style.boxShadow = "0 0 20px #d4af37";
    console.log("إبداع! الطالب ده يستحق مكافأة!");
}
    
    // إضافة قسم المراجعة ديناميكياً
    let reviewHTML = '<div style="margin-top:30px; text-align:right;"><h3>مراجعة الإجابات:</h3>';
    
    quizReviewData.forEach((item, index) => {
        reviewHTML += `
            <div style="padding:15px; border-bottom:1px solid #eee; margin-bottom:10px; background:${item.isCorrect ? '#f4fff4' : '#fff4f4'}; border-radius:10px;">
                <p><strong>س${index + 1}:</strong> ${item.question}</p>
                <p style="color:${item.isCorrect ? 'green' : 'red'}; margin:5px 0;">
                    ${item.isCorrect ? '✅ إجابة صحيحة' : '❌ إجابتك: ' + item.user}
                </p>
                ${!item.isCorrect ? `<p style="color:green;">✔️ الإجابة الصحيحة: ${item.correct}</p>` : ''}
            </div>
        `;
    });
    
    reviewHTML += '</div>';
    resultScreen.insertAdjacentHTML('beforeend', reviewHTML);


    if (score === currentQuestions.length && score > 0) {
        launchCelebration();
    }
}

// دالة الاحتفال الاحترافية
function launchCelebration() {
    const duration = 3 * 1000; // هيستمر لمدة 3 ثواني
    const end = Date.now() + duration;

    (function frame() {
        // إطلاق القصاصات من الشمال
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#0a4d4a', '#d4af37', '#ffffff'] // ألوان موقعك (أخضر وذهبي وأبيض)
        });
        // إطلاق القصاصات من اليمين
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#0a4d4a', '#d4af37', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

}



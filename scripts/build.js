const fs = require('fs-extra'); // هنستخدم مكتبة fs-extra لو مش عندك نزلها بـ npm install fs-extra أو خليك على fs العادية
const path = require('path');

const outDir = path.join(__dirname, '../dist');
const dataDir = path.join(__dirname, '../data');



// 1. تنظيف مجلد dist القديم قبل البدء
if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
fs.mkdirSync(outDir);

// 2. نسخ الملفات الثابتة (CSS, JS, الصور، والصفحات الرئيسية) لـ dist
const foldersToCopy = ['css', 'js', 'shining-satellite']; // shining-satellite لو فيه صور
foldersToCopy.forEach(folder => {
    if (fs.existsSync(path.join(__dirname, `../${folder}`))) {
        fs.cpSync(path.join(__dirname, `../${folder}`), path.join(outDir, folder), {recursive: true});
    }
});

// نسخ صفحات الـ HTML الأساسية
const staticPages = ['index.html', 'privacy.html', 'terms.html'];
staticPages.forEach(page => {
    fs.copyFileSync(path.join(__dirname, `../${page}`), path.join(outDir, page));
});

// 3. توليد دروس الـ JSON (نفس الكود اللي فات مع ضبط المسارات)
const categories = ['grammar', 'vocabulary', 'listening', 'articles'];
categories.forEach(cat => {
    const filePath = path.join(dataDir, `${cat}.json`);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const catDir = path.join(outDir, cat);
        if (!fs.existsSync(catDir)) fs.mkdirSync(catDir);

        data.forEach(item => {
            const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>${item.title}</title>
    <meta name="description" content="${item.description || item.excerpt || ''}">
    <link rel="stylesheet" href="/css/style.css">
    </head>
    
<body>
    <div class="container">
        <h1>${item.title}</h1>
        <div class="content">${item.content}</div>
        <a href="/">العودة للرئيسية</a>
    </div>
</body>
</html>`;
            fs.writeFileSync(path.join(catDir, `${item.id}.html`), htmlContent);
        });
    }
});

console.log("🚀 تم تجهيز الموقع بالكامل في مجلد dist جاهز للرفع!");
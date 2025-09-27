document.addEventListener('DOMContentLoaded', () => {

    // ************************************************************
    // 1. وظيفة النافذة المنبثقة للمصطلحات والمفاهيم (Term Modal)
    // ************************************************************
    const setupTermModal = () => {
        const termModal = document.getElementById('term-modal');
        const termModalTitle = document.getElementById('term-modal-title');
        const termModalBody = document.getElementById('term-modal-body');
        // ❌ كان يستخدم: document.querySelector('.modal-close-btn');
        // ✅ الأفضل استخدام زر الإغلاق داخل الـ Modal ليكون التحديد خاصًا به
        const termModalCloseBtn = termModal ? termModal.querySelector('.modal-close-btn') : null;
        
        if (!termModal) return;

        // المصطلحات والتعريفات (يجب أن تتطابق المفاتيح مع ما هو في HTML)
        const terms = {
            'البرمجة': 'البرمجة هي عملية كتابة الأوامر والتعليمات التي يفهمها الحاسوب لتنفيذ مهمة معينة.',
            'الكائن': 'هو شخصية أو كائن رسومي يمكن التحكم به وبرمجته ليقوم بأفعال معينة مثل الحركة أو التحدث.',
            'اللبنة': 'هي قطعة برمجية جاهزة تشبه قطعة أحجية، يمكن تركيبها مع قطع أخرى لإنشاء سلسلة من الأوامر.',
            'المنصة': 'هي المساحة التي تعرض نتيجة المشروع. مثل المسرح الذي يتحرك عليه الممثلون.',
            'المتغير': 'مكان في الذاكرة لتخزين قيمة معينة (مثل رقم أو كلمة) يمكن تغييرها أثناء تشغيل البرنامج.',
            'لبنة_مخصصة': 'لبنة يمكنك إنشاؤها بنفسك لدمج مجموعة من الأوامر في لبنة واحدة، مما يسهل إعادة استخدامها في الكود.',
        };

        const hideModal = () => {
            termModal.classList.add('hidden');
        };

        const handleCardClick = (e) => {
            const term = e.currentTarget.dataset.term;
            if (terms[term]) {
                termModalTitle.textContent = term;
                termModalBody.textContent = terms[term];
                termModal.classList.remove('hidden');
            }
        };

        // تفعيل النقر على بطاقات المفاهيم
        document.querySelectorAll('.term-card').forEach(card => {
            card.addEventListener('click', handleCardClick);
        });

        // تفعيل الإغلاق
        if (termModalCloseBtn) { // تأكد من وجود الزر قبل تعيين onclick
            termModalCloseBtn.onclick = hideModal;
        }
        termModal.onclick = (e) => {
            if (e.target === termModal) {
                hideModal();
            }
        };
    };

    // ************************************************************
    // 2. وظيفة النافذة المنبثقة لتكبير الصور (Image Modal)
    // ************************************************************
    const imageModal = document.getElementById('imageModal');
    // تصحيح: استخدام المعرّف الصحيح الموجود في square.html
    const modalImage = document.getElementById('modalImage');

    // إذا لم يتم العثور على عناصر الـ Modal للصور، لا تكمل تنفيذ هذا الجزء
    if (imageModal && modalImage) {

        // دالة لإظهار النافذة المنبثقة للصور (تُستخدم عبر onclick في HTML)
        window.showImageModal = function(imageUrl) {
            modalImage.src = imageUrl;
            imageModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // منع تمرير الصفحة
        };

        // دالة لإخفاء النافذة المنبثقة للصور (تُستخدم عبر onclick في زر الإغلاق)
        window.hideImageModal = function() {
            imageModal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // إعادة تفعيل التمرير
        };

        // الإغلاق بالنقر على القناع (الخلفية السوداء) فقط
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                window.hideImageModal();
            }
        });
    }

    // ************************************************************
    // 3. وظيفة تلوين كود سكراتش (Syntax Highlighting)
    // ************************************************************
const categories = [
        // تم تصحيح: استخدام \s بدلاً من \\s
        { cat: 'events', rx: /(when\s+green\s+flag\s+clicked|when\s+key\s+pressed|when\s+this\s+sprite\s+clicked)/i },
        // تم تصحيح: استخدام \s بدلاً من \\s
        { cat: 'pen', rx: /(pen\s+up|pen\s+down|erase\s+all|set\s+pen\s+size|set\s+pen\s+color|change\s+pen\s+color|stamp)/i },
        // هذا هو التصحيح الذي قمت به لفئة motion
        { cat: 'motion', rx: /(move\s+\(?[^)]+\)?\s+steps|turn\s+(clockwise|counterclockwise)|go\s+to\s+x:|glide\s+\(?[^)]+\)?\s+secs\s+to\s+x:|point\s+in\s+direction|change\s+[xy]\s+by|go\s+to\s+random\s+position)/i },
        // تم تصحيح: استخدام \s بدلاً من \\s وإزالة \ من الأقواس
        { cat: 'control', rx: /(repeat\s*\(|forever|if\s*\(|else|wait\s*\(|stop\s+all|until\s*\()/i },
        // تم تصحيح: استخدام \s بدلاً من \\s
        { cat: 'variables', rx: /(set\s+\[?.+?\]?\s+to|change\s+\[?.+?\]?\s+by|الضلع)/i },
        // تم تصحيح: استخدام \s بدلاً من \\s
        { cat: 'myblocks', rx: /(define\s+\w+|^^\s*ارسم\s|لبنة\s+مخص)/i }
    ];

    function detectCat(line) {
        const t = line.trim();
        for (const cat of categories) {
            if (cat.rx.test(t)) return cat.cat;
        }
        return null;
    }

    function colorizeScratchCode() {
        const preElements = document.querySelectorAll('.scratch-code');
        preElements.forEach(pre => {
            const code = pre.querySelector('code');
            if (!code) return;

            const lines = code.innerHTML.split('\n');
            let coloredHtml = '';

            lines.forEach(line => {
                // إزالة وسوم التلوين الموجودة سابقاً لتجنب التكرار
                let cleanLine = line.replace(/<span[^>]*>(.*?)<\/span>/g, '$1').trim();
                
                const cat = detectCat(cleanLine);
                if (cat) {
                    coloredHtml += `<span class="line cat-${cat}">${line}</span>\n`;
                } else {
                    coloredHtml += `${line}\n`;
                }
            });

            code.innerHTML = coloredHtml;
        });
    }

    // ************************************************************
    // 4. تفعيل الدوال عند تحميل الصفحة
    // ************************************************************
    setupTermModal();
    colorizeScratchCode();
});
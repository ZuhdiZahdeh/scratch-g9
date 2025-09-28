document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM محمل، بدء تشغيل main.js");

    // ************************************************************
    // 1. وظيفة النافذة المنبثقة للمصطلحات والمفاهيم (Term Modal)
    // ************************************************************
    const setupTermModal = () => {
        console.log("➡️ تشغيل setupTermModal()");

        // جلب العناصر من HTML
        const termModal = document.getElementById('term-modal');
        const termModalTitle = document.getElementById('term-modal-title');
        const termModalBody = document.getElementById('term-modal-body');
        const termModalCloseBtn = document.querySelector('#term-modal .modal-close-btn');
        const termCards = document.querySelectorAll('.term-card');

        if (!termModal) {
            console.warn("⚠️ لم يتم العثور على term-modal في الصفحة");
            return;
        }

        // المصطلحات والتعريفات
        const terms = {
            'البرمجة': 'البرمجة هي عملية كتابة الأوامر والتعليمات التي يفهمها الحاسوب لتنفيذ مهمة معينة.',
            'الكائن': 'هو شخصية أو كائن رسومي يمكن التحكم به وبرمجته ليقوم بأفعال معينة مثل الحركة أو التحدث.',
            'اللبنة': 'هي قطعة برمجية جاهزة تشبه قطعة أحجية، يمكن تركيبها مع قطع أخرى لإنشاء سلسلة من الأوامر.',
            'المنصة': 'هي المساحة التي تعرض نتيجة المشروع. مثل المسرح الذي يتحرك عليه الممثلون.',
            'المتغير': 'مكان في الذاكرة لتخزين قيمة معينة (مثل رقم أو كلمة) يمكن تغييرها أثناء تشغيل البرنامج.',
            'لبنة_مخصصة': 'لبنة يمكنك إنشاؤها بنفسك لدمج مجموعة من الأوامر في لبنة واحدة، مما يسهل إعادة استخدامها في الكود.',
        };

        const hideModal = () => {
            console.log("❌ إغلاق term-modal");
            termModal.classList.add('hidden');
            console.log("الحالة الحالية:", termModal.classList.toString());
        };

        const handleCardClick = (e) => {
            const term = e.currentTarget.dataset.term;
            console.log("🃏 تم الضغط على بطاقة:", term);

            if (terms[term]) {
                if (!termModalTitle || !termModalBody) {
                    console.error("❌ لم يتم العثور على عناصر العنوان أو النص داخل term-modal");
                    return;
                }
                termModalTitle.textContent = term;
                termModalBody.textContent = terms[term];

                console.log("✅ فتح term-modal");
                termModal.classList.remove('hidden');
                console.log("الحالة الحالية:", termModal.classList.toString());
            } else {
                console.warn("⚠️ لا يوجد تعريف للمصطلح:", term);
            }
        };

        // تفعيل النقر على بطاقات المفاهيم
        termCards.forEach(card => {
            console.log("🔗 ربط بطاقة:", card.dataset.term);
            card.addEventListener('click', handleCardClick);
        });

        // تفعيل الإغلاق
        if (termModalCloseBtn) {
            termModalCloseBtn.onclick = hideModal;
            console.log("🔗 تم ربط زر الإغلاق للـ term-modal");
        } else {
            console.warn("⚠️ لم يتم العثور على زر الإغلاق في term-modal");
        }

        // الإغلاق بالنقر على الخلفية
        termModal.onclick = (e) => {
            if (e.target === termModal) {
                console.log("🖱️ النقر على خلفية term-modal");
                hideModal();
            }
        };
    };

    // ************************************************************
    // 2. وظيفة النافذة المنبثقة لتكبير الصور (Image Modal)
    // ************************************************************
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (imageModal && modalImage) {
        window.showImageModal = function(imageUrl) {
            console.log("🖼️ فتح imageModal مع الصورة:", imageUrl);
            modalImage.src = imageUrl;
            imageModal.classList.remove('hidden');
            console.log("الحالة الحالية:", imageModal.classList.toString());
            // document.body.style.overflow = 'hidden'; // للتجربة علقنا منع التمرير
        };

        window.hideImageModal = function() {
            console.log("❌ إغلاق imageModal");
            imageModal.classList.add('hidden');
            console.log("الحالة الحالية:", imageModal.classList.toString());
            // document.body.style.overflow = 'auto';
        };

        // الإغلاق بالنقر على الخلفية
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                console.log("🖱️ النقر على خلفية imageModal");
                window.hideImageModal();
            }
        });

        console.log("🔗 تم تهيئة imageModal");
    } else {
        console.warn("⚠️ لم يتم العثور على imageModal أو modalImage في الصفحة");
    }

    // ************************************************************
    // 3. تلوين كود سكراتش (Syntax Highlighting)
    // ************************************************************
    function colorizeScratchCode() {
        console.log("➡️ تشغيل colorizeScratchCode()");
        const preElements = document.querySelectorAll('.scratch-code');
        preElements.forEach(pre => {
            const code = pre.querySelector('code');
            if (!code) return;
            const lines = code.innerHTML.split('\n');
            let coloredHtml = '';
            lines.forEach(line => {
                coloredHtml += line + "\n"; // للتبسيط الآن
            });
            code.innerHTML = coloredHtml;
        });
    }

    // ************************************************************
    // 4. تفعيل الدوال عند تحميل الصفحة
    // ************************************************************
    setupTermModal();
    colorizeScratchCode();

    console.log("✅ main.js انتهى تشغيله بالكامل");
});

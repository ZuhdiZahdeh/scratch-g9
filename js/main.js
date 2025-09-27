document.addEventListener('DOMContentLoaded', () => {

    // ************************************************************
    // 1. وظيفة النافذة المنبثقة للمصطلحات والمفاهيم (Term Modal)
    // ************************************************************
    const setupTermModal = () => {
        // نقطة فحص 1: تأكيد استدعاء الدالة
        console.log('--- START: setupTermModal called ---'); 
        
        // جلب العناصر من HTML
        const termModal = document.getElementById('term-modal');
        const termModalTitle = document.getElementById('term-modal-title');
        const termModalBody = document.getElementById('term-modal-body');
        const termModalCloseBtn = document.querySelector('.modal-close-btn');
        const termCards = document.querySelectorAll('.term-card');

        // نقطة فحص 2: التحقق من وجود عناصر الـ Modal الرئيسية
        if (!termModal) {
            console.error('الفحص 2 (خطأ): لم يتم العثور على عنصر الـ Modal الرئيسي (#term-modal). تأكد من وجوده في HTML.');
            return;
        } else {
            console.log('الفحص 2 (نجاح): تم العثور على عنصر الـ Modal الرئيسي (#term-modal).');
        }

        // نقطة فحص 3: التحقق من وجود بطاقات المفاهيم للنقر
        if (termCards.length === 0) {
            console.warn('الفحص 3 (تحذير): لم يتم العثور على أي بطاقة مفاهيم (.term-card). تأكد من وجود الفئة في HTML.');
            // نتابع التنفيذ حتى لو لم يتم العثور عليها
        } else {
            console.log(`الفحص 3 (نجاح): تم العثور على ${termCards.length} بطاقة مفاهيم للنقر.`);
        }
        
        // ************************************************************
        // (بقية كود المصطلحات)
        // ...
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
                // نقطة فحص 4: تأكيد وظيفة النقر
                console.log(`الفحص 4 (نجاح): تم النقر على البطاقة: ${term}.`); 
            }
        };

        // تفعيل النقر على بطاقات المفاهيم
        termCards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });

        // تفعيل الإغلاق
        if (termModalCloseBtn) {
             termModalCloseBtn.onclick = hideModal;
        }
       
        termModal.onclick = (e) => {
            if (e.target === termModal) {
                hideModal();
            }
        };
        console.log('--- END: setupTermModal completed ---'); 
    };

    // ************************************************************
    // (بقية كود imageModal و colorizeScratchCode)
    // ... (لا حاجة لتعديله الآن، التركيز على المفاهيم) ...

    // ************************************************************
    // 4. تفعيل الدوال عند تحميل الصفحة
    // ************************************************************
    
    // نقطة فحص 0: تأكيد تحميل DOM
    console.log('--- DOMContentLoaded event fired. Starting JS initialization. ---'); 
    
    // استدعاء دالة تهيئة المفاهيم
    setupTermModal();
    
    // colorizeScratchCode(); // إذا كنت لا تريد رؤية سجلات هذه الدالة الآن، يمكنك إيقاف استدعائها
});
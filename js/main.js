document.addEventListener('DOMContentLoaded', () => {
    const termModal = document.getElementById('term-modal');
    const termModalTitle = document.getElementById('term-modal-title');
    const termModalBody = document.getElementById('term-modal-body');
    const termModalCloseBtn = document.querySelector('.modal-close-btn');

    // تعريف المصطلحات وشرحها
    const terms = {
        'البرمجة': 'البرمجة هي عملية كتابة الأوامر والتعليمات التي يفهمها الحاسوب لتنفيذ مهمة معينة.',
        'الكائن': 'هو شخصية أو كائن رسومي يمكن التحكم به وبرمجته ليقوم بأفعال معينة مثل الحركة أو التحدث.',
        'اللبنة': 'هي قطعة برمجية جاهزة تشبه قطعة أحجية، يمكن تركيبها مع قطع أخرى لإنشاء سلسلة من الأوامر.',
        'المنصة': 'هي المساحة التي تعرض نتيجة المشروع. مثل المسرح الذي يتحرك عليه الممثلون.',
        'المتغير': 'مكان في الذاكرة لتخزين قيمة معينة (مثل رقم أو كلمة) يمكن تغييرها أثناء تشغيل البرنامج.',
        'لبنة_مخصصة': 'لبنة يمكنك إنشاؤها بنفسك لدمج مجموعة من الأوامر في لبنة واحدة، مما يسهل إعادة استخدامها في الكود.',
    };

    // إضافة مستمع حدث لكل بطاقة مصطلح
    document.querySelectorAll('.term-card').forEach(card => {
        card.addEventListener('click', () => {
            const term = card.dataset.term;
            if (terms[term]) {
                termModalTitle.textContent = term;
                termModalBody.innerHTML = `<p>${terms[term]}</p>`;
                termModal.classList.remove('hidden');
            }
        });
    });

    // إخفاء البطاقة المنبثقة عند النقر على زر الإغلاق
    termModalCloseBtn.addEventListener('click', () => {
        termModal.classList.add('hidden');
    });

    // إخفاء البطاقة المنبثقة عند النقر خارجها
    termModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            termModal.classList.add('hidden');
        }
    });

    // دالة لإظهار النافذة المنبثقة للصور
    window.showImageModal = function(imageUrl) {
        const modal = document.getElementById('imageModal');
        const enlargedImage = document.getElementById('enlargedImage');
        enlargedImage.src = imageUrl;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    // دالة لإخفاء النافذة المنبثقة للصور
    window.hideImageModal = function() {
        const modal = document.getElementById('imageModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
});
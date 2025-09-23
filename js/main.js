document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close-btn');

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
                modalTitle.textContent = term;
                modalBody.innerHTML = `<p>${terms[term]}</p>`;
				modal.style.display = "flex";
            }
        });
    });

    // إخفاء البطاقة المنبثقة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // إخفاء البطاقة المنبثقة عند النقر خارجها
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            modal.classList.add('hidden');
        }
    });
});
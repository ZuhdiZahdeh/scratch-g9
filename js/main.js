document.addEventListener('DOMContentLoaded', () => {

    // دالة تهيئة النافذة المنبثقة للمصطلحات
    const setupTermModal = () => {
        const termModal = document.getElementById('term-modal');
        const termModalTitle = document.getElementById('term-modal-title');
        const termModalBody = document.getElementById('term-modal-body');
        const termModalCloseBtn = document.querySelector('.modal-close-btn');

        // إذا لم يتم العثور على النافذة المنبثقة، لا تنفذ باقي الكود
        if (!termModal) return;

        const terms = {
            'البرمجة': 'البرمجة هي عملية كتابة الأوامر والتعليمات التي يفهمها الحاسوب لتنفيذ مهمة معينة.',
            'الكائن': 'هو شخصية أو كائن رسومي يمكن التحكم به وبرمجته ليقوم بأفعال معينة مثل الحركة أو التحدث.',
            'اللبنة': 'هي قطعة برمجية جاهزة تشبه قطعة أحجية، يمكن تركيبها مع قطع أخرى لإنشاء سلسلة من الأوامر.',
            'المنصة': 'هي المساحة التي تعرض نتيجة المشروع. مثل المسرح الذي يتحرك عليه الممثلون.',
            'المتغير': 'مكان في الذاكرة لتخزين قيمة معينة (مثل رقم أو كلمة) يمكن تغييرها أثناء تشغيل البرنامج.',
            'لبنة_مخصصة': 'لبنة يمكنك إنشاؤها بنفسك لدمج مجموعة من الأوامر في لبنة واحدة، مما يسهل إعادة استخدامها في الكود.',
        };

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

        termModalCloseBtn.addEventListener('click', () => {
            termModal.classList.add('hidden');
        });

        termModal.addEventListener('click', (e) => {
            // للتأكد من أن النقر كان على القناع (الخلفية) وليس محتوى الـ Modal
            if (e.target.classList.contains('modal-overlay') || e.target === termModal) {
                termModal.classList.add('hidden');
            }
        });
    };
    setupTermModal();


    // ************************************************************
    // كاش (Caching) عناصر النافذة المنبثقة للصور - تم تصحيح المعرّف
    // ************************************************************
    const imageModal = document.getElementById('imageModal');
    // **التصحيح**: استخدام المعرّف الصحيح 'enlargedImage'
    const modalImage = document.getElementById('enlargedImage'); 

    // **التصحيح**: تشغيل منطق الصور فقط إذا تم العثور على كلا العنصرين
    if (imageModal && modalImage) { 
        
        // دالة لإظهار النافذة المنبثقة للصور (تُستخدم عبر onclick في HTML)
        window.showImageModal = function(imageUrl) {
            modalImage.src = imageUrl;
            imageModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        // دالة لإخفاء النافذة المنبثقة للصور (تُستخدم عبر onclick في زر الإغلاق)
        window.hideImageModal = function() {
            imageModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        };


        // الإغلاق بالنقر على القناع (الخلفية السوداء) فقط
        imageModal.addEventListener('click', (e) => {
            // إذا كان العنصر الذي تم النقر عليه هو الـ Modal نفسه (وليس الصورة المكبرة أو زر الإغلاق)
            if (e.target === imageModal) {
                window.hideImageModal();
            }
        });
    }

    /*
    * الكود المسؤول عن تلوين الأسطر البرمجية
    */
    const categories = [
        { cat:'events',    rx: /(when\s+green\s+flag\s+clicked|when\s+\w+\s+key\s+pressed|when\s+this\s+sprite\s+clicked)/i },
        { cat:'pen',       rx: /(pen\s+down|pen\s+up|erase\s+all|set\s+pen\s+size|change\s+pen\s+size|set\s+pen\s+color|change\s+pen\s+color|stamp)/i },
        { cat:'motion',    rx: /(move\s+\(?[\w\-\+]+\)?\s+steps|turn\s+(clockwise|counterclockwise)|go\s+to\s+x:|glide\s+\(?[\w\-\+]+\)?\s+secs\s+to\s+x:|point\s+in\s+direction|change\s+[xy]\s+by|go\s+to\s+random\s+position)/i },
        { cat:'control',   rx: /(repeat\s*\(|forever|if\s*\(|else|wait\s*\(|stop\s+all|until\s*\()/i },
        { cat:'variables', rx: /(set\s+\[?.+?\]?\s+to|change\s+\[?.+?\]?\s+by)/i },
        { cat:'myblocks',  rx: /(define\s+\w+|^\s*ارسم\s|لبنة\s+مخص)/i }
    ];

    function detectCat(line){
        const t = line.trim();
        for(const cat of categories) {
            if(cat.rx.test(t)) return cat.cat;
        }
        return null;
    }

    function colorizeScratchCode() {
        const preElements = document.querySelectorAll('.scratch-code');
        preElements.forEach(pre => {
            const code = pre.querySelector('code');
            if (!code) return;

            // استخدام innerText بدلاً من innerHTML لضمان معالجة النص فقط
            const lines = code.innerText.split('\n');
            let newHtml = '';
            for (const line of lines) {
                const cat = detectCat(line);
                // تأكد من ترميز HTML للأحرف الخاصة داخل الكود (مثل < و >)
                const escapedLine = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                
                if (cat) {
                    newHtml += `<span class="line" data-cat="${cat}">${escapedLine}</span>\n`;
                } else {
                    newHtml += `<span>${escapedLine}</span>\n`;
                }
            }
            code.innerHTML = newHtml;
        });
    }

    colorizeScratchCode();
});
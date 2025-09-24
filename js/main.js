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
            if (e.target.classList.contains('modal-overlay')) {
                termModal.classList.add('hidden');
            }
        });
    };
    setupTermModal();

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


    /*
    * الكود الجديد المسؤول عن تلوين الأسطر البرمجية
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

            const lines = code.innerHTML.split('\n');
            let newHtml = '';
            for (const line of lines) {
                const cat = detectCat(line);
                if (cat) {
                    newHtml += `<span class="line" data-cat="${cat}">${line}</span>\n`;
                } else {
                    newHtml += `<span>${line}</span>\n`;
                }
            }
            code.innerHTML = newHtml;
        });
    }

    colorizeScratchCode();
});
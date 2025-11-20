// js/scratch-terms.js
(function () {
  // تعريفات المصطلحات (يمكنك تعديل الصياغة كما تشاء)
  const TERMS = {
    "البرمجة": {
      title: "البرمجة (Programming)",
      body: "كتابة أوامر وتعليمات منظَّمة بلغة يفهمها الحاسوب أو البرنامج (مثل سكراتش) لتنفيذ مهمة معيّنة."
    },
    "الكائن": {
      title: "الكائن (Sprite)",
      body: "الشخصية أو الصورة أو العنصر الذي نحرّكه ونبرمجه في مشروع سكراتش، مثل القطة أو السيارة أو الكرة."
    },
    "اللبنة": {
      title: "اللبنة (Block)",
      body: "قطعة برمجية ملوّنة تمثّل تعليمة واحدة (أمر واحد)، نركّب اللبنات فوق بعضها لتكوين البرنامج."
    },
    "المنصة": {
      title: "المنصة (Stage)",
      body: "المساحة البيضاء التي تظهر فيها الكائنات وتتحرك، وهي شاشة العرض التي يشاهد عليها الطالب المشروع."
    },
    "المتغير": {
      title: "المتغير (Variable)",
      body: "مثل صندوق يخزّن قيمة يمكن أن تتغيّر أثناء تشغيل البرنامج، مثل: عدد النقاط، الزمن، عدد المحاولات."
    },
    "لبنة_مخصصة": {
      title: "لبنة مخصصة (My Block)",
      body: "لبنة يقوم المبرمج بإنشائها بنفسه لتجميع مجموعة أوامر متكررة تحت اسم واحد؛ تجعل الكود أوضح وأسهل."
    }
  };

  // هل يوجد نظام واجهة عام (window.UI) مع دالة openModal؟
  const hasUI = window.UI && typeof window.UI.openModal === "function";

  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".term-card");

    cards.forEach(card => {
      card.style.cursor = "pointer"; // لكي يظهر المؤشر على شكل يد

      card.addEventListener("click", () => {
        const key = card.dataset.term;
        const term = TERMS[key];
        if (!term) return;

        // إن كان عندك مودال عام في الموقع (مثل دروس الطاقة) استخدمه:
        if (hasUI) {
          window.UI.openModal(term.title, `<p>${term.body}</p>`);
          return;
        }

        // وإلا: افتح التعريف داخل البطاقة نفسها (طي/فتح)
        let box = card.querySelector(".term-definition");
        if (!box) {
          box = document.createElement("div");
          box.className = "term-definition";
          card.appendChild(box);
        }

        // لو كانت مفتوحة أغلقها، ولو مغلقة افتحها
        const isOpen = card.classList.contains("open");
        if (isOpen) {
          card.classList.remove("open");
          box.innerHTML = "";
        } else {
          card.classList.add("open");
          box.innerHTML = `
            <hr>
            <h4 style="margin:4px 0;font-size:1rem;">${term.title}</h4>
            <p style="margin:0;font-size:0.95rem;">${term.body}</p>
          `;
        }
      });
    });
  });
})();

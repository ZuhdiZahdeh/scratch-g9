// ============================
//   بطاقات المفاهيم في سكراتش
// ============================
(function () {
  // كائن التعاريف - عدِّل النصوص كما تحب
  const TERMS = {
    "البرمجة": {
      title: "البرمجة (Programming)",
      body: "كتابة أوامر وتعليمات منظَّمة بلغة يفهمها الحاسوب أو البرنامج مثل سكراتش لتنفيذ مهمة معيّنة."
    },
    "الكائن": {
      title: "الكائن (Sprite)",
      body: "الشخصية أو الصورة أو العنصر الذي نحرّكه ونبرمجه في مشروع سكراتش، مثل القطة أو السيارة أو الكرة."
    },
    "اللبنة": {
      title: "اللبنة (Block)",
      body: "قطعة برمجية ملوّنة تمثّل تعليمة واحدة. نركّب اللبنات فوق بعضها لنكتب البرنامج."
    },
    "المنصة": {
      title: "المنصة (Stage)",
      body: "المساحة البيضاء التي تظهر فيها الكائنات وتتحرك، وهي شاشة العرض التي يشاهد عليها الطالب المشروع."
    },
    "المتغير": {
      title: "المتغير (Variable)",
      body: "مثل صندوق يخزّن قيمة يمكن أن تتغيّر أثناء تشغيل البرنامج، مثل عدد النقاط أو الزمن أو عدد المحاولات."
    },
    "لبنة_مخصصة": {
      title: "لبنة مخصصة (My Block)",
      body: "لبنة يقوم المبرمج بإنشائها بنفسه لتجميع مجموعة أوامر متكررة تحت اسم واحد؛ تجعل الكود أوضح وأسهل في الصيانة."
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".term-card");
    if (!cards.length) return;

    cards.forEach(card => {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        const key = card.dataset.term;
        const term = TERMS[key];
        if (!term) return;

        // ابحث عن صندوق التعريف داخل البطاقة أو أنشئه
        let box = card.querySelector(".term-definition");
        if (!box) {
          box = document.createElement("div");
          box.className = "term-definition";
          card.appendChild(box);
        }

        const isOpen = card.classList.contains("open");

        if (isOpen) {
          // إغلاق البطاقة
          card.classList.remove("open");
          box.innerHTML = "";
        } else {
          // إغلاق أي بطاقة أخرى مفتوحة (اختياري)
          document.querySelectorAll(".term-card.open").forEach(openCard => {
            openCard.classList.remove("open");
            const def = openCard.querySelector(".term-definition");
            if (def) def.innerHTML = "";
          });

          // فتح البطاقة الحالية
          card.classList.add("open");
          box.innerHTML = `
            <h4 style="margin:4px 0;font-size:1rem;font-weight:700;">
              ${term.title}
            </h4>
            <p style="margin:0;font-size:0.95rem;line-height:1.7;">
              ${term.body}
            </p>
          `;
        }
      });
    });
  });
})();

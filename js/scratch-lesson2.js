
/* scratch-lesson-geometry.js */
document.addEventListener('DOMContentLoaded', () => {
  const terms = {
    'المتغير': 'مكان في الذاكرة نخزّن فيه قيمة يمكن تغييرها أثناء التشغيل؛ مثل طول الضلع.',
    'لبنة_مخصصة': 'لبنة تقوم بإنشائها لتجميع أوامر متكررة في أمر واحد قابل لإعادة الاستخدام.'
  };

  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  function openModal(t, html){
    title.textContent = t;
    body.innerHTML = `<p>${html}</p>`;
    modal.classList.remove('hidden');
  }

  function closeModal(){
    modal.classList.add('hidden');
  }

  document.querySelectorAll('.link-term').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.term || btn.textContent.trim();
      const k = key.replace(/\s+/g, '_');
      if(terms[k] || terms[key]){
        openModal(btn.textContent.trim(), terms[k] || terms[key]);
      }
    });
  });

  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
});

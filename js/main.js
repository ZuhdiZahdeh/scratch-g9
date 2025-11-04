/* =========================
   سلوكيات عامة خفيفة
   ========================= */
(function(){
  // تفعيل روابط خارجية تفتح في تبويب جديد تلقائياً (اختياري ولطيف)
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[rel~="external"]').forEach(a => a.target = '_blank');
  });
})();

/* Lightbox خفيف بدون مكتبات (6 أسطر تقريبًا) */
(()=>{
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);

  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-lightbox]');
    if(!a) return;
    e.preventDefault();
    lb.querySelector('img').src = a.getAttribute('href');
    lb.classList.add('open');
  });

  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') lb.classList.remove('open'); });
})();

/* Scratch text → colored blocks renderer
 * يحوّل  <pre class="scratch-code"><code>...</code></pre>
 * إلى أسطر ملوّنة بلا فراغات سوداء، مع دعم:
 *  - تعبيرات داخل الأقواس (مثل ((360)/(6)))
 *  - تلوين end كـ Control
 */

(() => {
  const CATS = {
    events: 'events',
    pen: 'pen',
    motion: 'motion',
    control: 'control',
    looks: 'looks',
    sound: 'sound',
    sensing: 'sensing',
    operators: 'operators',
    variables: 'variables',
    myblocks: 'myblocks'
  };

  /* قواعد التصنيف (مرتبة بالأولوية) */
  const RULES = [
    // Events
    [CATS.events, /^\s*(when green flag clicked|when .* key pressed|when this sprite clicked)/i],

    // Pen
    [CATS.pen, /^\s*(erase all|pen (?:up|down)|set pen (?:size|color) to|change pen color by)/i],

    // Control (تشمل end وrepeat/forever/wait/if/else)
    [CATS.control, /^\s*(repeat\s*\([^)]+\)|forever|end|wait\s*\([^)]+\)\s*seconds?|if\b|else\b|stop(?: all)?)/i],

    // Motion (تتحمل تعبيرات داخل الأقواس)
    [CATS.motion, /^\s*(go to|glide|move|turn\s+(?:right|left)|point(?: in direction)?|set rotation style)/i],

    // Variables
    [CATS.variables, /^\s*(set\s+\[.+?\]\s+to|change\s+\[.+?\]\s+by)/i],

    // My Blocks (تعريف/استدعاء)
    [CATS.myblocks, /^\s*(define\s+.+|call\s+.+)/i],

    // Looks/Sound/Sensing
    [CATS.looks, /^\s*(say|think|switch costume|next costume|show|hide)/i],
    [CATS.sound, /^\s*(play sound|start sound|stop all sounds|set volume)/i],
    [CATS.sensing, /^\s*(ask|answer|touching|key .* pressed\?)/i],

    // Operators (لو ظهر أي عامل/دالة رياضية)
    [CATS.operators, /[+\-*/%]|(?:<|>|=)|(?:pick random|round|join|length|letter|of)/i]
  ];

  const escapeHtml = s => s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');

  function categorize(line) {
    const s = (line || '').trim();
    if (!s) return 'blank';
    for (const [cat, re] of RULES) {
      if (re.test(s)) return cat;
    }
    // افتراضيًا نعتبرها حركة (غالبية أوامر الرسم)
    return CATS.motion;
  }

  function renderPre(pre) {
    const code = pre.querySelector('code');
    const raw = (code ? code.textContent : pre.textContent || '').replace(/\r/g,'');
    const lines = raw.split('\n');

    // نحذف الأسطر الفارغة ونمنع إدراج \n لئلا تظهر فواصل سوداء
    const html = lines
      .map(l => l.replace(/\s+$/,''))     // إزالة المسافات في آخر السطر
      .filter(l => l.trim() !== '')
      .map(l => {
        const cat = categorize(l);
        return `<span class="line" data-cat="${cat}">${escapeHtml(l)}</span>`;
      })
      .join('');

    // استبدال <pre> بحاوية الأسطر الملونة
    const box = document.createElement('div');
    box.className = 'scratch-code';
    box.setAttribute('dir','ltr');
    box.innerHTML = html;
    pre.replaceWith(box);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre.scratch-code').forEach(renderPre);
  });
})();

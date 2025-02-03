function loadResource(type, attributes) {
    if (type === 'style') {
        const style = document.createElement('style');
        style.textContent = attributes.css;
        document.head.appendChild(style);
    }
}

function createTOC() {
    const tocElement = document.createElement('div');
    tocElement.className = 'toc';
    tocElement.classList.add('show');
        
    const contentContainer = document.querySelector('.markdown-body');
    contentContainer.appendChild(tocElement);

    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        
        link.setAttribute('data-id', heading.id);
        
        link.className = 'toc-link';
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 10}px`;
        tocElement.appendChild(link);
    });

    
    tocElement.insertAdjacentHTML('beforeend', '<a class="toc-end" onclick="window.scrollTo({top:0,behavior: \'smooth\'});">⬆️</a>');
    contentContainer.prepend(tocElement);
}

function highlightTOC() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const fromTop = window.scrollY + 10;

    let currentHeading = null;

    tocLinks.forEach(link => {
        const section = document.getElementById(link.getAttribute('data-id'));
        if (section && section.offsetTop <= fromTop) {
            currentHeading = link;
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active-toc');
    });

    if (currentHeading) {
        currentHeading.classList.add('active-toc');

        // 确保当前高亮的目录项在可视区域的中间
        currentHeading.scrollIntoView({
            block: 'center',   // 确保当前高亮项滚动到视图中间位置
            inline: 'nearest'  // 可选，保持水平滚动条不动
        });
    }
}

function toggleTOC() {
    const tocElement = document.querySelector('.toc');
    const tocIcon = document.querySelector('.toc-icon');
    if (tocElement) {
        tocElement.classList.toggle('show');
        tocIcon.classList.toggle('active');
        tocIcon.textContent = tocElement.classList.contains('show') ? '✖' : '☰';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createTOC();
    const css = `:root { 
    --toc-bg: rgba(18, 18, 18, 0.9);  /* 暗黑背景 */
    --toc-border: #333333;             /* 暗灰色边框 */
    --toc-text: #e1e1e1;               /* 浅灰色文字 */
    --toc-hover: #007aff;              /* Apple蓝色悬停效果 */
    --toc-icon-bg: #2c2c2e;            /* 深色图标背景 */
    --toc-icon-color: #ffffff;         /* 白色图标颜色 */
    --toc-icon-active-bg: #ff2d55;     /* 激活时的红色背景 */
    --toc-icon-active-color: #ffffff;  /* 激活时的白色图标 */
    }
    
    .toc {
        position: fixed;
        bottom: 60px;
        right: 20px;
        width: 250px;
        max-height: 70vh;
        background-color: var(--toc-bg);
        border: 1px solid var(--toc-border);
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3); /* 增强阴影效果 */
        overflow-y: auto;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.9);
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    }
    
    .toc.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
    }
    
    .toc a {
        display: block;
        border-radius: 8px;
        color: var(--toc-text);
        text-decoration: none;
        padding: 5px 0;
        font-size: 14px;
        line-height: 1.5;
        border-bottom: 1px solid var(--toc-border);
        transition: background-color 0.2s ease, padding-left 0.2s ease;
    }
    
    .toc a:last-child {
        border-bottom: none;
    }
    
    .toc a:hover {
        background-color: var(--toc-hover);
        padding-left: 5px;
        border-radius: 8px;
    }
    
    .toc-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        font-size: 24px;
        background-color: var(--toc-icon-bg);
        color: var(--toc-icon-color);
        border: 2px solid var(--toc-icon-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0,0,0,0.5); /* 增强阴影效果 */
        z-index: 1001;
        transition: all 0.3s ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    
    .toc-icon:hover {
        transform: scale(0.9);
    }
    
    .toc-icon:active {
        transform: scale(0.9);
    }
    
    .toc-icon.active {
        background-color: var(--toc-icon-active-bg);
        color: var(--toc-icon-active-color);
        border-color: var(--toc-icon-active-bg);
        transform: rotate(90deg);
    }
    
    .toc-end {
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        visibility: hidden;
        background-color: #2c2c2e;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid var(--toc-border);
    }
    
    .active-toc {
        font-weight: bold;
        border-radius: 8px;
        background-color: var(--toc-hover);
        padding-left: 5px;
    }
    `;
    loadResource('style', {css: css});

    const tocIcon = document.createElement('div');
    tocIcon.className = 'toc-icon';
    
    tocIcon.classList.add('active');
    
    tocIcon.textContent = '✖';
    tocIcon.onclick = (e) => {
        e.stopPropagation();
        toggleTOC();
    };
    document.body.appendChild(tocIcon);

    window.onscroll = function() {
        const backToTopButton = document.querySelector('.toc-end');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style="visibility: visible;background-color: white;"
        } else {
            backToTopButton.style="visibility: hidden;background-color: white;"
        }
    };

    document.addEventListener('scroll', highlightTOC);
    
    document.addEventListener('click', (e) => {
        const tocElement = document.querySelector('.toc');
        if (tocElement && tocElement.classList.contains('show') && !tocElement.contains(e.target) && e.target.classList.contains('toc-icon')) {
            toggleTOC();
            
        }
    });
});

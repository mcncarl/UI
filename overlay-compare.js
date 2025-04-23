/**
 * 覆盖层对比效果脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化对比效果
    initCompareEffect();
    
    // 为导航设置平滑滚动效果
    initSmoothScroll();
});

/**
 * 初始化对比效果
 */
function initCompareEffect() {
    // 获取所有演示盒子
    const demoBoxes = document.querySelectorAll('.demo-box');
    
    demoBoxes.forEach(box => {
        // 创建对比模式的结构
        setupCompareStructure(box);
    });
    
    // 设置滑块拖动事件
    setupSliders();
}

/**
 * 为每个演示盒子设置对比结构
 */
function setupCompareStructure(demoBox) {
    // 获取原始覆盖层元素
    const overlay = demoBox.querySelector('[class*="overlay"], [class*="blur"], [class*="glass"], [class*="morphism"], [class*="effect"], [class*="texture"], [class*="acrylic"], [class*="matte"]');
    
    if (!overlay) return;
    
    // 保存原始内容
    const originalContent = demoBox.innerHTML;
    const overlayClass = overlay.className;
    
    // 清空原有内容
    demoBox.innerHTML = '';
    
    // 创建左侧（原始图像）
    const originalSide = document.createElement('div');
    originalSide.className = 'compare-original';
    originalSide.style.position = 'absolute';
    originalSide.style.top = '0';
    originalSide.style.left = '0';
    originalSide.style.width = '50%';
    originalSide.style.height = '100%';
    originalSide.style.overflow = 'hidden';
    
    // 创建内容
    const demoContent = document.createElement('div');
    demoContent.className = 'demo-content';
    demoContent.style.position = 'absolute';
    demoContent.style.top = '50%';
    demoContent.style.left = '50%';
    demoContent.style.transform = 'translate(-50%, -50%)';
    demoContent.style.zIndex = '10';
    demoContent.style.width = '100%';
    demoContent.innerHTML = `<h3 class="font-medium text-lg text-white text-center">${demoBox.closest('.bg-white').querySelector('h3').textContent}</h3>`;
    
    // 创建右侧（有效果）
    const effectSide = document.createElement('div');
    effectSide.className = 'compare-effect';
    effectSide.style.position = 'absolute';
    effectSide.style.top = '0';
    effectSide.style.right = '0';
    effectSide.style.width = '50%';
    effectSide.style.height = '100%';
    effectSide.style.overflow = 'hidden';
    
    // 添加覆盖层到右侧
    const newOverlay = document.createElement('div');
    newOverlay.className = overlayClass;
    newOverlay.style.position = 'absolute';
    newOverlay.style.inset = '0';
    
    effectSide.appendChild(newOverlay);
    
    // 创建滑块
    const slider = document.createElement('div');
    slider.className = 'compare-slider';
    slider.style.position = 'absolute';
    slider.style.top = '0';
    slider.style.bottom = '0';
    slider.style.left = '50%';
    slider.style.width = '4px';
    slider.style.backgroundColor = 'white';
    slider.style.zIndex = '15';
    slider.style.transform = 'translateX(-50%)';
    slider.style.cursor = 'ew-resize';
    
    // 创建滑块手柄
    const handle = document.createElement('div');
    handle.className = 'compare-handle';
    handle.style.position = 'absolute';
    handle.style.top = '50%';
    handle.style.left = '50%';
    handle.style.transform = 'translate(-50%, -50%)';
    handle.style.width = '32px';
    handle.style.height = '32px';
    handle.style.borderRadius = '50%';
    handle.style.backgroundColor = 'white';
    handle.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.1)';
    
    // 创建指示箭头
    const arrows = document.createElement('div');
    arrows.className = 'compare-arrows';
    arrows.style.position = 'absolute';
    arrows.style.top = '50%';
    arrows.style.left = '50%';
    arrows.style.transform = 'translate(-50%, -50%)';
    arrows.style.width = '16px';
    arrows.style.height = '16px';
    arrows.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"></path><path d="M3 11l4 4-4 4"></path><path d="M21 5H9"></path><path d="M7 19H3"></path></svg>';
    
    // 添加标签
    const beforeLabel = document.createElement('div');
    beforeLabel.className = 'compare-label compare-before';
    beforeLabel.textContent = '无效果';
    beforeLabel.style.position = 'absolute';
    beforeLabel.style.top = '10px';
    beforeLabel.style.left = '10px';
    beforeLabel.style.backgroundColor = 'rgba(0,0,0,0.5)';
    beforeLabel.style.color = 'white';
    beforeLabel.style.padding = '4px 8px';
    beforeLabel.style.borderRadius = '4px';
    beforeLabel.style.fontSize = '12px';
    
    const afterLabel = document.createElement('div');
    afterLabel.className = 'compare-label compare-after';
    afterLabel.textContent = '有效果';
    afterLabel.style.position = 'absolute';
    afterLabel.style.top = '10px';
    afterLabel.style.right = '10px';
    afterLabel.style.backgroundColor = 'rgba(0,0,0,0.5)';
    afterLabel.style.color = 'white';
    afterLabel.style.padding = '4px 8px';
    afterLabel.style.borderRadius = '4px';
    afterLabel.style.fontSize = '12px';
    
    // 组装组件
    slider.appendChild(handle);
    handle.appendChild(arrows);
    
    originalSide.appendChild(beforeLabel);
    effectSide.appendChild(afterLabel);
    
    // 将所有新元素添加到演示盒子
    demoBox.appendChild(originalSide);
    demoBox.appendChild(effectSide);
    demoBox.appendChild(demoContent.cloneNode(true));
    demoBox.appendChild(slider);
    
    // 添加类名标记已处理
    demoBox.classList.add('compare-enabled');
}

/**
 * 设置滑块拖动事件
 */
function setupSliders() {
    const sliders = document.querySelectorAll('.compare-slider');
    
    sliders.forEach(slider => {
        let isDragging = false;
        const demoBox = slider.closest('.demo-box');
        
        // 鼠标/触摸事件
        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        
        function startDrag(e) {
            isDragging = true;
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const boxRect = demoBox.getBoundingClientRect();
            let position = (clientX - boxRect.left) / boxRect.width * 100;
            
            // 限制位置在5%到95%之间
            position = Math.max(5, Math.min(95, position));
            
            // 更新元素位置
            slider.style.left = `${position}%`;
            demoBox.querySelector('.compare-original').style.width = `${position}%`;
            demoBox.querySelector('.compare-effect').style.width = `${100 - position}%`;
        }
        
        function endDrag() {
            isDragging = false;
        }
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
} 
(function() {
    const splash = document.getElementById('splashScreen');
    const mainContainer = document.getElementById('v3');
    const footer = document.getElementById('v12');
    const clickPromptSpan = document.getElementById('clickPrompt');
    const starfieldDiv = document.getElementById('starfield');
    const bgVideoElem = document.getElementById('bgVideo');
    const toastElem = document.getElementById('globalToast');
    
    function showToastMessage() {
        if (!toastElem) return;
        toastElem.classList.add('show');
        setTimeout(() => {
            toastElem.classList.remove('show');
        }, 2800);
    }
    
    setTimeout(() => {
        showToastMessage();
    }, 500);
    
    function generatePremiumStarfield() {
        starfieldDiv.innerHTML = '';
        const starCount = 420;
        const stars = [];
        const starTypes = ['type-a', 'type-b', 'type-c', 'type-d'];
        const twinkleTypes = ['twinkle-fast', 'twinkle-slow', 'twinkle-mid', 'twinkle-rapid'];
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const typeIdx = Math.floor(Math.random() * starTypes.length);
            star.classList.add(starTypes[typeIdx]);
            const size = Math.random() * 5.5 + 0.6;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            let animClass = twinkleTypes[Math.floor(Math.random() * twinkleTypes.length)];
            star.classList.add(animClass);
            star.style.animationDuration = (Math.random() * 5 + 1) + 's';
            star.style.animationDelay = Math.random() * 20 + 's';
            starfieldDiv.appendChild(star);
            stars.push({ el: star, x: parseFloat(star.style.left), y: parseFloat(star.style.top), speedX: (Math.random() - 0.5) * 0.008, speedY: (Math.random() - 0.5) * 0.006 });
        }
        for (let i = 0; i < 40; i++) {
            const shooting = document.createElement('div');
            shooting.classList.add('shooting-star');
            shooting.style.top = Math.random() * 100 + '%';
            shooting.style.left = Math.random() * 100 + '%';
            shooting.style.animationDelay = Math.random() * 22 + 's';
            shooting.style.animationDuration = (Math.random() * 4 + 2) + 's';
            const length = Math.random() * 80 + 40;
            shooting.style.width = length + 'px';
            shooting.style.height = (Math.random() * 2 + 1) + 'px';
            starfieldDiv.appendChild(shooting);
        }
        setInterval(() => {
            stars.forEach(star => {
                let newX = star.x + star.speedX;
                let newY = star.y + star.speedY;
                if (newX > 100) newX = 0;
                if (newX < 0) newX = 100;
                if (newY > 100) newY = 0;
                if (newY < 0) newY = 100;
                star.x = newX;
                star.y = newY;
                star.el.style.left = newX + '%';
                star.el.style.top = newY + '%';
            });
        }, 480);
        const starClusterCount = 8;
        for (let c = 0; c < starClusterCount; c++) {
            const centerX = Math.random() * 100;
            const centerY = Math.random() * 100;
            const clusterSize = Math.random() * 12 + 6;
            for (let s = 0; s < 25; s++) {
                const clusterStar = document.createElement('div');
                clusterStar.classList.add('star');
                clusterStar.classList.add(starTypes[Math.floor(Math.random() * starTypes.length)]);
                clusterStar.classList.add('twinkle-mid');
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * clusterSize;
                const offsetX = Math.cos(angle) * radius;
                const offsetY = Math.sin(angle) * radius;
                let left = centerX + offsetX;
                let top = centerY + offsetY;
                if (left > 100) left = 100;
                if (left < 0) left = 0;
                if (top > 100) top = 100;
                if (top < 0) top = 0;
                clusterStar.style.left = left + '%';
                clusterStar.style.top = top + '%';
                const size = Math.random() * 4 + 1;
                clusterStar.style.width = size + 'px';
                clusterStar.style.height = size + 'px';
                clusterStar.style.animationDuration = (Math.random() * 4 + 1.2) + 's';
                starfieldDiv.appendChild(clusterStar);
            }
        }
        const dustColors = ['gold', 'blue', 'purple'];
        for (let d = 0; d < 60; d++) {
            const dust = document.createElement('div');
            dust.classList.add('dust-particle');
            dust.classList.add(dustColors[Math.floor(Math.random() * dustColors.length)]);
            const size = Math.random() * 3 + 0.8;
            dust.style.width = size + 'px';
            dust.style.height = size + 'px';
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            dust.style.animation = `dustFloat ${Math.random() * 8 + 6}s infinite ease-in-out`;
            dust.style.animationDelay = Math.random() * 10 + 's';
            starfieldDiv.appendChild(dust);
        }
    }
    generatePremiumStarfield();
    
    let fullBase = '> CLICK ANYWHERE';
    let cursorSymbol = '_';
    let stepIndex = 0;
    let typeTimer = null;
    let blinkTimer = null;
    
    function startTypingEffect() {
        if (typeTimer) clearInterval(typeTimer);
        stepIndex = 0;
        clickPromptSpan.innerText = '';
        typeTimer = setInterval(function() {
            if (stepIndex <= fullBase.length) {
                let shownPart = fullBase.substring(0, stepIndex);
                clickPromptSpan.innerText = shownPart + cursorSymbol;
                stepIndex++;
            } else {
                clearInterval(typeTimer);
                typeTimer = null;
                blinkTimer = setInterval(function() {
                    if (clickPromptSpan.innerText.includes(cursorSymbol)) {
                        clickPromptSpan.innerText = clickPromptSpan.innerText.replace(cursorSymbol, '');
                    } else {
                        clickPromptSpan.innerText = fullBase + cursorSymbol;
                    }
                }, 550);
            }
        }, 90);
    }
    startTypingEffect();
    
    let starAnimationActive = true;
    function animateStarsDynamically() {
        if (!starAnimationActive) return;
        const stars = document.querySelectorAll('#starfield .star');
        stars.forEach(star => {
            let currOp = parseFloat(star.style.opacity);
            if (isNaN(currOp)) currOp = 0.5;
            let delta = (Math.random() - 0.5) * 0.25;
            let newOp = Math.min(1, Math.max(0.15, currOp + delta));
            star.style.opacity = newOp;
        });
        setTimeout(() => { if(starAnimationActive) animateStarsDynamically(); }, 400);
    }
    animateStarsDynamically();
    
    let isTransitioning = false;
    
    function enterMainPageAndPlayVideo() {
        if (isTransitioning) return;
        isTransitioning = true;
        if (typeTimer) clearInterval(typeTimer);
        if (blinkTimer) clearInterval(blinkTimer);
        starAnimationActive = false;
        splash.classList.add('splash-hidden');
        setTimeout(() => {
            if (mainContainer) mainContainer.style.opacity = '1';
            if (footer) footer.style.opacity = '1';
            if (bgVideoElem) {
                bgVideoElem.style.opacity = '1';
                bgVideoElem.play().then(() => {
                    if (bgVideoElem) bgVideoElem.volume = 0.35;
                }).catch(e => console.log("video play resume"));
            }
            const nebula = document.getElementById('nebulaGlow');
            if (nebula) nebula.style.opacity = '0';
            splash.style.display = 'none';
        }, 1150);
    }
    
    function onUserClick(e) {
        e.preventDefault();
        if (!isTransitioning) {
            enterMainPageAndPlayVideo();
        }
        window.removeEventListener('click', onUserClick);
        window.removeEventListener('touchstart', onUserClick);
    }
    
    window.addEventListener('click', onUserClick);
    window.addEventListener('touchstart', onUserClick);
    
    if (bgVideoElem) {
        bgVideoElem.pause();
        bgVideoElem.style.opacity = '0';
        bgVideoElem.currentTime = 0;
    }
    
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=0.3, user-scalable=yes, minimum-scale=0.3, maximum-scale=1.0');
    }
})();

const REAL_API_KEY = "Admin_LATstudio_CCat_JiaoMama_0";
const STORAGE_KEY = "delta_last_success_time";

function loadLastSuccessTime() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = parseInt(stored, 10);
    if (isNaN(parsed)) return null;
    return parsed;
}

function saveLastSuccessTime(timestamp) {
    localStorage.setItem(STORAGE_KEY, timestamp.toString());
}

let lastSuccessTime = loadLastSuccessTime();
const COOLDOWN_MS = 10 * 60 * 1000;
let cooldownIntervalId = null;

const DELTA_DOMAINS = [
    "https://auth.platoboost.com",
    "https://auth.platorelay.com",
    "https://auth.platoboost.net",
    "https://auth.platoboost.click",
    "https://auth.platoboost.app",
    "https://auth.platoboost.me",
    "https://deltaios-executor.com"
];

function containsDeltaLink(content) {
    if (!content || typeof content !== 'string') return false;
    const lower = content.toLowerCase();
    if (lower.includes('platoboost.com') || lower.includes('platoboost.net') ||
        lower.includes('platoboost.click') || lower.includes('platoboost.app') ||
        lower.includes('platoboost.me') || lower.includes('platorelay.com') ||
        lower.includes('deltaios-executor.com')) {
        return true;
    }
    for (let domain of DELTA_DOMAINS) {
        const clean = domain.replace(/^https?:\/\//i, '');
        if (lower.includes(clean)) return true;
    }
    return false;
}

function extractDeltaUrl(text) {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s<>"'“”\[\\\]\(\)]+)/gi;
    const matches = text.match(urlRegex);
    if (matches && matches.length) {
        for (let url of matches) {
            for (let domain of DELTA_DOMAINS) {
                const domainKey = domain.replace(/^https?:\/\//i, '');
                if (url.includes(domainKey)) return url;
            }
        }
        for (let url of matches) {
            if (url.includes('platoboost') || url.includes('platorelay') || url.includes('deltaios')) {
                return url;
            }
        }
        return matches[0];
    }
    for (let domain of DELTA_DOMAINS) {
        const domainClean = domain.replace(/^https?:\/\//i, '');
        if (text.includes(domainClean)) {
            const startIdx = text.indexOf(domainClean);
            let endIdx = startIdx + domainClean.length;
            let remaining = text.substring(endIdx);
            let pathEnd = remaining.search(/\s|$|\n|,|;|"|'/);
            if (pathEnd === -1) pathEnd = remaining.length;
            const fullPath = remaining.substring(0, pathEnd);
            return 'https://' + domainClean + fullPath;
        }
    }
    return null;
}

async function fetchCardFromAPI(deltaUrl, apiKey) {
    const encodedUrl = encodeURIComponent(deltaUrl);
    let endpoint = `bypass.php?url=${encodedUrl}`;
    if (apiKey && apiKey.trim()) {
        endpoint += `&api_key=${encodeURIComponent(apiKey)}`;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    try {
        const res = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'User-Agent': 'DeltaClient/1.0' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
            let errMsg = `HTTP ${res.status}`;
            try {
                const errJson = await res.json();
                errMsg = errJson.message || errJson.error || errMsg;
            } catch(e) {}
            throw new Error(errMsg);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') throw new Error('请求超时，请稍后重试');
        throw new Error(err.message || '网络请求失败');
    }
}

function extractKey(data) {
    if (!data) return null;
    if (data.key && typeof data.key === 'string') return data.key;
    if (data.token) return data.token;
    if (data.card) return data.card;
    if (data.code) return data.code;
    if (data.result && typeof data.result === 'string') return data.result;
    if (data.license) return data.license;
    return null;
}

const linkTextarea = document.getElementById('linkInput');
const fakeApiInput = document.getElementById('fakeApiInput');
const extractBtn = document.getElementById('extractBtn');
const resultContainer = document.getElementById('resultContainer');
const cardSpan = document.getElementById('cardKeySpan');
const copyBtn = document.getElementById('copyCardBtn');
const extraMsgDiv = document.getElementById('extraMsg');
const customApiInput = document.getElementById('customApiInput');

let currentCard = '';
let isUsingCustomKey = false;

function isInCooldown() {
    if (isUsingCustomKey) return false;
    if (!lastSuccessTime) return false;
    const now = Date.now();
    return (now - lastSuccessTime) < COOLDOWN_MS;
}

function getRemainingCooldownMs() {
    if (isUsingCustomKey) return 0;
    if (!lastSuccessTime) return 0;
    const now = Date.now();
    const elapsed = now - lastSuccessTime;
    if (elapsed >= COOLDOWN_MS) return 0;
    return COOLDOWN_MS - elapsed;
}

function getRemainingCooldownText() {
    const remainingMs = getRemainingCooldownMs();
    if (remainingMs <= 0) return '';
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    return `${minutes}分${seconds}秒`;
}

function setLoading(loading) {
    if (loading) {
        if (cooldownIntervalId) {
            clearInterval(cooldownIntervalId);
            cooldownIntervalId = null;
        }
        extractBtn.disabled = true;
        extractBtn.innerHTML = '<span class="spinner-glass"></span> bypassing ...';
        resultContainer.style.display = 'block';
        cardSpan.innerText = '正在绕过中 请稍候';
        extraMsgDiv.innerHTML = '';
        currentCard = '';
    } else {
        updateCooldownButtonState();
    }
}

function updateCooldownButtonState() {
    if (isInCooldown()) {
        extractBtn.disabled = true;
        if (extractBtn.innerHTML.includes('稍等')) return;
        if (cooldownIntervalId) clearInterval(cooldownIntervalId);
        const updateButtonText = () => {
            if (!isInCooldown()) {
                extractBtn.disabled = false;
                extractBtn.innerHTML = 'Bypass';
                if (cooldownIntervalId) {
                    clearInterval(cooldownIntervalId);
                    cooldownIntervalId = null;
                }
            } else {
                const remainingText = getRemainingCooldownText();
                extractBtn.innerHTML = `${remainingText}`;
            }
        };
        updateButtonText();
        cooldownIntervalId = setInterval(updateButtonText, 1000);
    } else {
        if (cooldownIntervalId) {
            clearInterval(cooldownIntervalId);
            cooldownIntervalId = null;
        }
        extractBtn.disabled = false;
        extractBtn.innerHTML = 'Bypass';
    }
}

function showResult(cardKey, errorMsg = null) {
    resultContainer.style.display = 'block';
    if (errorMsg) {
        cardSpan.innerText = '失败';
        extraMsgDiv.innerHTML = `<span class="error-text">错误: ${escapeHtml(errorMsg)}</span>`;
        currentCard = '';
    } else {
        if (cardKey && cardKey.trim()) {
            cardSpan.innerText = cardKey.trim();
            currentCard = cardKey.trim();
            extraMsgDiv.innerHTML = '<span style="color:#a5f0a0;">✔ Success</span>';
        } else {
            cardSpan.innerText = '无有效apikey';
            extraMsgDiv.innerHTML = '<span class="error-text">响应数据缺失</span>';
            currentCard = '';
        }
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function onExtract() {
    const customKey = customApiInput.value.trim();
    isUsingCustomKey = (customKey.length > 0);
    if (isInCooldown()) {
        const remaining = getRemainingCooldownText();
        alert(`请等待 ${remaining} 后再试`);
        return;
    }
    
    const rawText = linkTextarea.value.trim();
    
    if (!rawText) {
        alert('请粘贴Delta链接');
        return;
    }
    
    if (!containsDeltaLink(rawText)) {
        alert('无效的Delta链接，请检查链接是否来自 platoboost.com 等域名');
        return;
    }
    
    let targetUrl = extractDeltaUrl(rawText);
    if (!targetUrl) {
        alert('无法从内容中提取链接');
        return;
    }
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }
    
    const apiKeyToUse = isUsingCustomKey ? customKey : REAL_API_KEY;
    
    setLoading(true);
    let requestFailed = true;
    
    try {
        const apiResult = await fetchCardFromAPI(targetUrl, apiKeyToUse);
        if (apiResult && (apiResult.error === true || apiResult.status === 'error')) {
            const errMsg = apiResult.message || apiResult.errorMessage || 'API错误';
            requestFailed = true;
            showResult(null, errMsg);
            setLoading(false);
            return;
        }
        const card = extractKey(apiResult);
        if (card) {
            requestFailed = false;
            showResult(card, null);
            if (!isUsingCustomKey) {
                lastSuccessTime = Date.now();
                saveLastSuccessTime(lastSuccessTime);
            }
            updateCooldownButtonState();
        } else {
            const failReason = apiResult?.message || '未返回卡密字段';
            requestFailed = true;
            showResult(null, failReason);
        }
    } catch (err) {
        requestFailed = true;
        let errorMessage = err.message || '网络异常';
        if (errorMessage.includes('Failed to fetch')) {
            errorMessage = '无法连接服务器，请确保在PHP环境下运行（使用php -S localhost:8000启动）';
        }
        showResult(null, errorMessage);
    } finally {
        setLoading(false);
        if (requestFailed && !isUsingCustomKey) {
            updateCooldownButtonState();
        } else if (requestFailed && isUsingCustomKey) {
            extractBtn.disabled = false;
            extractBtn.innerHTML = 'Bypass';
        }
    }
}

function copyCard() {
    if (!currentCard) {
        alert('没有可复制的卡密');
        return;
    }
    navigator.clipboard.writeText(currentCard).then(() => {
        copyBtn.innerHTML = '已复制';
        setTimeout(() => {
            copyBtn.innerHTML = '复制';
        }, 1200);
    }).catch(() => {
        alert('复制失败，手动选取吧');
    });
}

extractBtn.addEventListener('click', onExtract);
copyBtn.addEventListener('click', copyCard);

resultContainer.style.display = 'none';

fakeApiInput.value = "稍等";
fakeApiInput.addEventListener('input', function() {
    if (fakeApiInput.value !== "fuck you") {
        fakeApiInput.value = "fuck you";
    }
});

updateCooldownButtonState();

window.addEventListener('beforeunload', function() {
    if (cooldownIntervalId) {
        clearInterval(cooldownIntervalId);
    }
});
// =================================
// アンカーリンク
// =================================
document.addEventListener('DOMContentLoaded', function () {
    const windowWidth = window.innerWidth;
    const windowSm = 768;
    const headerHeight = windowWidth <= windowSm ? 0 : 0; // モバイルとPCの切替え（同値なら共通でもOK）

    // すべての #リンクを取得
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                scrollToPosition(document.documentElement, headerHeight);
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const position = target.getBoundingClientRect().top + window.scrollY - headerHeight + 5;
                    window.scrollTo({
                        top: position,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function scrollToPosition(targetElement, offset) {
        const position = targetElement.getBoundingClientRect().top + window.scrollY - offset + 5;
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }
});

// =================================
// ハンバーガーボタンのクリック時挙動
// =================================
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.js-btn-menu');
    const navigation = document.querySelector('.js-nav');
    const navigationLinks = document.querySelectorAll('.js-nav a');
    const closeBtn = document.querySelector('.js-nav-close');

    menuButton.addEventListener('click', function () {
        navigation.classList.toggle('on');
        menuButton.classList.toggle('on');
    });

    navigationLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navigation.classList.remove('on');
            menuButton.classList.remove('on');
        });
    });
    closeBtn.addEventListener('click', function () {
        navigation.classList.remove('on');
        menuButton.classList.remove('on');
    });
});


// =================================
// スライドトグル
// =================================
document.addEventListener('DOMContentLoaded', function () {
    // すべてのトグルボタンを取得
    const toggleButtons = document.querySelectorAll('.js-tglBtn');

    // 各ボタンにイベントリスナーを設定
    toggleButtons.forEach(function (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const toggleContent = toggleButton.nextElementSibling; // 各ボタンに隣接する要素

            // 要素が非表示状態かどうかを高さで判断
            if (toggleContent.style.height === '0px' || toggleContent.style.height === '') {
                // スライドダウン
                let fullHeight = toggleContent.scrollHeight;
                toggleContent.style.height = fullHeight + 'px'; // 実際の内容の高さに設定
                toggleButton.classList.add('on');
            } else {
                // スライドアップ
                toggleContent.style.height = '0px';
                toggleButton.classList.remove('on');
            }
        });
    });
});

// =================================
// ハンバーガーボタンの表示 （トップへ戻るボタンと同じ挙動）
// =================================
document.addEventListener('DOMContentLoaded', function () {
    const toTopBtn = document.querySelector('.js-btn-menu');
    const footer = document.querySelector('footer');

    if (!toTopBtn || !footer) return;

    window.addEventListener('scroll', function () {
        const h = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + h;
        const footerHeight = footer.offsetHeight;

        // スクロール位置による表示切替
        if (scrollPosition < h + 180) {
            toTopBtn.style.opacity = "0";
            toTopBtn.style.transition = ".3s";
        } else {
            toTopBtn.style.opacity = "1";
        }

        // フッターにかかる場合は絶対配置、それ以外は固定
        if (scrollHeight - scrollPosition <= footerHeight) {
            toTopBtn.style.position = "absolute";
            toTopBtn.style.transition = "none";
            toTopBtn.style.bottom = (footerHeight + 50) + "px";
        } else {
            toTopBtn.style.position = "fixed";
            toTopBtn.style.bottom = "50px";
        }
    });
});

// ===============================================
//  Intersection Observer （Inviewのような動き）
// ===============================================
// fade-in-up
document.addEventListener('DOMContentLoaded', function () {
    const targets = document.querySelectorAll('.js-fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
});
// fade-in-left
document.addEventListener('DOMContentLoaded', function () {
    const targets = document.querySelectorAll('.js-fade-in-left');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
});
// fade-in-right
document.addEventListener('DOMContentLoaded', function () {
    const targets = document.querySelectorAll('.js-fade-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
});
// fade-in-bottom
document.addEventListener('DOMContentLoaded', function () {
    const targets = document.querySelectorAll('.js-fade-in-bottom');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
});



// ===============================================
// INCLUDES
// ===============================================
async function writeInclude(url, rootDir, scriptElement) {
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        let html = await res.text();
        html = html.replace(/\{\$root\}/g, rootDir);

        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        // script の前に挿入（scriptタグの位置に表示される）
        scriptElement.parentNode.insertBefore(wrapper, scriptElement);
    } catch (err) {
        console.error("Include load failed:", url, err);
    }
}

// header
function writeHeader(rootDir) {
    const main = document.querySelector('main');
    return loadAndInsertHtml(`${rootDir}includes/header.html`, rootDir, main, 'beforebegin');
}
// footer
function writeFooter(rootDir) {
    loadAndWriteHtml(`${rootDir}includes/footer.html`, rootDir, document.body);
}




// ===============================================
// ポップアップ
// ===============================================
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('[class*="js-popup-"]');
    const popups = document.querySelectorAll('.c-popup');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const matchedClass = [...this.classList].find(cls => cls.startsWith('js-popup-'));
            if (!matchedClass) return;

            const popupId = matchedClass.replace('js-popup-', 'popup-');
            const targetPopup = document.getElementById(popupId);

            popups.forEach(p => {
                p.classList.remove('is-visible');
                p.setAttribute('aria-hidden', 'true');
            });

            if (targetPopup) {
                targetPopup.classList.add('is-visible');
                targetPopup.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // 背景クリックで閉じる
    popups.forEach(popup => {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('is-visible');
                this.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // クローズボタンで閉じる
    const closeButtons = document.querySelectorAll('.js-popup-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const popup = btn.closest('.c-popup');
            popup.classList.remove('is-visible');
            popup.setAttribute('aria-hidden', 'true');
        });
    });
});


// ===============================================
// ナビメニューのカレント表示
// ===============================================
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll('.p-top-nav__item a');
    const sections = document.querySelectorAll('section[id]');

    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // 画面中央付近に達したとき
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.p-top-nav__item a[data-target="${id}"]`);
                const currentLi = navLink.closest('li');
                const img = navLink.querySelector('img');

                // 全ての画像とliのクラスをリセット
                navItems.forEach(link => {
                    const li = link.closest('li');
                    li.classList.remove('on');

                    const linkImg = link.querySelector('img');
                    const resetSrc = linkImg.getAttribute('src').replace('_on.png', '.png');
                    linkImg.setAttribute('src', resetSrc);
                });

                // 該当ナビに_on画像と.onクラスを付与
                currentLi.classList.add('on');
                const newSrc = img.getAttribute('src').replace('.png', '_on.png');
                img.setAttribute('src', newSrc);
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
});

// ===============================================
// MVのswiper
// ===============================================
document.addEventListener("DOMContentLoaded", function () {
    const mySwiper = new Swiper('.swiper', {
        // オプション
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        speed: 1000,
        // autoHeight: true,
        effect: "fade",
        autoplay: {
            disableOnInteraction: false,
            delay: 3000,
        },

        // ページネーション
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // ブレイクポイント
        breakpoints: {
            // 769px以上の場合
            769: {
                slidesPerView: 1,
            },
        },
    });
});

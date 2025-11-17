document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const cursorEffect = document.getElementById('cursor-effect');
    const mainPage = document.getElementById('main-page');
    const formPage = document.getElementById('form-page');
    const resultPage = document.getElementById('result-page');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const dateForm = document.getElementById('date-form');
    const restartBtn = document.getElementById('restart-btn');
    
    // Variables
    let noClickCount = 0;
    const flowers = ['💐', '🌸', '🌹', '🌺', '🌷', '💮', '🏵️'];
    
    // Cursor flower effect
    document.addEventListener('mousemove', function(e) {
        cursorEffect.style.left = e.pageX + 'px';
        cursorEffect.style.top = e.pageY + 'px';
        
        // Create floating flowers occasionally
        if (Math.random() > 0.9) {
            createFloatingFlower(e.pageX, e.pageY);
        }
    });
    
    function createFloatingFlower(x, y) {
        const flower = document.createElement('div');
        flower.className = 'floating-flower';
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = x + 'px';
        flower.style.top = y + 'px';
        document.body.appendChild(flower);
        
        // Animation
        setTimeout(() => {
            flower.style.transform = 'translateY(-30px) rotate(360deg)';
            flower.style.opacity = '0';
        }, 50);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(flower);
        }, 1000);
    }
    
    // Add floating flower style
    const style = document.createElement('style');
    style.textContent = `
        .floating-flower {
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9998;
            transition: all 1s ease;
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
    `;
    document.head.appendChild(style);
    
    // No button functionality
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        noClickCount++;

        // Increase yes button size
        const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = (currentSize + 10) + 'px';

        // Move no button randomly within container
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const maxX = containerRect.width - btnWidth - 20;
        const maxY = containerRect.height - btnHeight - 20;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        // Change text after several clicks
        if (noClickCount === 3) {
            noBtn.textContent = 'Yakin ga mau?';
        } else if (noClickCount === 5) {
            noBtn.textContent = 'Dipikir dulu dong';
        } else if (noClickCount === 7) {
            noBtn.textContent = 'Pleaseee 😢';
        } else if (noClickCount >= 10) {
            noBtn.textContent = 'OK deh...';
            yesBtn.textContent = 'IYA AKU MAU BANGET!';
        }
    });
    
    // Yes button functionality
    yesBtn.addEventListener('click', function() {
        mainPage.classList.add('hidden');
        formPage.classList.remove('hidden');
        
        // Create celebration effect
        createCelebration();
    });
    
    function createCelebration() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFloatingFlower(x, y);
            }, i * 100);
        }
    }
    
    // Form submission
    dateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('date').value;
        const location = document.querySelector('input[name="location"]:checked').value;
        const photoFile = document.getElementById('photo').files[0];
        
        if (date && location && photoFile) {
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Display results
            document.getElementById('result-date').textContent = formattedDate;
            document.getElementById('result-location').textContent = location;
            
            // Display photo preview
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('result-photo').src = e.target.result;
            };
            reader.readAsDataURL(photoFile);
            
            // Show result page
            formPage.classList.add('hidden');
            resultPage.classList.remove('hidden');
            
            // Create celebration effect
            createCelebration();
        }
    });
    
    // Restart button
    restartBtn.addEventListener('click', function() {
        resultPage.classList.add('hidden');
        formPage.classList.remove('hidden');
        
        // Reset form
        dateForm.reset();
    });
    
    // Prevent context menu on buttons
    noBtn.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    yesBtn.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});
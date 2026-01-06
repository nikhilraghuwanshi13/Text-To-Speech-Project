 const textInput = document.getElementById('textInput');
        const voiceSelect = document.getElementById('voiceSelect');
        const rateControl = document.getElementById('rateControl');
        const pitchControl = document.getElementById('pitchControl');
        const volumeControl = document.getElementById('volumeControl');
        const rateValue = document.getElementById('rateValue');
        const pitchValue = document.getElementById('pitchValue');
        const volumeValue = document.getElementById('volumeValue');
        const speakBtn = document.getElementById('speakBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const status = document.getElementById('status');

        let voices = [];
        let currentUtterance = null;
        let isPaused = false;

        // Load available voices
        function loadVoices() {
            voices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = '';
            
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }

        // Load voices on page load and when they change
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;

        // Update rate display
        rateControl.addEventListener('input', (e) => {
            rateValue.textContent = `${e.target.value}x`;
        });

        // Update pitch display
        pitchControl.addEventListener('input', (e) => {
            pitchValue.textContent = e.target.value;
        });

        // Update volume display
        volumeControl.addEventListener('input', (e) => {
            volumeValue.textContent = `${Math.round(e.target.value * 100)}%`;
        });

        // Update status
        function updateStatus(text, className) {
            status.textContent = text;
            status.className = `status ${className}`;
        }

        // Speak function
        speakBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            
            if (!text) {
                alert('Please enter some text to speak');
                return;
            }

            // Resume if paused
            if (isPaused) {
                speechSynthesis.resume();
                isPaused = false;
                updateStatus('Speaking...', 'speaking');
                pauseBtn.textContent = '⏸ Pause';
                return;
            }

            // Stop any ongoing speech
            speechSynthesis.cancel();

            // Create new utterance
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.voice = voices[voiceSelect.value];
            currentUtterance.rate = parseFloat(rateControl.value);
            currentUtterance.pitch = parseFloat(pitchControl.value);
            currentUtterance.volume = parseFloat(volumeControl.value);

            // Event listeners
            currentUtterance.onstart = () => {
                updateStatus('Speaking...', 'speaking');
                speakBtn.textContent = '▶ Resume';
                pauseBtn.disabled = false;
                stopBtn.disabled = false;
            };

            currentUtterance.onend = () => {
                updateStatus('Finished speaking', 'idle');
                speakBtn.textContent = '▶ Speak';
                pauseBtn.disabled = true;
                stopBtn.disabled = true;
                isPaused = false;
            };

            currentUtterance.onerror = (e) => {
                updateStatus('Error: ' + e.error, 'idle');
                speakBtn.textContent = '▶ Speak';
                pauseBtn.disabled = true;
                stopBtn.disabled = true;
                isPaused = false;
            };

            // Speak
            speechSynthesis.speak(currentUtterance);
        });

        // Pause/Resume function
        pauseBtn.addEventListener('click', () => {
            if (isPaused) {
                speechSynthesis.resume();
                isPaused = false;
                pauseBtn.textContent = '⏸ Pause';
                updateStatus('Speaking...', 'speaking');
            } else {
                speechSynthesis.pause();
                isPaused = true;
                pauseBtn.textContent = '▶ Resume';
                updateStatus('Paused', 'paused');
            }
        });

        // Stop function
        stopBtn.addEventListener('click', () => {
            speechSynthesis.cancel();
            isPaused = false;
            updateStatus('Stopped', 'idle');
            speakBtn.textContent = '▶ Speak';
            pauseBtn.textContent = '⏸ Pause';
            pauseBtn.disabled = true;
            stopBtn.disabled = true;
        });
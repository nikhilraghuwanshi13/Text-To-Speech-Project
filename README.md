# 🔊 Text-to-Speech Web Application

A modern and responsive **Text-to-Speech (TTS)** web application built using **HTML, CSS, and JavaScript**.  
This project uses the **Web Speech API** to convert user-entered text into natural-sounding speech directly in the browser.

---

## 🚀 Features

- Convert text into speech instantly
- Multiple voice options (browser supported)
- Control speech **speed**, **pitch**, and **volume**
- Play, Pause, Resume, and Stop functionality
- Clean and modern responsive UI
- No backend required (client-side only)

---

## 🛠️ Technologies Used

- **HTML5** – Structure of the application  
- **CSS3** – Styling and responsive design  
- **JavaScript (ES6)** – Application logic  
- **Web Speech API** – Text-to-Speech functionality

---

## 📌 API Used

### Web Speech API (SpeechSynthesis)

This project uses the browser’s built-in **Web Speech API**, specifically:

- `speechSynthesis.getVoices()` – Fetch available voices
- `SpeechSynthesisUtterance` – Convert text to speech
- `speechSynthesis.speak()` – Play speech
- `speechSynthesis.pause()` – Pause speech
- `speechSynthesis.resume()` – Resume speech
- `speechSynthesis.cancel()` – Stop speech

✔ No external or third-party API is used.

---

## 🎯 How It Works

1. User enters text in the textarea
2. Selects voice and adjusts speed, pitch, and volume
3. Clicks **Speak** to hear the text
4. Can pause, resume, or stop speech anytime
5. Status updates in real time

---

## 📂 Project Structure


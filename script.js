const synth = window.speechSynthesis;

// Elements
const textform = document.querySelector("form");
const textinput = document.querySelector("#text-input");
const voiceselect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const ratevalue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchvalue = document.querySelector("#pitch-value");
const button = document.querySelector("#btn");

let voices = [];

const getvoices = () => {
    voices = synth.getVoices();
    voiceselect.innerHTML = ''; // clear existing options
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceselect.appendChild(option);
    });
}

getvoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getvoices;
}

const speak = () => {
    if (synth.speaking) {
        console.error("Already Speaking");
        return;
    }

    if (textinput.value !== '') {
        const speakText = new SpeechSynthesisUtterance(textinput.value);

        speakText.onend = e => console.log('Done Speaking');
        speakText.onerror = e => console.error('Something went wrong');

        const selectedVoice = voiceselect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if (voice.name === selectedVoice) speakText.voice = voice;
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }
}

// Event Listeners
button.addEventListener('click', () => {
    speak();
    textinput.blur();
});

textform.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textinput.blur();
});

rate.addEventListener('change', e => ratevalue.textContent = rate.value);
pitch.addEventListener('change', e => pitchvalue.textContent = pitch.value);
voiceselect.addEventListener('change', e => speak());

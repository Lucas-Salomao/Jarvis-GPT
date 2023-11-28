const darkModeToggle = document.getElementById('dark-mode-toggle');
let mode = "light";

darkModeToggle.addEventListener('click', () => {

  if (mode == "light") {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').setAttribute('class', 'fa fa-sun');
    mode = "dark";
  }
  else {
    if (mode == "dark") {
      document.body.classList.toggle('dark-mode');
      darkModeToggle.querySelector('i').setAttribute('class', 'fa fa-moon');
      mode = "light";
    }
  }


});

const ConsultarOpenAI = async (pergunta) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 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");
  myHeaders.append("Cookie", "__cf_bm=XVKVf7Yld3UDpt7E5giIXHZ9WlRGFFT614a6doOA4oI-1701179759-0-AXsC4gsMCdBH2kRq+9t4uityhNlyHAJhlZSTdFzwqtYXUKGzCzs5KtQo7fMDsqTezOlKA79XM2meEDHQT2a/9sg=; _cfuvid=XIkS2NVGkFkOvc3TuI3ljFJLlXh1JV5EddshQcY1hlQ-1701179759298-0-604800000");

  var raw = JSON.stringify({
    "model": "ft:gpt-3.5-turbo-0613:personal::8PsmsY32",
    "messages": [
      {
        "role": "system",
        "content": "Jarvis é um assistente muito educado."
      },
      {
        "role": "user",
        "content": pergunta
      }
    ],
    "temperature": 0.2
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result.choices[0].message.content))
    .catch(error => console.log('error', error));
}

//ConsultarOpenAI();

const CapturarVoz = () => {
  var startButton = document.getElementById('capture');
  //var stopButton = document.getElementById('stop');
  var resultElement = document.getElementById('prompt');

  var recognition = new webkitSpeechRecognition();

  recognition.lang = window.navigator.language;
  recognition.interimResults = true;

  startButton.addEventListener('click', () => { recognition.start(); });
  ///stopButton.addEventListener('click', () => { recognition.stop(); });

  recognition.addEventListener('result', (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    resultElement.value = result;
  });

  recognition.addEventListener('end', () => {
    const textocapturado = resultElement.value;
    ConsultarOpenAI(textocapturado);
  });
}

const ReproduzirVoz = (texto) => {
  var myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "1bf4dbb39a624e2f8184b59597d59178");
  myHeaders.append("Content-Type", "application/ssml+xml");
  myHeaders.append("X-Microsoft-OutputFormat", "audio-16khz-128kbitrate-mono-mp3");
  myHeaders.append("User-Agent", "curl");

  var raw = "<speak version='1.0' xml:lang='pt-BR'>\r\n    <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-FranciscaNeural'>\r\n        " + texto + "\r\n    </voice>\r\n</speak>";

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://eastus.tts.speech.microsoft.com/cognitiveservices/v1", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw new Error(`Falha na requisição: ${response.status} - ${response.statusText}`);
      }
    })
    .then(data => {
      const blob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);

      const audioElement = new Audio(audioUrl);
      audioElement.play();
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

const endpoint  = 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1';

function textToSpeech() {
    const textoParaFala = document.getElementById('prompt').value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '1bf4dbb39a624e2f8184b59597d59178',
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
            'User-Agent': 'curl',
        },
        body: `<speak version='1.0' xml:lang='pt-BR'>
                <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-AntonioNeural'>
                 ${textoParaFala}
                </voice>
            </speak>`,
    };

    fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.arrayBuffer();
            } else {
                throw new Error(`Falha na requisição: ${response.status} - ${response.statusText}`);
            }
        })
        .then(data => {
            const blob = new Blob([data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(blob);

            const audioElement = new Audio(audioUrl);
            audioElement.play();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

CapturarVoz();



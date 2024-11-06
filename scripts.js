function chooseNumber(number) {
    document.getElementById('numbers').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('selectedNumber').value = number;
}

function submitForm(event) {
    event.preventDefault();
    const selectedNumber = document.getElementById('selectedNumber').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    fetch('/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: selectedNumber, name, phone })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert('Número reservado! Efetue o pagamento dentro de 30 minutos.');
            window.location.href = `/pay/${selectedNumber}`;
        } else {
            alert('Número já reservado. Por favor, escolha outro.');
            document.getElementById('numbers').style.display = 'block';
            document.getElementById('form').style.display = 'none';
        }
    });
}
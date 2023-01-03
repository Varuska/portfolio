document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionar os elementos 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type ="submit"]')
    const btnReset = document.querySelector('#formulario button[type ="reset"]')

    //Asignar Evento
    inputEmail.addEventListener('input', validar);

    inputAsunto.addEventListener('input', validar);

    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener(click, function (e) {

        e.preventDefault();

        // reinciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();

        comprobarEmail()
    })

    //Formulario envio.

    async function enviarEmail(e) {
        e.preventDefault();

        const form = new FormData(this)
        const response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                'Accept': 'application/json'
            }
        })

        if (response.ok) {
            this.reset();
            alert('Obrigado por entrar em contato comigo')
        }
    }

    function validar(e) {

        if (e.target.value.trim() === '') {

            mostrarAlerta(`O campo ${e.target.id} é obrigatório`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('O email é invalido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores 
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email.
        comprobarEmail();

    }

    function mostrarAlerta(mensaje,
        referencia) {
        limpiarAlerta(referencia);

        //Comprobar si existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }


        //Generar un alerta html

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600')
        //Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {

        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }

    }

    function validarEmail(email) {

        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado = regex.test(email)
        console.log(resultado);
        return resultado;
    }


    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.disabled = false;

    }




});
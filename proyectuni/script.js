// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    //==========================================================================
    // FUNCIONALIDAD DEL FORMULARIO DE CONTACTO CON VALIDACIÓN Y MODAL
    //==========================================================================
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    contactForm.addEventListener('submit', function(event) {
        // Previene el envío tradicional del formulario
        event.preventDefault();
        event.stopPropagation();
        
        // Usa la validación de Bootstrap
        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }
        
        // Recolecta los datos del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Construye el cuerpo del correo
        const subject = `Nuevo Mensaje de ${name} desde la web VetCare`;
        const body = `Has recibido un nuevo mensaje de contacto:\n\n` +
                     `Nombre: ${name}\n` +
                     `Email: ${email}\n\n` +
                     `Mensaje:\n${message}\n\n` +
                     `----------------------\n` +
                     `Este correo fue generado desde el formulario de contacto de la página web de VetCare.`;

        // Crea el enlace mailto:
        // IMPORTANTE: Reemplaza 'tu-correo@example.com' con el email real de la clínica
        const mailtoLink = `mailto:tu-correo@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Redirige al cliente de correo del usuario
        window.location.href = mailtoLink;

        // Muestra el modal de confirmación como simulación de que el envío se está procesando
        // Se muestra un poco después para dar tiempo a que el cliente de correo se abra
        setTimeout(() => {
            confirmationModal.show();
        }, 500);

        // Limpia el formulario y remueve las clases de validación
        contactForm.reset();
        contactForm.classList.remove('was-validated');
    });

    //==========================================================================
    // CIERRE SUAVE DEL MENÚ RESPONSIVO AL HACER CLIC EN UN ENLACE
    //==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            // Solo cierra el menú si está visible (en modo móvil)
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

});
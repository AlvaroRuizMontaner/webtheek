import React from 'react'

export default function PoliticaPrivacidad() {
  return (
    <div className=''>
        <h1>Política de Privacidad</h1>
        <p>{new Date().getFullYear()}</p>
        <section>
            <h2>1. Responsable del Tratamiento de los Datos</h2>
            <p><strong>Nombre de la Empresa</strong>: Webtheek</p>
            <p><strong>Correo Electrónico de Contacto</strong>: accounts@webtheek.com | support@webtheek.com</p>
        </section>
        <section>
            <h2>2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes datos personales de los usuarios:</p>
            <ul>
                <li><strong>Datos de contacto</strong>: Nombre, correo electrónico.</li>
                <li><strong>Datos de pago</strong>: Información de pago procesada a través de un proveedor de pagos externo (Stripe). No almacenamos los detalles completos de las tarjetas de crédito.</li>
                <li><strong>Datos de uso</strong>: Información sobre cómo accedes y utilizas nuestros servicios.</li>
                <li><strong>Información de suscripción</strong>: Datos relacionados con el plan de suscripción que elijas.</li>
            </ul>
        </section>
        <section>
            <h2>3. Finalidades del Tratamiento de los Datos</h2>
            <p>Utilizamos tus datos personales para los siguientes fines:</p>
            <ul>
                <li><strong>Proveer los servicios</strong> de suscripción y acceso a contenido de Webtheek.</li>
                <li><strong>Gestionar pagos y suscripciones</strong> a través de nuestro proveedor de pagos, Stripe.</li>
                <li><strong>Enviar comunicaciones importantes</strong>, como confirmaciones de pago, notificaciones de cambios en el servicio y mensajes de soporte.</li>
                <li><strong>Cumplir con obligaciones legales</strong> y proteger nuestros derechos y los de nuestros usuarios.</li>
            </ul>
        </section>
        <section>
            <h2>4. Base Legal para el Tratamiento de los Datos</h2>
            <p>El tratamiento de tus datos se basa en:</p>
            <ul>
                <li><strong>Ejecución de un contrato</strong>: Para procesar y gestionar las suscripciones.</li>
                {/* <li>Consentimiento: Para el uso de cookies de análisis o marketing, en caso de que se implementen.</li> */}
                <li><strong>Cumplimiento de una obligación legal</strong>: Para cumplir con las normativas aplicables.</li>
            </ul>
        </section>
        <section>
            <h2>5. Compartición de Datos con Terceros</h2>
            <p>Compartimos tus datos personales con terceros solo cuando es necesario para cumplir con nuestras finalidades, en particular:</p>
            <ul>
                <li><strong>Stripe</strong>: Procesamos los pagos a través de Stripe, que gestiona los datos de pago de manera segura y conforme a la GDPR.</li>
                <li><strong>Proveedores de servicios</strong>: Empresas de hosting y otros servicios técnicos necesarios para operar Webtheek.</li>
            </ul>
        </section>
        <section>
            <h2>6. Conservación de los Datos</h2>
            <p>Conservamos tus datos personales mientras tengas una cuenta activa o mientras sea necesario para cumplir con las finalidades descritas. Una vez finalizada la relación, conservaremos tus datos solo en la medida en que sea necesario para cumplir con obligaciones legales.</p>
        </section>
        <section>
            <h2>7. Derechos del Usuario</h2>
            <p>Tienes derecho a:</p>
            <ul>
                <li><strong>Acceder a tus datos personales</strong> que tratamos.</li>
                <li><strong>Solicitar la rectificación</strong> de tus datos si son inexactos.</li>
                <li><strong>Solicitar la eliminación</strong> Solicitar la eliminación de tus datos personales.</li>
                <li><strong>Solicitar la limitación</strong> Solicitar la limitación del tratamiento de tus datos.</li>
                <li><strong>Oponerte al tratamiento</strong> de tus datos personales en ciertas circunstancias.</li>
                <li><strong>Solicitar la portabilidad</strong> de tus datos a otro proveedor de servicios.</li>
            </ul>
            <p>Para ejercer estos derechos, envía un correo electrónico a accounts@webtheek.com.</p>
        </section>
        <section>
            <h2>8. Seguridad de los Datos</h2>
            <p>Tomamos medidas de seguridad adecuadas para proteger tus datos personales frente a accesos no autorizados, pérdida o alteración.</p>
        </section>
        <section>
            <h2>9. Cambios en la Política de Privacidad</h2>
            <p>Podemos actualizar esta Política de Privacidad en cualquier momento. Te notificaremos de los cambios a través de nuestro sitio web o por correo electrónico.</p>
        </section>
    </div>
  )
}

import React from 'react'

export default function AvisoLegal() {
  return (
    <div>
        <h1>Aviso Legal</h1>
        <p>{new Date().getFullYear()}</p>
        <section>
            <h2>1. Identificación</h2>
            <p><strong>Titular</strong>: Webtheek</p>
            <p><strong>Correo Electrónico de Contacto</strong>: accounts@webtheek.com</p>
        </section>
        <section>
            <h2>2. Condiciones Generales de Uso</h2>
            <p>El acceso y uso de Webtheek implica la aceptación de estas Condiciones Generales de Uso. Si no estás de acuerdo, por favor, no utilices nuestros servicios.</p>
        </section>
        <section>
            <h2>3. Descripción del Servicio</h2>
            <p>Webtheek proporciona servicios de suscripción para el acceso a contenido digital y herramientas personalizadas. El usuario puede elegir entre diferentes planes de suscripción, sujetos a los términos de pago indicados en cada plan.</p>
        </section>
        <section>
            <h2>4. Propiedad Intelectual</h2>
            <p>Todo el contenido, diseño e información de Webtheek es propiedad de Webtheek o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No se permite su reproducción, distribución o uso sin nuestro consentimiento previo.</p>
        </section>
        <section>
            <h2>5. Responsabilidad</h2>
            <ul>
                <li>Webtheek no se responsabiliza de posibles interrupciones en el servicio por causas técnicas o de mantenimiento.</li>
                <li>No asumimos responsabilidad por el uso incorrecto o ilegal del servicio por parte de los usuarios.</li>
                <li>Nos reservamos el derecho a actualizar, modificar o eliminar cualquier contenido o funcionalidad del sitio web sin previo aviso.</li>
            </ul>
        </section>
        <section>
            <h2>6. Enlaces Externos</h2>
            <p>Webtheek puede contener enlaces a sitios web de terceros. No somos responsables del contenido ni de las políticas de privacidad de dichos sitios.</p>
        </section>
        <section>
            <h2>7. Condiciones de Pago</h2>
            <p>Las transacciones de pago se realizan a través de Stripe, un proveedor seguro y confiable. Los datos de pago no se almacenan en nuestros servidores.</p>
        </section>
        <section>
            <h2>8. Legislación y Jurisdicción Aplicable</h2>
            <p>Estas Condiciones Generales se rigen por la ley española. Para cualquier controversia que pueda surgir en relación con el servicio, las partes se someterán a los Juzgados y Tribunales de El Puerto de Santa María(España).</p>
        </section>
    </div>
  )
}

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Términos y Condiciones de Uso</h2>
      <p className="mb-4">
        Bienvenido a NovaFinance 360. Al utilizar nuestros servicios, usted acepta cumplir con los siguientes términos y
        condiciones. Por favor, lea atentamente esta información antes de proporcionar sus datos de contacto o utilizar
        nuestros servicios.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Recolección y Uso de Datos</h3>
      <p className="mb-4">
        Como parte de nuestros servicios financieros, recopilamos información de contacto, incluyendo nombres, números de
        teléfono y direcciones de correo electrónico, a través de formularios de inscripción en nuestro sitio web y otras
        plataformas digitales oficiales.
      </p>
      <p className="mb-4">
        Los datos proporcionados por los usuarios serán utilizados exclusivamente para comunicaciones relacionadas con la
        gestión de créditos hipotecarios, préstamos personales y otros servicios financieros ofrecidos por NovaFinance 360.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Comunicaciones y Mensajería</h3>
      <p className="mb-4">
        Nos comprometemos a brindar información relevante sobre productos y servicios financieros a nuestros clientes. Las
        comunicaciones pueden incluir recordatorios, notificaciones de estado de solicitud, ofertas promocionales y otras
        actualizaciones importantes.
      </p>
      <p className="mb-4">
        La frecuencia de los mensajes será determinada en función de la naturaleza de nuestras interacciones con los clientes
        y en cumplimiento con las mejores prácticas del sector financiero.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Consentimiento y Protección de Datos</h3>
      <p className="mb-4">
        Al proporcionar su información de contacto, usted autoriza expresamente a NovaFinance 360 a enviarle comunicaciones a
        través de SMS, correo electrónico, WhatsApp u otros medios digitales. Su información será tratada con estricta
        confidencialidad y de acuerdo con nuestra política de privacidad.
      </p>
      <p className="mb-4">
        Si en algún momento desea revocar su consentimiento y dejar de recibir nuestras comunicaciones, puede hacerlo
        utilizando los enlaces de cancelación incluidos en nuestros mensajes o enviando una solicitud a nuestro equipo de
        atención al cliente.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Transparencia y Accesibilidad</h3>
      <p className="mb-4">
        Para garantizar la transparencia en nuestra gestión de datos, proporcionamos acceso a los formularios de inscripción
        utilizados para la recopilación de información. Puede revisar dichos formularios en el siguiente enlace:
        <a href="https://novafinance.es/solicitar-informacion" className="text-blue-600 underline">
          {' '}
          https://novafinance.es/solicitar-informacion
        </a>
        .
      </p>
      <p className="mb-4">
        Si tiene preguntas o inquietudes sobre nuestras políticas de comunicación o el manejo de su información personal,
        puede ponerse en contacto con nuestro equipo de soporte en cualquier momento.
      </p>
    </div>
  );
}

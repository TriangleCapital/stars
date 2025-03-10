import { useEffect, useState } from 'react';
import { Upload, message, Button, Spin } from 'antd';
import { CheckCircleOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadFileToBackend } from '../handlers';
import axios from 'axios';
import { BACKEND_API_URL } from '../../../shared/utils/urls';

const { Dragger } = Upload;

export default function Lobby() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [leadsProcessed, setLeadsProcessed] = useState<boolean>(false);
  const [numberLeadsProcessed, setNumberLeadsProcessed] = useState<number>(0);
  const [numberLeadsOmitted, setNumberLeadsOmitted] = useState<number>(0);
  const [loadingService, setLoadingService] = useState<boolean>(false);

  const handleUpload = (info: any) => {
    const selectedFile = info.file;

    if (
      selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      selectedFile.type !== 'application/vnd.ms-excel'
    ) {
      message.error('Por favor, sube un archivo de Excel válido (.xlsx o .xls)');
      return;
    }

    setFile(selectedFile);
    message.success(`${selectedFile.name} seleccionado.`);
  };

  const handleSendFile = async () => {
    if (!file) {
      message.error('No se ha seleccionado ningún archivo.');
      return;
    }

    setLoading(true);
    try {
      const { leadsProcessed, leadsOmitted } = await uploadFileToBackend(file);
      setLeadsProcessed(true);
      setNumberLeadsProcessed(leadsProcessed);
      setNumberLeadsOmitted(leadsOmitted);
      message.success('¡Archivo enviado con éxito!');
      setFile(null);
    } catch (error) {
      message.error('No se pudo enviar el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    message.success('Archivo eliminado.');
  };

  const handleRedirectToLeads = () => {
    window.open('https://web.totalum.app/table/leads', '_blank');
  };

  const handleRedirectToConversations = () => {
    window.open('https://app.manychat.com/fb2531532/chat', '_blank');
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingService(true);
        await axios.get(BACKEND_API_URL);
        message.success('Servicio disponible.');
      } catch (error) {
        message.error('El servicio no está disponible en este momento. Recarga la página.');
      } finally {
        setLoadingService(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 py-20 space-y-6 min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-white to-blue-50 gap-10">
      {loadingService && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-start z-50 flex-col gap-10 pt-[350px]">
          <span className="text-white">Cargando el servicio. Puede tardar hasta 1 minuto</span>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#fff' }} spin />} />
        </div>
      )}

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <Button
          type="primary"
          onClick={handleRedirectToLeads}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 border-none rounded-full shadow-md text-lg transition-all duration-300"
        >
          Ir al Panel de leads
        </Button>
        <Button
          type="primary"
          onClick={handleRedirectToConversations}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 border-none rounded-full shadow-md text-lg transition-all duration-300"
        >
          Ver conversaciones de leads
        </Button>
      </div>

      {!leadsProcessed && (
        <section className="w-full max-w-lg p-6 rounded-3xl border border-gray-200 bg-white shadow-xl shadow-blue-200 transition-all duration-300 hover:shadow-blue-300">
          <h2 className="text-2xl font-extrabold text-center mb-6 text-black">Optimización Leads Idealista</h2>

          <Dragger
            name="file"
            multiple={false}
            accept=".xlsx, .xls"
            onChange={handleUpload}
            beforeUpload={() => false}
            showUploadList={false}
            className="bg-blue-50/20 text-blue-600 transition-all duration-300 hover:border-blue-400 hover:bg-blue-100/50 rounded-xl"
          >
            <p className="ant-upload-drag-icon text-blue-400">
              <InboxOutlined className="text-4xl" />
            </p>
            <p className="ant-upload-text font-medium">Haz clic o arrastra un archivo de Excel para subir</p>
            <p className="ant-upload-hint text-sm text-gray-500">Soporta archivos .xlsx y .xls</p>
          </Dragger>

          {file && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-blue-500">
                Archivo Subido: <span className="text-gray-800">{file.name}</span>
              </p>
              <Button
                type="primary"
                onClick={handleSendFile}
                disabled={loading}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 border-none rounded-full shadow-md shadow-blue-400/50 text-lg transition-all duration-300"
              >
                {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Enviar Archivo'}
              </Button>
              <Button
                type="default"
                onClick={handleRemoveFile}
                className="mt-4 ml-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 border-none rounded-full text-lg transition-all duration-300"
              >
                Eliminar Archivo
              </Button>
            </div>
          )}
        </section>
      )}

      {leadsProcessed && (
        <section className="w-full max-w-lg p-6 rounded-3xl border border-gray-200 bg-white shadow-xl shadow-green-200 transition-all duration-300 hover:shadow-green-300">
          <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">Resultado</h2>

          <div className="flex items-center mb-4">
            <CheckCircleOutlined className="text-green-500 text-2xl mr-2" />
            <span className="text-xl font-medium text-green-600">Proceso completado con éxito</span>
          </div>

          <div className="flex items-center">
            <p className="text-lg font-medium text-gray-800">
              <span className="text-green-600 font-semibold">{numberLeadsProcessed}</span> conversaciones empezadas
            </p>
          </div>

          {numberLeadsOmitted > 0 && (
            <div className="flex items-center">
              <p className="text-lg font-medium text-gray-800">
                <span className="text-orange-600 font-semibold">{numberLeadsOmitted}</span> leads omitidos por repetición o
                datos erróneos
              </p>
            </div>
          )}

          {numberLeadsProcessed > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              <p className="text-base text-gray-500">
                El siguiente paso es esperar a que los leads respondan las preguntas enviadas por WhatsApp.
              </p>
              <p className="text-base text-gray-500">
                Todas las respuestas serán almacenadas a medida que vayan respondiendo.
              </p>
              <p className="text-base text-gray-500">
                Se enviará una notificación cuando un lead haya respondido todas las preguntas.
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Volver
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

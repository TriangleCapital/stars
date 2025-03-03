import React, { useState } from 'react';
import { BACKEND_API_URL } from '../../../shared/utils/urls';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function LeadsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surnames: '',
    reason: '',
    phone: '',
    email: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const { name, surnames, reason, phone, email, acceptTerms } = formData;

    if (!name.trim()) {
      message.error('Por favor, ingresa tu nombre.');
      return false;
    }
    if (!surnames.trim()) {
      message.error('Por favor, ingresa tus apellidos.');
      return false;
    }
    if (!reason.trim()) {
      message.error('Por favor, ingresa el motivo de la consulta.');
      return false;
    }
    if (!phone.trim()) {
      message.error('Por favor, ingresa tu número de teléfono.');
      return false;
    }
    if (!email.trim()) {
      message.error('Por favor, ingresa tu correo electrónico.');
      return false;
    }
    if (!acceptTerms) {
      message.error('Por favor, acepta los términos y condiciones.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_API_URL}/leads/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      message.success('Gracias! En breve nos pondremos en contacto contigo');
    } catch (error) {
      console.error('Error:', error);
      message.error('No se ha podido enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <img src="novafinance-logo.jpg" alt="logo" className="mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center">Te contactamos</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Apellidos</label>
          <input
            type="text"
            name="surnames"
            value={formData.surnames}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Motivo de la consulta</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              Acepto los{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/terminos-y-condiciones')}>
                términos y condiciones
              </span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

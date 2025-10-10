"use client";
import React, { useState, useEffect } from 'react'
import { Package, Settings, Plus, Save } from 'lucide-react';
import { Message } from '../components/Message';
import SimpleInput from '../components/SimpleInput';

type Article = {
  id: number;
  codigo: string;
  nombre: string;
  categoria?: string;
  precio: number;
  stock?: number;
  proveedor?: string;
  descripcion?: string;
  fechaRegistro?: string;
};

type Service = {
  id: number;
  codigo: string;
  nombre: string;
  tipo?: string;
  precio: number;
  duracion?: number;
  responsable?: string;
  descripcion?: string;
  requisitos?: string;
  fechaRegistro?: string;
};

const DashboardArticles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'services'>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const [articleForm, setArticleForm] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    proveedor: '',
    descripcion: ''
  });

  const [serviceForm, setServiceForm] = useState({
    codigo: '',
    nombre: '',
    tipo: '',
    precio: '',
    duracion: '',
    responsable: '',
    descripcion: '',
    requisitos: ''
  });

  const articleCategories = [
    'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Herramientas', 'Otros'
  ];
  const serviceTypes = [
    'Consultoría', 'Mantenimiento', 'Desarrollo', 'Diseño', 'Soporte Técnico', 'Capacitación', 'Otros'
  ];

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  }

  useEffect(() => {
    const sampleArticles: Article[] = [
      {
        id: 1,
        codigo: 'ART001',
        nombre: 'Laptop Dell Inspiron',
        categoria: 'Electrónica',
        precio: 2500000,
        stock: 5,
        proveedor: 'TechStore',
        descripcion: 'Laptop para uso profesional',
        fechaRegistro: '2024-12-01'
      },
      {
        id: 2,
        codigo: 'ART002',
        nombre: 'Mouse Inalámbrico',
        categoria: 'Electrónica',
        precio: 75000,
        stock: 15,
        proveedor: 'Logitech',
        descripcion: 'Mouse ergonómico inalámbrico',
        fechaRegistro: '2024-12-02'
      }
    ];

    const sampleServices: Service[] = [
      {
        id: 1,
        codigo: 'SER001',
        nombre: 'Desarrollo Web',
        tipo: 'Desarrollo',
        precio: 80000,
        duracion: 8,
        responsable: 'Juan Pérez',
        descripcion: 'Desarrollo de sitios web responsivos',
        requisitos: 'Conocimientos en HTML, CSS, JavaScript',
        fechaRegistro: '2024-12-01'
      }
    ];

    setArticles(sampleArticles);
    setServices(sampleServices);
  }, []);

  const handleArticleSubmit = async () => {
    if (!articleForm.codigo || !articleForm.nombre || !articleForm.precio) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }

    try {
      const newArticle: Article = {
        id: articles.length + 1,
        codigo: articleForm.codigo,
        nombre: articleForm.nombre,
        categoria: articleForm.categoria || undefined,
        precio: parseFloat(String(articleForm.precio)) || 0,
        stock: parseInt(String(articleForm.stock)) || 0,
        proveedor: articleForm.proveedor || undefined,
        descripcion: articleForm.descripcion || undefined,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      };

      setArticles(prev => [...prev, newArticle]);
      setArticleForm({ codigo: '', nombre: '', categoria: '', precio: '', stock: '', proveedor: '', descripcion: '' });
      showMessage('¡Artículo registrado exitosamente!', 'success');
    } catch (err) {
      console.error(err);
      showMessage('Error al registrar el artículo', 'error');
    }
  };

  const handleServiceSubmit = async () => {
    if (!serviceForm.codigo || !serviceForm.nombre || !serviceForm.precio) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }

    try {
      const newService: Service = {
        id: services.length + 1,
        codigo: serviceForm.codigo,
        nombre: serviceForm.nombre,
        tipo: serviceForm.tipo || undefined,
        precio: parseFloat(String(serviceForm.precio)) || 0,
        duracion: parseInt(String(serviceForm.duracion)) || 0,
        responsable: serviceForm.responsable || undefined,
        descripcion: serviceForm.descripcion || undefined,
        requisitos: serviceForm.requisitos || undefined,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      };

      setServices(prev => [...prev, newService]);
      setServiceForm({ codigo: '', nombre: '', tipo: '', precio: '', duracion: '', responsable: '', descripcion: '', requisitos: '' });
      showMessage('¡Servicio registrado exitosamente!', 'success');
    } catch (err) {
      console.error(err);
      showMessage('Error al registrar el servicio', 'error');
    }
  };

  const handleArticleFormChange = (field: keyof typeof articleForm, value: string) => {
    setArticleForm(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceFormChange = (field: keyof typeof serviceForm, value: string) => {
    setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const filteredItems = activeTab === 'articles'
    ? (articles.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory === '' || item.categoria === filterCategory)) as (Article | Service)[])
    : (services.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) && (filterCategory === '' || item.tipo === filterCategory)) as (Article | Service)[]);

  return (
    <div>
      <Message message={message} type={messageType} onClose={() => setMessage(null)} />

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button onClick={() => setActiveTab('articles')} className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'articles' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            <Package className="w-4 h-4 mr-2" />
            Artículos
          </button>
          <button onClick={() => setActiveTab('services')} className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'services' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            <Settings className="w-4 h-4 mr-2" />
            Servicios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center"><Plus className="w-5 h-5 mr-2 text-blue-600" />{activeTab === 'articles' ? 'Nuevo Artículo' : 'Nuevo Servicio'}</h3>

            {activeTab === 'articles' ? (
              <div className="space-y-4">
                  <SimpleInput label="Código *" name="codigo" type="text" value={articleForm.codigo} onChange={(e) => handleArticleFormChange('codigo', e.target.value)} placeholder="Ej: ART001" />
                  <SimpleInput label="Nombre del Artículo *" name="nombre" type="text" value={articleForm.nombre} onChange={(e) => handleArticleFormChange('nombre', e.target.value)} placeholder="Nombre del producto" />

                <div>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Categoría</label>
                  <select value={articleForm.categoria} onChange={(e) => handleArticleFormChange('categoria', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500">
                    <option value="">Seleccionar categoría</option>
                    {articleCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>

                    <div className="grid grid-cols-2 gap-4">
                  <SimpleInput label="Precio *" name="precio" type="number" value={articleForm.precio} onChange={(e) => handleArticleFormChange('precio', e.target.value)} placeholder="0.00" />
                  <SimpleInput label="Stock" name="stock" type="number" value={articleForm.stock} onChange={(e) => handleArticleFormChange('stock', e.target.value)} placeholder="0" />
                  </div>

                  <SimpleInput label="Proveedor" name="proveedor" type="text" value={articleForm.proveedor} onChange={(e) => handleArticleFormChange('proveedor', e.target.value)} placeholder="Nombre del proveedor" />

                <div>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Descripción</label>
                  <textarea rows={3} value={articleForm.descripcion} onChange={(e) => handleArticleFormChange('descripcion', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500" placeholder="Descripción del artículo" />
                </div>

                <button type="button" onClick={handleArticleSubmit} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"><Save className="w-4 h-4 mr-2" />Registrar Artículo</button>
              </div>
            ) : (
              <div className="space-y-4">
                <SimpleInput label="Código *" name="codigo" type="text" value={serviceForm.codigo} onChange={(e) => handleServiceFormChange('codigo', e.target.value)} placeholder="Ej: SER001" />
                <SimpleInput label="Nombre del Servicio *" name="nombre" type="text" value={serviceForm.nombre} onChange={(e) => handleServiceFormChange('nombre', e.target.value)} placeholder="Nombre del servicio" />

                <div>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Tipo de Servicio</label>
                  <select value={serviceForm.tipo} onChange={(e) => handleServiceFormChange('tipo', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500">
                    <option value="">Seleccionar tipo</option>
                    {serviceTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                  </select>
                </div>

                  <div className="grid grid-cols-2 gap-4">
                  <SimpleInput label="Precio/Hora *" name="precio" type="number" value={serviceForm.precio} onChange={(e) => handleServiceFormChange('precio', e.target.value)} placeholder="0.00" />
                  <SimpleInput label="Duración (hrs)" name="duracion" type="number" value={serviceForm.duracion} onChange={(e) => handleServiceFormChange('duracion', e.target.value)} placeholder="0" />
                  </div>

                <SimpleInput label="Responsable" name="responsable" type="text" value={serviceForm.responsable} onChange={(e) => handleServiceFormChange('responsable', e.target.value)} placeholder="Persona responsable" />

                <div>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Descripción</label>
                  <textarea rows={2} value={serviceForm.descripcion} onChange={(e) => handleServiceFormChange('descripcion', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500" placeholder="Descripción del servicio" />
                </div>

                <div>
                  <label className="font-medium text-base text-slate-800 mb-1 block">Requisitos</label>
                  <textarea rows={2} value={serviceForm.requisitos} onChange={(e) => handleServiceFormChange('requisitos', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500" placeholder="Requisitos necesarios" />
                </div>

                <button type="button" onClick={handleServiceSubmit} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"><Save className="w-4 h-4 mr-2" />Registrar Servicio</button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{activeTab === 'articles' ? 'Artículos Registrados' : 'Servicios Registrados'}</h3>
                <div className="flex items-center space-x-4">
                  <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option value="">Todas las categorías</option>
                    {(activeTab === 'articles' ? articleCategories : serviceTypes).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">{searchTerm || filterCategory ? 'No se encontraron resultados' : `No hay ${activeTab === 'articles' ? 'artículos' : 'servicios'} registrados`}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{item.nombre}</h4>
                          <p className="text-sm text-gray-600">Código: {item.codigo}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 text-lg">${((item as Article).precio).toLocaleString()}{activeTab === 'services' && '/hora'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        {activeTab === 'articles' ? (
                          <>
                            <div>
                              <span className="font-medium">Categoría:</span> {(item as Article).categoria || 'Sin categoría'}
                            </div>
                            <div>
                              <span className="font-medium">Stock:</span> {(item as Article).stock}
                            </div>
                            <div>
                              <span className="font-medium">Proveedor:</span> {(item as Article).proveedor || 'No especificado'}
                            </div>
                            <div>
                              <span className="font-medium">Registrado:</span> {(item as Article).fechaRegistro}
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="font-medium">Tipo:</span> {(item as Service).tipo || 'Sin tipo'}
                            </div>
                            <div>
                              <span className="font-medium">Duración:</span> {(item as Service).duracion} hrs
                            </div>
                            <div>
                              <span className="font-medium">Responsable:</span> {(item as Service).responsable || 'No asignado'}
                            </div>
                            <div>
                              <span className="font-medium">Registrado:</span> {(item as Service).fechaRegistro}
                            </div>
                          </>
                        )}
                      </div>

                      {(activeTab === 'articles' && (item as Article).descripcion) && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-medium">Descripción:</span> {(item as Article).descripcion}
                        </div>
                      )}

                      {activeTab === 'services' && (item as Service).requisitos && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Requisitos:</span> {(item as Service).requisitos}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardArticles;

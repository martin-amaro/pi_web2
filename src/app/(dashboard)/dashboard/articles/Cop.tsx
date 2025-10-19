"use client";
import React, { useState, useEffect } from 'react';
import { Package, Plus } from 'lucide-react';
import { Message } from '../components/Message';
import SimpleInput from '../components/SimpleInput';
import Button from '@/app/ui/Button';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

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

type CategoryItem = {
  name: string;
  allowed?: boolean;
};

const DashboardArticles: React.FC = () => {
  // no tabs: show both articles and services together
  const [articles, setArticles] = useState<Article[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'article' | 'service' | null>(null);

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
  const initialUnion = Array.from(new Set([...articleCategories, ...serviceTypes]));

  const { data: session } = useSession();

  const [categories, setCategories] = useState<CategoryItem[]>(
    initialUnion.map((c) => ({ name: c, allowed: true }))
  );

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  }

  useEffect(() => {
    (async () => {
      try {
  const token = (session?.user as Session['user'])?.accessToken;
        const headers: Record<string,string> = token ? { Authorization: `Bearer ${token}` } : {};

        const [aRes, sRes] = await Promise.all([
          fetch(`${API_BASE}/articles`, { headers }),
          fetch(`${API_BASE}/services`, { headers }),
        ]);

        if (aRes && aRes.ok) setArticles(await aRes.json());
        if (sRes && sRes.ok) setServices(await sRes.json());

        // optional: fetch categories from backend if endpoint exists
          try {
            const cRes = await fetch(`${API_BASE}/categories`, { headers });
            if (cRes && cRes.ok) {
              const data = await cRes.json();
              let items: CategoryItem[] = [];
              if (Array.isArray(data)) {
                if (data.length && typeof data[0] === 'string') items = (data as string[]).map(n => ({ name: n, allowed: true }));
                else items = (data as { name?: string; allowed?: boolean }[]).map(d => ({ name: d.name ?? String(d), allowed: d.allowed ?? true }));
              } else if (data && Array.isArray((data as { categories?: unknown }).categories)) {
                items = ((data as { categories: { name?: string; allowed?: boolean }[] }).categories).map(d => ({ name: d.name ?? String(d), allowed: d.allowed ?? true }));
              }
              if (items.length) setCategories(items);
            }
          } catch (fetchCatErr) {
            console.error('Error fetching categories', fetchCatErr);
          }
      } catch (err) {
        console.error('Error fetching articles/services', err);
        setArticles([]);
        setServices([]);
      }
    })();
  }, [session]);

  const handleArticleSubmit = async () => {
    if (!articleForm.codigo || !articleForm.nombre || !articleForm.precio) {
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }
    // client-side check: if a category exists and is not allowed, stop here (server must still enforce)
    if (articleForm.categoria) {
      const found = categories.find(c => c.name === articleForm.categoria);
      if (found && found.allowed === false) {
        showMessage('No tienes permiso para usar la categoría seleccionada', 'error');
        return;
      }
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

      // persist to API
      try {
  const token = (session?.user as Session['user'])?.accessToken;
        const headers: Record<string,string> = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`${API_BASE}/articles`, { method: 'POST', headers, body: JSON.stringify(newArticle) });
        if (res.ok) {
          const saved = await res.json();
          setArticles(prev => [...prev, saved]);
          setArticleForm({ codigo: '', nombre: '', categoria: '', precio: '', stock: '', proveedor: '', descripcion: '' });
        } else {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || 'Failed to save');
        }
      } catch (err) {
        console.error(err);
        showMessage('Error al guardar el artículo en el servidor', 'error');
      }
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
    if (serviceForm.tipo) {
      const found = categories.find(c => c.name === serviceForm.tipo);
      if (found && found.allowed === false) {
        showMessage('No tienes permiso para usar el tipo de servicio seleccionado', 'error');
        return;
      }
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

      try {
        const token = (session?.user as Session['user'])?.accessToken;
        const headers: Record<string,string> = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`${API_BASE}/services`, { method: 'POST', headers, body: JSON.stringify(newService) });
        if (res.ok) {
          const saved = await res.json();
          setServices(prev => [...prev, saved]);
          setServiceForm({ codigo: '', nombre: '', tipo: '', precio: '', duracion: '', responsable: '', descripcion: '', requisitos: '' });
        } else {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || 'Failed to save');
        }
      } catch (err) {
        console.error('Error saving service', err);
        showMessage('Error al guardar el servicio en el servidor', 'error');
      }
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

  const filteredItems = ([...articles, ...services] as (Article | Service)[]).filter(item => {
    const nameMatch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (!filterCategory) return nameMatch;
    // match either article category or service type
    if ((item as Article).categoria !== undefined) {
      return nameMatch && (item as Article).categoria === filterCategory;
    }
    if ((item as Service).tipo !== undefined) {
      return nameMatch && (item as Service).tipo === filterCategory;
    }
    return false;
  });

  

  return (
    <div>
      <Message message={message} type={messageType} onClose={() => setMessage(null)} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Artículos y Servicios Registrados</h3>
            <div className="flex items-center space-x-4">
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar" className="px-3 py-2 border border-gray-300 rounded-md text-sm" />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name} disabled={cat.allowed === false}>
                    {cat.name}{cat.allowed === false ? ' (sin permiso)' : ''}
                  </option>
                ))}
              </select>
              <button onClick={() => { setModalOpen(true); setModalMode(null); }} className="ml-3 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"><Plus className="w-4 h-4"/>Agregar</button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{searchTerm || filterCategory ? 'No se encontraron resultados' : 'No hay artículos o servicios registrados'}</p>
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
                      <p className="font-semibold text-green-600 text-lg">${((item as Article).precio).toLocaleString()}{( (item as Service).tipo ? '/hora' : '' )}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    {/* Render fields based on runtime type */}
                    {((item as Article).categoria !== undefined) ? (
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

                  {((item as Article).categoria !== undefined && (item as Article).descripcion) && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Descripción:</span> {(item as Article).descripcion}
                    </div>
                  )}

                  {((item as Service).tipo !== undefined && (item as Service).requisitos) && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Requisitos:</span> {(item as Service).requisitos}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            {!modalMode ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">¿Qué deseas agregar?</h3>
                <div className="flex gap-4">
                    <Button type="primary" onClick={() => setModalMode('article')}>Agregar Artículo</Button>
                    <Button type="secondary" onClick={() => setModalMode('service')}>Agregar Servicio</Button>
                    <Button type="text" onClick={() => setModalOpen(false)} className="ml-auto">Cancelar</Button>
                  </div>
              </div>
            ) : modalMode === 'article' ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Nuevo Artículo</h3>
                <div className="space-y-3">
                  <SimpleInput label="Código *" name="codigo" type="text" value={articleForm.codigo} onChange={(e) => handleArticleFormChange('codigo', e.target.value)} placeholder="Ej: ART001" />
                  <SimpleInput label="Nombre del Artículo *" name="nombre" type="text" value={articleForm.nombre} onChange={(e) => handleArticleFormChange('nombre', e.target.value)} placeholder="Nombre del producto" />
                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Categoría</label>
                    <select value={articleForm.categoria} onChange={(e) => handleArticleFormChange('categoria', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500">
                      <option value="">Seleccionar categoría</option>
                      {articleCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SimpleInput label="Precio *" name="precio" type="number" value={articleForm.precio} onChange={(e) => handleArticleFormChange('precio', e.target.value)} placeholder="0.00" />
                    <SimpleInput label="Stock" name="stock" type="number" value={articleForm.stock} onChange={(e) => handleArticleFormChange('stock', e.target.value)} placeholder="0" />
                  </div>
                  <SimpleInput label="Proveedor" name="proveedor" type="text" value={articleForm.proveedor} onChange={(e) => handleArticleFormChange('proveedor', e.target.value)} placeholder="Nombre del proveedor" />
                  <div className="flex items-center gap-3 mt-3">
                    <Button type="primary" onClick={() => { handleArticleSubmit(); setModalOpen(false); }}>Registrar</Button>
                    <Button type="secondary" onClick={() => setModalMode(null)}>Volver</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">Nuevo Servicio</h3>
                <div className="space-y-3">
                  <SimpleInput label="Código *" name="codigo" type="text" value={serviceForm.codigo} onChange={(e) => handleServiceFormChange('codigo', e.target.value)} placeholder="Ej: SER001" />
                  <SimpleInput label="Nombre del Servicio *" name="nombre" type="text" value={serviceForm.nombre} onChange={(e) => handleServiceFormChange('nombre', e.target.value)} placeholder="Nombre del servicio" />
                  <div>
                    <label className="font-medium text-base text-slate-800 mb-1 block">Tipo de Servicio</label>
                    <select value={serviceForm.tipo} onChange={(e) => handleServiceFormChange('tipo', e.target.value)} className="text-slate-900 bg-white border border-slate-300 w-full text-sm p-2 mt-1 rounded-md focus:outline-blue-500">
                      <option value="">Seleccionar tipo</option>
                      {serviceTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <SimpleInput label="Precio/Hora *" name="precio" type="number" value={serviceForm.precio} onChange={(e) => handleServiceFormChange('precio', e.target.value)} placeholder="0.00" />
                    <SimpleInput label="Duración (hrs)" name="duracion" type="number" value={serviceForm.duracion} onChange={(e) => handleServiceFormChange('duracion', e.target.value)} placeholder="0" />
                  </div>
                  <SimpleInput label="Responsable" name="responsable" type="text" value={serviceForm.responsable} onChange={(e) => handleServiceFormChange('responsable', e.target.value)} placeholder="Persona responsable" />
                  <div className="flex items-center gap-3 mt-3">
                    <Button type="primary" onClick={() => { handleServiceSubmit(); setModalOpen(false); }}>Registrar</Button>
                    <Button type="secondary" onClick={() => setModalMode(null)}>Volver</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardArticles;

import { useState, useEffect } from 'react';

export interface PredefinedService {
  id: string;
  name: string;
  description: string;
  rate: number;
}

const defaultServices: PredefinedService[] = [
  { id: '1', name: 'Website Design & Development', description: 'Custom website design and development services', rate: 2500 },
  { id: '2', name: 'Logo Design & Branding', description: 'Professional logo design and brand identity', rate: 800 },
  { id: '3', name: 'Content Management System', description: 'CMS setup and configuration for easy content management', rate: 1200 },
  { id: '4', name: 'SEO Optimization', description: 'Search engine optimization to improve website visibility', rate: 600 },
  { id: '5', name: 'Mobile Responsive Design', description: 'Responsive design optimization for mobile devices', rate: 400 },
  { id: '6', name: 'E-commerce Integration', description: 'Online store setup and payment gateway integration', rate: 1500 },
  { id: '7', name: 'Custom WordPress Theme', description: 'Custom WordPress theme development and customization', rate: 1000 },
  { id: '8', name: 'Social Media Integration', description: 'Social media platform integration and setup', rate: 300 },
];

const STORAGE_KEY = 'constructteam-predefined-services';

export const usePredefinedServices = () => {
  const [services, setServices] = useState<PredefinedService[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setServices(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored services:', error);
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
    }
  }, []);

  const saveServices = (newServices: PredefinedService[]) => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
  };

  const addService = (service: Omit<PredefinedService, 'id'>) => {
    const newService: PredefinedService = {
      ...service,
      id: `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    saveServices([...services, newService]);
  };

  const updateService = (id: string, updates: Partial<Omit<PredefinedService, 'id'>>) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, ...updates } : service
    );
    saveServices(updatedServices);
  };

  const deleteService = (id: string) => {
    const filteredServices = services.filter(service => service.id !== id);
    saveServices(filteredServices);
  };

  const resetToDefaults = () => {
    saveServices(defaultServices);
  };

  return {
    services,
    addService,
    updateService,
    deleteService,
    resetToDefaults,
  };
};
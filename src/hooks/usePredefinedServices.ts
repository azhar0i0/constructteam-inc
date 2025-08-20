import { useState, useEffect } from 'react';

export interface PredefinedService {
  id: string;
  description: string;
  rate: number;
}

const defaultServices: PredefinedService[] = [
  { id: '1', description: "Website Design & Development", rate: 2500 },
  { id: '2', description: "Logo Design & Branding", rate: 800 },
  { id: '3', description: "Content Management System", rate: 1200 },
  { id: '4', description: "SEO Optimization", rate: 600 },
  { id: '5', description: "Mobile Responsive Design", rate: 400 },
  { id: '6', description: "E-commerce Integration", rate: 1500 },
  { id: '7', description: "Custom WordPress Theme", rate: 1000 },
  { id: '8', description: "Social Media Integration", rate: 300 },
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
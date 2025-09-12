export type ClientStatus = 'Nuevo' | 'Contactado' | 'En negociación' | 'Cerrado';

export interface Note {
  id: string;
  text: string;
  createdAt: string; // ISO string
}

export interface Interaction {
  id: string;
  type: 'nota' | 'estado' | 'creación';
  description: string;
  createdAt: string; // ISO string
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  status: ClientStatus;
  notes: Note[];
  history: Interaction[];
  createdAt: string; // ISO string
}

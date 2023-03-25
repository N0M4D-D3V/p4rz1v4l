export interface Bot {
  id?: number;
  name?: string;
  client?: ClientBot;
  createdAt?: string;
  lastModified?: string;
  items?: BotItem[];
  total?: number;
  value?: string;
}

export interface ClientBot {
  name?: string;
  email?: string;
  phone?: string;
}

export interface BotItem {
  description?: string;
  price?: number;
}

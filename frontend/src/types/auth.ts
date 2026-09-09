export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export interface RegisterAuthFormType {
  handleFormSubmit: () => Promise<void>;
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
}

export type LoginFormData = { email: string; password: string };

export interface LoginAuthFormType {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: LoginFormData;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
}

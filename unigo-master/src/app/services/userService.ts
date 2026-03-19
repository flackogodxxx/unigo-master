export interface UserData {
    name: string;
    email: string;
    ra: string;
    phone: string;
    image: string;
    rating?: number;
    totalRides?: number;
    isDriver?: boolean;
}

class UserService {
    private static instance: UserService;
    private listeners: ((userData: UserData) => void)[] = [];

    private constructor() { }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async updateProfile(data: Partial<UserData>): Promise<void> {
        // Atualizar dados no localStorage
        if (data.name) localStorage.setItem('userName', data.name);
        if (data.image) localStorage.setItem('userImage', data.image);

        // Notificar todos os ouvintes sobre a mudança
        const currentData = await this.getUserData();
        this.notifyListeners(currentData);
    }

    async getUserData(): Promise<UserData> {
        const name = localStorage.getItem('userName') || 'Usuário';
        const image = localStorage.getItem('userImage') || '';

        return {
            name,
            image,
            email: 'usuario@unifio.edu.br',
            ra: '12345678',
            phone: '(14) 99999-9999',
            rating: 4.8,
            totalRides: 45,
            isDriver: true
        };
    }

    async uploadImage(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const base64Image = e.target?.result as string;
                    // Aqui você normalmente enviaria a imagem para um servidor
                    // Por enquanto, vamos apenas salvar no localStorage
                    await this.updateProfile({ image: base64Image });
                    resolve(base64Image);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    addListener(callback: (userData: UserData) => void) {
        this.listeners.push(callback);
    }

    removeListener(callback: (userData: UserData) => void) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    private notifyListeners(userData: UserData) {
        this.listeners.forEach(listener => listener(userData));
    }
}

export default UserService.getInstance();

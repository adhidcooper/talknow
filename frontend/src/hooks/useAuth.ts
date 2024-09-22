import {useState, useEffect}from 'react'
import { fetchUserInfo } from '../api/auth'

const useAuth = (apiKey: string) => {
    const [user, setUser] = useState<unknown>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const data = await fetchUserInfo(apiKey);
                setUser(data.result);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setMessage(error.message)
                } else if (typeof error === 'object' && error!= null && 'response' in error) {
                    const responseError = error as {
                        response?: {
                            data?: {
                                message?: string
                            }
                        }
                    };
                    setMessage(responseError?.response?.data?.message || 'Something went wrong!');
                }else {
                    setMessage("An unknown error Occured!");
                }
            }
        };

        if (apiKey) {
            getUserInfo();
        } 
    }, [apiKey])
  return {user, message}
  
}

export default useAuth;

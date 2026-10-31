import { useGoogleLogin } from '@react-oauth/google';
import { useLoadingStore } from '../stores/useLoadingStore';
import { loginGoogle } from '@/services/auth.service';
import type { GoogleAuthRequest, LoginResponse } from '@/types/auth.types';
import type { ApiErrorResponse } from '@/services/api';
import { errorAlert } from '@/utils/alert/alert';

interface Options {
  onSuccess: (user: LoginResponse) => void;
  onError?: (message: string) => void;
}

export function useGoogleAuth({ onSuccess, onError }: Options) {
  const {isLoading,setIsLoading} = useLoadingStore();
  
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      try {
        const payload:GoogleAuthRequest ={
          code:code
        }
        onSuccess(await loginGoogle(payload));
      } catch (error:unknown){
        const err = error as ApiErrorResponse;
        const message = err.response?.data?.message||'Login dengan Google gagal. Silakan coba lagi.';
        errorAlert(message);
        onError?.(message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsLoading(false);
      onError?.('Login dengan Google gagal.');
    },
    // popup ditutup user / popup diblokir browser
    onNonOAuthError: (err) => {
      setIsLoading(false);
      if (err.type === 'popup_failed_to_open') {
        onError?.('Popup diblokir browser. Izinkan popup lalu coba lagi.');
      }
    },
  });

  const start = () => {
    setIsLoading(true);
    login();
  };

  return { start, isLoading };
}
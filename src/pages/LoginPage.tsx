import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import PasswordInputField from '../components/atoms/PasswordInputField';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import type { LoginRequest } from '../types/auth.types';
import { useLoadingStore } from '../stores/useLoadingStore';
import type { ApiErrorResponse } from '../services/api';
import { errorAlertWithTitle, successAlert} from '../utils/alert/alert';
import { login } from '../services/auth.service';
import { useAuthStore } from '../stores/useAuthStore';
import { useGoogleAuth } from '../hooks/useGoogleAuthCallback';
import { getMyAccount } from '@/services/account.service';

export default function LoginPage() {
  const navigate = useNavigate();
  const {setIsLoading} = useLoadingStore();
  const {setAccount} = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({ mode: 'onSubmit' });
  const { start: handleGoogleRegister, isLoading: isGoogleRegistering } =
    useGoogleAuth({
      onSuccess: async () => {
        const res = await getMyAccount();
        setAccount(res);
        navigate('/dashboard');
      },
      onError: (message) => {
        // tampilkan toast / alert
        console.error(message);
      },
    });

  const onSubmit = async(data: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      setAccount(res.account);
      successAlert("Login Berhasil");
      navigate('/dashboard');
    } catch (error:unknown) {
      const err = error as ApiErrorResponse;
      const message = err.response?.data?.message||"Login Failed";
      errorAlertWithTitle("Login Gagal",message)   
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-bg flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
            V-Booth
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-text-main tracking-tight">
            Masuk
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Kelola acara dan kenangan tamu dengan satu akun.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Username atau email"
            type="text"
            placeholder="nama@email.com"
            {...register('usernameOrEmail', {
              required: 'Username atau email tidak boleh kosong.',
            })}
            error={errors.usernameOrEmail?.message}
          />

          <PasswordInputField
            label="Password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password tidak boleh kosong.',
            })}
            error={errors.password?.message}
          />

          <Button type="submit" variant="primary" fullWidth className="rounded-sm" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Masuk'
            )}
          </Button>
        </form>

        <div className="mt-5">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isGoogleRegistering}
            className="w-full flex items-center justify-center gap-3 rounded-sm border border-surface-border bg-white px-5 py-3.5 text-sm font-semibold text-text-main hover:border-primary/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleRegistering ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Membuka Google...
              </>
            ) : (
              <>
                <FcGoogle className="w-4 h-4" />
                Masuk dengan Google
              </>
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-medium text-primary hover:text-primary-hover underline underline-offset-4"
          >
            Daftar
          </button>
        </p>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-main hover:text-primary transition-colors"
          >
            <span>←</span>
            Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  );
}

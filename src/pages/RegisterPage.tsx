import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import PasswordInputField from '../components/atoms/PasswordInputField';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { RegisterAccount } from '../types/auth.types';
import { useLoadingStore } from '../stores/useLoadingStore';
import { registerAccount } from '../services/auth.service';
import type { ApiErrorResponse } from '../services/api';
import { emailPattern, passwordPattern, usernamePattern } from '../utils/helper/pattern';
import { errorAlertWithTitle, successAlertWithTitle } from '../utils/alert/alert';

export default function RegisterPage() {
  const navigate = useNavigate();
  const {setIsLoading} = useLoadingStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<RegisterAccount>({ mode: 'onChange' });
  const [isGoogleRegistering, setIsGoogleRegistering] = useState(false);

  const onSubmit = async (data: RegisterAccount) => {
    setIsLoading(true);
    try {
      await registerAccount(data);
      successAlertWithTitle("Registration Successfuly","Your account has been created successfully.")
      setTimeout(() => {
				navigate("/login", { replace: true });
			}, 1000);
    } catch (error:unknown) {
      const err = error as ApiErrorResponse;
      const message = err.response?.data?.message|| "Register failed";
      errorAlertWithTitle("Register Failed",message);
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
            Daftar
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Buat akun untuk mulai membuat acara dan berbagi kenangan.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Nama"
            type="text"
            placeholder="Nama lengkap"
            {...register('name', {
              required: 'Nama tidak boleh kosong.',
              minLength: { value: 1, message: 'Nama tidak boleh kosong.' },
            })}
            error={isSubmitted ? errors.name?.message : undefined}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="nama@email.com"
            {...register('email', {
              required: 'Email tidak boleh kosong.',
              pattern: {
                value: emailPattern,
                message: 'Format email tidak valid.',
              },
              maxLength: {
                value: 100,
                message: 'Maksimal 100 karakter.',
              },
            })}
            error={errors.email?.message}
          />

          <InputField
            label="Username"
            type="text"
            placeholder="pengguna123"
            {...register('username', {
              required: 'Username tidak boleh kosong.',
              minLength: { value: 3, message: 'Minimal 3 karakter.' },
              maxLength: { value: 20, message: 'Maksimal 20 karakter.' },
              pattern: {
                value: usernamePattern,
                message: 'Hanya huruf dan angka.',
              },
            })}
            error={isSubmitted ? errors.username?.message : undefined}
          />

          <PasswordInputField
            label="Password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password tidak boleh kosong.',
              minLength: {
                value: 8,
                message: 'Minimal 8 karakter.',
              },
              pattern: {
                value: passwordPattern,
                message: 'Wajib ada 1 huruf besar, 1 angka, dan 1 karakter khusus.',
              },
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="rounded-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mendaftar...
              </>
            ) : (
              'Daftar'
            )}
          </Button>
        </form>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setIsGoogleRegistering(true);
              window.open('http://localhost:8080/oauth2/authorization/google', '_blank', 'width=500,height=600');
              setTimeout(() => setIsGoogleRegistering(false), 2000);
            }}
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
                Daftar dengan Google
              </>
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-medium text-primary hover:text-primary-hover underline underline-offset-4"
          >
            Masuk
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

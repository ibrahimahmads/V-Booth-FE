import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import InputField from '../../components/atoms/InputField';
import PasswordInputField from '../../components/atoms/PasswordInputField';
import { Loader2 } from 'lucide-react';
import type { ApiErrorResponse } from '@/services/api';
import { errorAlert, errorAlertWithTitle, successAlert } from '@/utils/alert/alert';
import { login } from '@/services/auth.service';
import { useAuthStore } from '@/stores/useAuthStore';
import type { LoginRequest } from '@/types/auth.types';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { setAccount } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({ mode: 'onSubmit' });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data,"ADMIN");
      if(res.role === "ADMIN"){
        errorAlert("Akses ditolak. Halaman ini hanya diperuntukkan bagi administrator.");
      }else{
        setAccount(res);
        successAlert("Login Berhasil");
        navigate('/admin/dashboard');
      }
    } catch (error:unknown) {
      const err = error as ApiErrorResponse;
      const message = err.response?.data?.message||"Login Failed";
      errorAlertWithTitle("Login Gagal",message);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-bg flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">
            V-Booth Admin
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-text-main tracking-tight">
            Login Admin
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Kelola platform V-Booth dari sini.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Username"
            type="text"
            placeholder="username or email"
            {...register('usernameOrEmail', {
              required: 'Username atau email tidak boleh kosong',
            })}
            error={errors.usernameOrEmail?.message}
          />

          <PasswordInputField
            label="Password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password tidak boleh kosong',
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="rounded-sm px-5 py-3.5"
            disabled={isSubmitting}
          >
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

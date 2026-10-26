import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import { FcGoogle } from 'react-icons/fc';

interface RegisterValues {
  name: string;
  email: string;
  username: string;
  password: string;
}

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const usernamePattern = /^[a-zA-Z0-9]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ mode: 'onBlur' });

  const onSubmit = (data: RegisterValues) => {
    console.log('register payload', data);
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
              required: 'Wajib diisi.',
              minLength: { value: 1, message: 'Wajib diisi.' },
            })}
            error={errors.name?.message}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="nama@email.com"
            {...register('email', {
              required: 'Wajib diisi.',
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
              required: 'Wajib diisi.',
              minLength: { value: 3, message: 'Minimal 3 karakter.' },
              maxLength: { value: 20, message: 'Maksimal 20 karakter.' },
              pattern: {
                value: usernamePattern,
                message: 'Hanya huruf dan angka.',
              },
            })}
            error={errors.username?.message}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password', {
              required: 'Wajib diisi.',
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

          <Button type="submit" variant="primary" fullWidth className="rounded-sm">
            Daftar
          </Button>
        </form>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => console.log('google signup')}
            className="w-full flex items-center justify-center gap-3 rounded-sm border border-surface-border bg-white px-5 py-3.5 text-sm font-semibold text-text-main hover:border-primary/40 transition-colors"
          >
            <FcGoogle className="w-4 h-4" />
            Daftar dengan Google
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
            className="text-xs text-text-muted hover:text-text-main underline underline-offset-4"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  );
}

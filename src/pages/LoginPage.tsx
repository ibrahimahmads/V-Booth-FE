import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import { FcGoogle } from 'react-icons/fc';

interface LoginValues {
  usernameOrEmail: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ mode: 'onBlur' });

  const onSubmit = (data: LoginValues) => {
    console.log('login payload', data);
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
              required: 'Wajib diisi.',
              minLength: {
                value: 3,
                message: 'Minimal 3 karakter.',
              },
            })}
            error={errors.usernameOrEmail?.message}
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
            })}
            error={errors.password?.message}
          />

          <Button type="submit" variant="primary" fullWidth className="rounded-sm">
            Masuk
          </Button>
        </form>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => console.log('google login')}
            className="w-full flex items-center justify-center gap-3 rounded-sm border border-surface-border bg-white px-5 py-3.5 text-sm font-semibold text-text-main hover:border-primary/40 transition-colors"
          >
            <FcGoogle className="w-4 h-4" />
            Masuk dengan Google
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
            className="text-xs text-text-muted hover:text-text-main underline underline-offset-4"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  );
}

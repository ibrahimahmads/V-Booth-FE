import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Edit2, Key, LogOut, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';
import InputField from '../components/atoms/InputField';
import PasswordInputField from '../components/atoms/PasswordInputField';
import Button from '../components/atoms/Button';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import { useAuthStore } from '../stores/useAuthStore';
import { logout } from '../services/auth.service';
import type { ApiErrorResponse } from '../services/api';
import { errorAlert, successAlert } from '../utils/alert/alert';
import { useNavigate } from 'react-router-dom';
import { useLoadingStore } from '../stores/useLoadingStore';
import { editAccountProfil, getMyAccount, changePassword } from '../services/account.service';
import type { EditAccountRequest, ChangePasswordRequest } from '../types/account.types';
import { emailPattern, passwordPattern, usernamePattern } from '../utils/helper/pattern';

export default function AccountPage() {
  const navigate = useNavigate();
  const { setIsLoading } = useLoadingStore();
  const { account, setAccount, reset } = useAuthStore();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Form: Edit Profile
  const {
    register: registerEditProfile,
    handleSubmit: handleSubmitEditProfile,
    formState: { errors: errorsEditProfile, isSubmitting: isSubmittingEditProfile },
    reset: resetEditProfile,
  } = useForm<EditAccountRequest>({ mode: 'onChange' });

  // Form: Change Password
  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword, isSubmitting: isSubmittingChangePassword },
    reset: resetChangePassword,
    watch: watchChangePassword,
  } = useForm<ChangePasswordRequest & { confirmPassword: string }>({ mode: 'onChange' });

  const fetchAccount = async () => {
    setIsLoading(true);
    try {
      const res = await getMyAccount();
      setAccount(res);
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const msg = err.response?.data?.message || 'Gagal dapat data akun';
      errorAlert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleOpenEditProfileModal = () => {
    if (account) {
      resetEditProfile({
        name: account.name,
        username: account.username,
        email: account.email,
      });
    }
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async (data: EditAccountRequest) => {
    try {
      const res = await editAccountProfil(data);
      setAccount(res);
      successAlert('Edit profil berhasil');
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const msg = err.response?.data?.message || 'Gagal edit profil';
      errorAlert(msg);
    }finally{
      setShowEditProfileModal(false);
    }
  };

  const handleChangePassword = async (data: ChangePasswordRequest & { confirmPassword: string }) => {
    const { ...payload } = data;
    try {
      await changePassword(payload);
      successAlert('Password berhasil diubah');
      resetChangePassword();
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const msg = err.response?.data?.message || 'Gagal ubah password';
      errorAlert(msg);
    }finally{
      setShowChangePasswordModal(false);
    }
  };

  const handleDialogLogoutOpen = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      reset();
      navigate('/login');
    } catch (error: unknown) {
      const err = error as ApiErrorResponse;
      const message = err.response?.data?.message || 'Gagal Logout';
      errorAlert(message);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-text-main">Akun</h1>
          <p className="text-text-muted mt-2">Kelola profil dan keamanan akun Anda.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-canvas-border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-secondary-border border-2 border-primary flex items-center justify-center shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-main">{account?.name}</h2>
                <p className="text-sm text-text-muted mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {account?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenEditProfileModal}
              className="p-2 rounded-lg border border-canvas-border hover:bg-canvas-placeholder transition-colors"
              title="Edit Profile"
            >
              <Edit2 className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg border border-canvas-border overflow-hidden">
          <button
            onClick={() => {
              resetChangePassword();
              setShowChangePasswordModal(true);
            }}
            className="w-full flex items-center gap-4 p-5 hover:bg-canvas-placeholder transition-colors text-left border-b border-canvas-border"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text-main">Ubah Password</p>
              <p className="text-sm text-text-muted">Perbarui password akun Anda untuk keamanan yang lebih baik.</p>
            </div>
            <Lock className="w-4 h-4 text-text-muted" />
          </button>

          {/* Mobile Logout Button */}
          <button
            onClick={handleDialogLogoutOpen}
            disabled={isLoggingOut}
            className="lg:hidden w-full flex items-center gap-4 p-5 hover:bg-red-50 transition-colors text-left text-red-600 disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Keluar</p>
              <p className="text-sm text-red-500">Logout dari akun Anda</p>
            </div>
          </button>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>
              <form onSubmit={handleSubmitEditProfile(handleSaveProfile)} className="space-y-4">
                <InputField
                  label="Nama"
                  type="text"
                  placeholder="Nama lengkap"
                  {...registerEditProfile('name', {
                    required: 'Nama tidak boleh kosong.',
                    minLength: { value: 1, message: 'Nama tidak boleh kosong.' },
                  })}
                  error={errorsEditProfile.name?.message}
                />

                <InputField
                  label="Username"
                  type="text"
                  placeholder="pengguna123"
                  {...registerEditProfile('username', {
                    required: 'Username tidak boleh kosong.',
                    minLength: { value: 3, message: 'Minimal 3 karakter.' },
                    maxLength: { value: 20, message: 'Maksimal 20 karakter.' },
                    pattern: {
                      value: usernamePattern,
                      message: 'Hanya huruf dan angka.',
                    },
                  })}
                  error={errorsEditProfile.username?.message}
                />

                <InputField
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  {...registerEditProfile('email', {
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
                  error={errorsEditProfile.email?.message}
                />

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    className='py-1.5'
                    onClick={() => setShowEditProfileModal(false)}
                    disabled={isSubmittingEditProfile}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    className='py-1.5'
                    disabled={isSubmittingEditProfile}
                  >
                    {isSubmittingEditProfile ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sedang Menyimpan...
                      </>
                    ) : (
                      'Simpan'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Ubah Password</h3>
              <form onSubmit={handleSubmitChangePassword(handleChangePassword)} className="space-y-4">
                <PasswordInputField
                  label="Password Lama"
                  placeholder="Masukkan password lama"
                  {...registerChangePassword('oldPassword', {
                    required: 'Password lama tidak boleh kosong.',
                  })}
                  error={errorsChangePassword.oldPassword?.message}
                />

                <PasswordInputField
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  {...registerChangePassword('newPassword', {
                    required: 'Password baru tidak boleh kosong.',
                    minLength: {
                      value: 8,
                      message: 'Minimal 8 karakter.',
                    },
                    pattern: {
                      value: passwordPattern,
                      message: 'Wajib ada 1 huruf besar, 1 angka, dan 1 karakter khusus.',
                    },
                  })}
                  error={errorsChangePassword.newPassword?.message}
                />

                <PasswordInputField
                  label="Konfirmasi Password"
                  placeholder="Ulangi password baru"
                  {...registerChangePassword('confirmPassword', {
                    required: 'Konfirmasi password tidak boleh kosong.',
                    validate: (val) => {
                      if (watchChangePassword('newPassword') !== val) {
                        return 'Password tidak cocok.';
                      }
                    },
                  })}
                  error={errorsChangePassword.confirmPassword?.message}
                />

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    className='py-1.5'
                    onClick={() => setShowChangePasswordModal(false)}
                    disabled={isSubmittingChangePassword}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    className='py-1.5'
                    disabled={isSubmittingChangePassword}
                  >
                    {isSubmittingChangePassword ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      'Simpan'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmDialog
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
          title="Apakah Anda yakin ingin keluar?"
          onAction={handleLogout}
          isLoading={isLoggingOut}
          variant="danger"
        />
      </div>
    </DashboardLayout>
  );
}

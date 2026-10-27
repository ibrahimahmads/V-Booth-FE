import { useState } from 'react';
import { User, Mail, Lock, Edit2, Key } from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';

interface UserProfile {
  name: string;
  email: string;
}

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ahmad Ibrahim',
    email: 'ahmad@example.com',
  });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setShowEditProfileModal(false);
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
              <div className="w-16 h-16 rounded-full bg-surface-secondary-border border-2 border-primary flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-main">{profile.name}</h2>
                <p className="text-sm text-text-muted mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setTempProfile(profile);
                setShowEditProfileModal(true);
              }}
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
            onClick={() => setShowChangePasswordModal(true)}
            className="w-full flex items-center gap-4 p-5 hover:bg-canvas-placeholder transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text-main">Ubah Password</p>
              <p className="text-sm text-text-muted">Perbarui password akun Anda untuk keamanan yang lebih baik.</p>
            </div>
            <Lock className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Nama</label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-canvas-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Email</label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-canvas-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold mb-4">Ubah Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    className="w-full px-4 py-2.5 rounded-lg border border-canvas-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1.5">Konfirmasi Password</label>
                  <input
                    type="password"
                    placeholder="Ulangi password baru"
                    className="w-full px-4 py-2.5 rounded-lg border border-canvas-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    console.log('Change password');
                    setShowChangePasswordModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

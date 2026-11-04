import AdminDashboardLayout from '../../components/templates/AdminDashboardLayout';

export default function AdminSettingsPage() {
  return (
    <AdminDashboardLayout>
      <div className="p-8">
        <div className="bg-white rounded-lg border border-canvas-border p-8 text-center">
          <p className="text-lg text-text-main">ini Pengaturan admin</p>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}

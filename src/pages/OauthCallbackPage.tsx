import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status') === 'success' ? 'success' : 'error';
    const message = { type: 'GOOGLE_AUTH', status };

    // Jalur utama
    if (window.opener) {
      window.opener.postMessage(message, window.location.origin);
    }

    // Jalur cadangan
    const channel = new BroadcastChannel('google-oauth');
    channel.postMessage(message);
    channel.close();

    // Beri waktu pesan terkirim sebelum menutup
    setTimeout(() => window.close(), 150);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
      Memproses login...
    </div>
  );
}
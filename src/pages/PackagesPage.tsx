import { ArrowUpRight, CircleCheck} from 'lucide-react';
import DashboardLayout from '../components/templates/DashboardLayout';
import { usePaketStore } from '@/stores/usePaketStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { getAllPaket } from '@/services/paket.service';
import type { ApiErrorResponse } from '@/services/api';
import { errorAlertWithTitle } from '@/utils/alert/alert';
import { useEffect } from 'react';
import PackagesPageSkeleton from '../components/skeletons/PackagesPageSkeleton';

export default function PackagesPage() {
  const { listPaket, setListPaket} = usePaketStore();
  const { isLoading, setIsLoading} = useLoadingStore();
  
    const fetchListPaket = async()=>{
      try {
        setIsLoading(true);
        const res = await getAllPaket();
        setListPaket(res);
      } catch (error:unknown) {
        const err = error as ApiErrorResponse;
        const msg = err.response?.data?.message||"Gagal ambil data paket";
        errorAlertWithTitle("Failed Fetch List Paket",msg)
      }finally{
        // setIsLoading(false);
      }
    }
  
    useEffect(()=>{
      if(listPaket.length == 0){
        fetchListPaket();
      }
    },[])

  if (isLoading) {
    return (
      <DashboardLayout>
        <PackagesPageSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl lg:mx-auto mx-1.5 px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-serif text-text-main">Pilih Paket</h1>
          <p className="text-text-muted">Pilih paket yang sesuai untuk acara Anda.</p>
        </div>

        <div className="border-t border-canvas-border mx-1.5 lg:mx-0">
          {listPaket.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 py-8 sm:py-10 border-b border-canvas-border ${
                i === 1 ? 'lg:bg-white lg:px-8 lg:-mx-8 lg:border-x lg:border-canvas-border' : ''
              }`}
            >
              <div className="lg:col-span-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-text-muted">{`Paket 0`+(i+1)}</span>
                <h3 className="font-serif text-2xl sm:text-[27px] text-text-main mt-1.5">{pkg.name}</h3>
                <p className="text-sm text-text-muted mt-1">{pkg.description}</p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-3 gap-x-6 gap-y-3">
                <div className="text-xs w-fit">
                  <span className="block text-text-muted">Masa aktif acara</span>
                  <span className="flex justify-center mt-0.5 text-text-main/75 font-serif text-base leading-none">{pkg.eventActivePeriod+` Hari`}</span>
                </div>
                <div className="text-xs w-fit">
                  <span className="block text-text-muted">Masa aktif galery</span>
                  <span className="flex justify-center mt-0.5 text-text-main/75 font-serif text-base leading-none">{pkg.galeryActivePeriod+` Hari`}</span>
                </div>
                <div className="text-xs w-fit">
                  <span className="block text-text-muted">Jumlah tamu</span>
                  <span className="flex justify-center mt-0.5 text-text-main/75 font-serif text-base leading-none">{pkg.maxGuest}</span>
                </div>
                <div className="text-xs w-fit">
                  <span className="block text-text-muted">Foto & pesan suara</span>
                  <span className="flex justify-center mt-0.5 text-text-main/75 font-serif text-base leading-none text-center">{pkg.isCanPhotoAndVoice?
                    <CircleCheck size={20}/>:'-'}</span>
                </div>
                <div className="text-xs w-fit">
                  <span className="block text-text-muted">Url slug kostum</span>
                  <span className="flex justify-center mt-0.5 text-text-main/75 font-serif text-base leading-none">{pkg.isUrlSlug?
                    <CircleCheck size={20}/>:'-'}</span>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl text-text-main/45">Rp. {pkg.price}</span>
                </div>
                <button
                  className="rounded-sm px-5 py-3 text-sm border border-canvas-border text-text-main hover:bg-canvas-placeholder transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  Pilih paket
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

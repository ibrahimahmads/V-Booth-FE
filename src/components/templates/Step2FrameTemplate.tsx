import { ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import Header from '../molecules/Header';
import StepHeader from '../molecules/StepHeader';
import Button from '../atoms/Button';
import Konva from 'konva';
import type { FrameItem } from '../../types/frame.types';
import type { PhotoLayerItem } from '../organisms/KonvaFrameEditor';
import KonvaFrameEditor from '../organisms/KonvaFrameEditor';
import KonvaEditorSkeleton from '../skeletons/KonvaEditorSkeleton';

interface Step2FrameTemplateProps {
  rawPhotos: string[]; // 3 Foto Mentah dari Step 1
  photoLayers: PhotoLayerItem[];
  frames: FrameItem[];
  selectedFrame: FrameItem | null;
  selectedPhotoId: string | null;
  loading: boolean;
  isEditMode?: boolean;
  stageRef: React.RefObject<Konva.Stage | null>;
  onSelectFrame: (frame: FrameItem) => void;
  onSelectPhotoLayer: (id: string | null) => void;
  onAddPhotoToCanvas: (url: string) => void;
  onUpdatePhotoLayer: (id: string, newAttrs: Partial<PhotoLayerItem>) => void;
  onRemovePhotoLayer: (id: string) => void;
  onNextStep: () => void;
  onBackStep: () => void;
}

export default function Step2FrameTemplate({
  rawPhotos,
  photoLayers,
  frames,
  selectedFrame,
  selectedPhotoId,
  loading,
  isEditMode,
  stageRef,
  onSelectFrame,
  onSelectPhotoLayer,
  onAddPhotoToCanvas,
  onUpdatePhotoLayer,
  onRemovePhotoLayer,
  onNextStep,
  onBackStep,
}: Step2FrameTemplateProps) {
  return (
    <div className="min-h-screen bg-canvas-bg flex flex-col justify-between pb-20">
      <Header />

      <main className="max-w-md w-full mx-auto px-4 py-4 space-y-4 flex-1">
        <StepHeader currentStep={2} totalSteps={4} stepTitle="Edit & Frame" />

        {/* KONVA CANVAS EDITOR AREA (SKELETON / REAL) */}
        {loading ? (
          <KonvaEditorSkeleton />
        ) : (
          selectedFrame && (
            <KonvaFrameEditor
              photoLayers={photoLayers}
              frameOverlayUrl={selectedFrame.overlayUrl}
              selectedPhotoId={selectedPhotoId}
              stageRef={stageRef}
              onSelectPhotoLayer={onSelectPhotoLayer}
              onUpdatePhotoLayer={onUpdatePhotoLayer}
              onRemovePhotoLayer={onRemovePhotoLayer}
            />
          )
        )}

        {/* QoL FEATURE 1: Strip Foto Mentah dari Step 1 (Tambahkan ke Canvas) */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Koleksi Foto Step 1:
            </label>
            <span className="text-[11px] text-text-muted">Klik `+` untuk masuk ke bingkai</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {rawPhotos.map((src, index) => (
              <button
                key={index}
                onClick={() => onAddPhotoToCanvas(src)}
                className="relative aspect-square rounded-xl overflow-hidden border-2 border-canvas-border bg-white group hover:border-primary transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Hasil ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  #{index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* QoL FEATURE 2: Horizontal Scroll Selector Bingkai */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Pilih Bingkai Ucapan:
          </label>

          {loading ? (
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-20 h-28 bg-surface-secondary-border rounded-xl animate-pulse shrink-0 border border-canvas-border" />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
              {/* 💡 PASTIKAN frames ADALAH ARRAY SEBELUM DILAKUKAN .map() */}
              {Array.isArray(frames) && frames.length > 0 ? (
                frames.map((frame) => {
                  const isSelected = selectedFrame?.id === frame.id;
                  return (
                    <button
                      key={frame.id}
                      onClick={() => onSelectFrame(frame)}
                      className={`snap-start shrink-0 w-20 p-1.5 rounded-xl border-2 transition-all flex flex-col items-center gap-1 bg-white cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 font-bold text-primary'
                          : 'border-canvas-border text-text-muted hover:border-canvas-muted'
                      }`}
                    >
                      <div className="w-full aspect-9/16 bg-canvas-placeholder rounded-lg overflow-hidden border border-canvas-border">
                        <img
                          src={frame.overlayUrl}
                          alt={frame.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] truncate w-full text-center">
                        {frame.name}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="text-xs text-text-muted py-2">Bingkai tidak tersedia</p>
              )}
            </div>
          )}
        </div>

        {/* Navigation Action Footer */}
        <div className="flex justify-between items-center pt-2">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} onClick={onBackStep}>
            Kembali
          </Button>
          <Button
            variant="tertiary"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={onNextStep}
            disabled={loading || !selectedFrame || photoLayers.length === 0}
          >
            {isEditMode ? 'Simpan Foto' : 'Next Step (Audio)'}
          </Button>
        </div>
      </main>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showJumpInput?: boolean;
  totalElements?: number;
  pageSize?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showJumpInput = false,
  totalElements,
  pageSize,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState<string>('');

  useEffect(() => {
    setJumpPage('');
  }, [currentPage]);

  if (totalPages <= 1 && !totalElements) return null;

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage('');
    }
  };

  // Generate page numbers array with optional ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const startElement = totalElements && pageSize ? (currentPage - 1) * pageSize + 1 : null;
  const endElement =
    totalElements && pageSize ? Math.min(currentPage * pageSize, totalElements) : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-canvas-border">
      {/* Informative text */}
      <div className="text-xs text-text-muted text-center sm:text-left">
        {startElement && endElement && totalElements ? (
          <span>
            Menampilkan <span className="font-semibold text-text-main">{startElement}</span> -{' '}
            <span className="font-semibold text-text-main">{endElement}</span> dari{' '}
            <span className="font-semibold text-text-main">{totalElements}</span> data
          </span>
        ) : (
          <span>
            Halaman <span className="font-semibold text-text-main">{currentPage}</span> dari{' '}
            <span className="font-semibold text-text-main">{totalPages || 1}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous Button */}
        <Button
          variant="secondary"
          className="py-1.5 px-3 text-xs"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          icon={<ChevronLeft className="w-4 h-4" />}
          aria-label="Halaman sebelumnya"
        >
          <span className="hidden xs:inline">Sebelumnya</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) =>
            typeof p === 'number' ? (
              <button
                key={idx}
                onClick={() => onPageChange(p)}
                className={`min-w-8 h-8 px-2 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  p === currentPage
                    ? 'bg-primary text-white font-bold'
                    : 'text-text-muted hover:bg-canvas-placeholder hover:text-text-main'
                }`}
              >
                {p}
              </button>
            ) : (
              <span key={idx} className="px-1 text-xs text-text-muted">
                {p}
              </span>
            )
          )}
        </div>

        {/* Next Button */}
        <Button
          variant="secondary"
          className="py-1.5 px-3 text-xs"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman selanjutnya"
        >
          <span className="hidden xs:inline">Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Jump Input (Khusus Admin atau opsional) */}
        {showJumpInput && totalPages > 1 && (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1 ml-2 border-l border-canvas-border pl-3">
            <span className="text-xs text-text-muted hidden md:inline">Lompat:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder="#"
              className="w-12 h-8 px-2 text-xs text-center border border-canvas-border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary text-text-main"
            />
            <button
              type="submit"
              disabled={!jumpPage}
              className="h-8 px-2 bg-surface-secondary hover:bg-canvas-placeholder text-text-main text-xs rounded-lg font-medium border border-canvas-border disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
              title="Pergi ke halaman"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

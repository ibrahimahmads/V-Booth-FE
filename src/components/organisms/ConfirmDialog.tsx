import { type ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode; // Opsional: bisa string biasa atau elemen JSX
  cancelText?: string;
  actionText?: string;
  onAction: () => void | Promise<void>;
  isLoading?: boolean;
  variant?: 'danger' | 'primary'; // Pilihan style tombol action
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = 'Batal',
  actionText = 'Konfirmasi',
  onAction,
  isLoading = false,
  variant = 'primary',
}: ConfirmDialogProps) {
  const actionButtonStyle =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600'
      : 'bg-primary hover:bg-primary/90 text-white';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); 
              onAction();
            }}
            disabled={isLoading}
            className={actionButtonStyle}
          >
            {isLoading ? `${actionText}...` : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
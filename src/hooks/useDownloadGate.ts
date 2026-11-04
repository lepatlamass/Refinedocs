'use client';

import { useCallback } from 'react';
import { triggerBlobDownload } from '@/lib/fileCache';

export type DownloadGateModalState = 'none';

export interface UseDownloadGateReturn {
  /** Directly triggers the download function */
  guardedDownload: (downloadFn: () => void) => void;
  /** Directly resolves the blob and triggers browser download */
  guardedBlobDownload: (
    blobOrGetter: Blob | (() => Blob | Promise<Blob>),
    filename: string
  ) => void;
  /** Modal state is always 'none' in the open-source version */
  modalState: DownloadGateModalState;
  closeModal: () => void;
  onLoginSuccess: () => void;
}

/**
 * Open-source download handler:
 * Direct, unmetered, client-side downloads without logins, paywalls, or rate limits.
 */
export function useDownloadGate(_toolId?: string): UseDownloadGateReturn {
  const guardedDownload = useCallback((downloadFn: () => void) => {
    downloadFn();
  }, []);

  const guardedBlobDownload = useCallback(
    async (
      blobOrGetter: Blob | (() => Blob | Promise<Blob>),
      filename: string
    ) => {
      try {
        const blob = typeof blobOrGetter === 'function' ? await blobOrGetter() : blobOrGetter;
        triggerBlobDownload(blob, filename);
      } catch (err) {
        console.error('Failed to trigger download:', err);
      }
    },
    []
  );

  return {
    guardedDownload,
    guardedBlobDownload,
    modalState: 'none',
    closeModal: () => {},
    onLoginSuccess: () => {},
  };
}

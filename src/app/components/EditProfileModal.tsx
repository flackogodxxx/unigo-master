'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FaCamera, FaTimes, FaUser } from 'react-icons/fa';
import userService, { UserData } from '../services/userService';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userData,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(userData.name);
  const [previewImage, setPreviewImage] = useState(userData.image);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(userData.name);
    setPreviewImage(userData.image);
    setError('');
    setIsLoading(false);
  }, [isOpen, userData.image, userData.name]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem valido.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no maximo 5 MB.');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      const imageUrl = await userService.uploadImage(file);
      setPreviewImage(imageUrl);
    } catch {
      setError('Nao foi possivel atualizar a imagem agora.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Informe o nome que deve aparecer no app.');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await userService.updateProfile({
        name: name.trim(),
        image: previewImage,
      });
      onClose();
    } catch {
      setError('Nao foi possivel salvar agora. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/58 p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            aria-label="Fechar edicao"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] bg-white sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Conta UniFio
                </div>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  Atualize seu perfil
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-900"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-5">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5">
                <div className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="group relative"
                  >
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.32)]">
                      {previewImage ? (
                        <Image
                          src={previewImage}
                          alt={name || 'Perfil UniGo'}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-4xl text-slate-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,0.8)] transition-transform group-hover:scale-105">
                      <FaCamera className="text-sm" />
                    </div>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    Foto de perfil
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Escolha uma imagem clara para a sua identificacao no app.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nome exibido
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  placeholder="Como voce quer aparecer no UniGo"
                  required
                />
              </div>

              {error ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.72)] transition-colors hover:bg-blue-900 sm:flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar perfil'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Smartphone,
  Download,
  Share,
  CheckCircle2,
  Zap,
  WifiOff,
  Bell,
  Shield,
} from 'lucide-react'
import { useInstallPWA } from '@/hooks/use-install-pwa'

const features = [
  {
    icon: Zap,
    text: "Accès rapide depuis votre écran d'accueil",
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: WifiOff,
    text: 'Fonctionne même hors connexion',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Bell,
    text: 'Notifications en temps réel',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Shield,
    text: 'Sécurisé et toujours à jour',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
}

interface InstallModalProps {
  open: boolean
  onClose: () => void
}

export function InstallModal({ open, onClose }: InstallModalProps) {
  const { isIOS, promptInstall, dismiss } = useInstallPWA()

  const handleInstall = async () => {
    const accepted = await promptInstall()
    if (accepted) {
      dismiss()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-2xl"
            >
              {/* Header gradient */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#2302B3] to-[#4318FF] px-6 pb-8 pt-6">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                  <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/[0.06]" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white/80 transition-all hover:bg-white/25 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Icon + Title */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 200,
                      damping: 15,
                      delay: 0.15,
                    }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm"
                  >
                    <Smartphone className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl font-bold text-white"
                  >
                    Installer Help Digi School
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mt-1 text-sm text-white/70"
                  >
                    Accédez à l&apos;application directement depuis votre appareil
                  </motion.p>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {isIOS ? (
                  /* iOS Instructions */
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">
                      Pour installer sur votre iPhone/iPad :
                    </p>
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-3 rounded-xl bg-gray-50 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                          <span className="text-sm font-bold text-blue-600">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Appuyez sur{' '}
                            <span className="inline-flex items-center gap-1 rounded-md bg-gray-200/80 px-2 py-0.5 text-xs font-semibold text-gray-700">
                              <Share className="h-3 w-3" /> Partager
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">En bas de Safari</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-3 rounded-xl bg-gray-50 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                          <span className="text-sm font-bold text-blue-600">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Sélectionnez{' '}
                            <span className="rounded-md bg-gray-200/80 px-2 py-0.5 text-xs font-semibold text-gray-700">
                              Sur l&apos;écran d&apos;accueil
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            Faites défiler si nécessaire
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-3 rounded-xl bg-gray-50 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                          <span className="text-sm font-bold text-emerald-600">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Confirmez avec{' '}
                            <span className="rounded-md bg-gray-200/80 px-2 py-0.5 text-xs font-semibold text-gray-700">
                              Ajouter
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            L&apos;icône apparaîtra sur votre écran
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* Android / Desktop - Features + Install button */
                  <div className="space-y-4">
                    <div className="space-y-2.5">
                      {features.map((feature, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={featureVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center gap-3 rounded-xl bg-gray-50/80 px-3 py-2.5"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${feature.bg}`}
                          >
                            <feature.icon className={`h-4 w-4 ${feature.color}`} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                          <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleInstall}
                      className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2302B3] to-[#4318FF] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2302B3]/25 transition-shadow hover:shadow-xl hover:shadow-[#2302B3]/30"
                    >
                      <Download className="h-5 w-5" />
                      Installer Maintenant
                    </motion.button>
                  </div>
                )}

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 text-center text-[11px] text-gray-400"
                >
                  Gratuit · Aucun téléchargement App Store requis · Léger et rapide
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

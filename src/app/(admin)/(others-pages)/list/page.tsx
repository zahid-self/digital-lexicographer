"use client"

import { VocabularyTable } from "@/components/tables/vocabulary-table"
import { useState } from "react"

interface VocabularyEntry {
  id: string
  word: string
  meaningBangla: string
  meaningEnglish: string
  exampleSentence: string
  createdAt: Date
}

function VocabularyModal({
  vocabulary,
  onClose,
  onDelete,
}: {
  vocabulary: VocabularyEntry
  onClose: () => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-[584px] w-full p-5 lg:p-10 animate-in zoom-in-95 duration-200">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">Vocabulary Details</h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Word</label>
            <div className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 flex items-center">
              <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">{vocabulary.word}</span>
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bangla Meaning</label>
            <div className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 flex items-center">
              <span style={{ fontFamily: "Arial, sans-serif" }}>
                {vocabulary.meaningBangla || <span className="text-gray-400 italic">Not provided</span>}
              </span>
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">English Meaning</label>
            <div className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 flex items-center">
              <span>{vocabulary.meaningEnglish || <span className="text-gray-400 italic">Not provided</span>}</span>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example Sentence</label>
            <div className="min-h-[44px] w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 flex items-center">
              <span className="italic">
                {vocabulary.exampleSentence ? (
                  `"${vocabulary.exampleSentence}"`
                ) : (
                  <span className="text-gray-400 not-italic">No example provided</span>
                )}
              </span>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Added</label>
            <div className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 flex items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {vocabulary.createdAt.toLocaleDateString()} at {vocabulary.createdAt.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <button
            onClick={() => {
              onDelete(vocabulary.id)
              onClose()
            }}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VocabulariesPage() {
  const [selectedVocabulary, setSelectedVocabulary] = useState<VocabularyEntry | null>(null)
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ message, type })
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleVocabularyClick = (vocabulary: VocabularyEntry) => {
    setSelectedVocabulary(vocabulary)
  }

  const handleCloseModal = () => {
    setSelectedVocabulary(null)
  }

  const handleDeleteVocabulary = (id: string) => {
    const event = new Event("storage")
    window.dispatchEvent(event)
    showToastMessage("Vocabulary deleted successfully", "success")
  }

  return (
    <div>
      {showToast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-300 ${showToast.type === "success"
            ? "bg-primary text-primary-foreground"
            : "bg-destructive text-destructive-foreground"
            }`}
        >
          <div className="flex items-center gap-2">
            {showToast.type === "success" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {showToast.message}
          </div>
        </div>
      )}

      <VocabularyTable onVocabularyClick={handleVocabularyClick} />

      {selectedVocabulary && (
        <VocabularyModal vocabulary={selectedVocabulary} onClose={handleCloseModal} onDelete={handleDeleteVocabulary} />
      )}
    </div>
  )
}

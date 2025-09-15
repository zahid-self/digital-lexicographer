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
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-border bg-primary/5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-1">{vocabulary.word}</h3>
              <p className="text-sm text-muted-foreground">
                Added on {vocabulary.createdAt.toLocaleDateString()} at {vocabulary.createdAt.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {vocabulary.meaningBangla && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">Bangla Meaning</label>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-foreground text-base leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                  {vocabulary.meaningBangla}
                </p>
              </div>
            </div>
          )}

          {vocabulary.meaningEnglish && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">English Meaning</label>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-foreground text-base leading-relaxed">{vocabulary.meaningEnglish}</p>
              </div>
            </div>
          )}

          {vocabulary.exampleSentence && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">Example Sentence</label>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
<p className="text-foreground text-base leading-relaxed italic">&quot;{vocabulary.exampleSentence}&quot;</p>
              </div>
            </div>
          )}

          {!vocabulary.meaningBangla && !vocabulary.meaningEnglish && !vocabulary.exampleSentence && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">No additional details available for this word.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
          <button
            onClick={() => {
              onDelete(vocabulary.id)
              onClose()
            }}
            className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
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
            className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium text-sm transition-colors"
          >
            Close
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

  const handleDeleteVocabulary = () => {
    const event = new Event("storage")
    window.dispatchEvent(event)
    showToastMessage("Vocabulary deleted successfully", "success")
  }

  return (
    <div>
      {/* Toast Notification */}
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

      {/* Modal */}
      {selectedVocabulary && (
        <VocabularyModal vocabulary={selectedVocabulary} onClose={handleCloseModal} onDelete={handleDeleteVocabulary} />
      )}
    </div>
  )
}

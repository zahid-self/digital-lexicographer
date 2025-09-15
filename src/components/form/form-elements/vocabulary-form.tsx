"use client"

import supabase from "@/helpers/supabase-instance"
import type React from "react"
import { useState } from "react"


interface VocabularyEntry {
  word: string
  meaningBangla: string
  meaningEnglish: string
  exampleSentence: string
}

export function VocabularyForm() {
  const [formData, setFormData] = useState<VocabularyEntry>({
    word: "",
    meaningBangla: "",
    meaningEnglish: "",
    exampleSentence: "",
  })

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handleInputChange = (field: keyof VocabularyEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ message, type })
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate required fields
    if (!formData.word.trim()) {
      showToastMessage("Please enter a word", "error")
      setLoading(false)
      return
    }

    if (!formData.meaningBangla.trim() && !formData.meaningEnglish.trim()) {
      showToastMessage("Please provide at least one meaning (Bangla or English)", "error")
      setLoading(false)
      return
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('vocabulary') // Replace with your actual table name
        .insert([
          {
            word: formData.word.trim(),
            meaning_bangla: formData.meaningBangla.trim(),
            meaning_english: formData.meaningEnglish.trim(),
            example_sentence: formData.exampleSentence.trim(),
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        throw error
      }

      console.log("Vocabulary Entry Saved:", data)
      showToastMessage(`Added "${formData.word}" to vocabulary`, "success")

      // Reset form
      setFormData({
        word: "",
        meaningBangla: "",
        meaningEnglish: "",
        exampleSentence: "",
      })
    } catch (error) {
      console.error("Error saving vocabulary:", error)
      showToastMessage("Failed to save vocabulary. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      word: "",
      meaningBangla: "",
      meaningEnglish: "",
      exampleSentence: "",
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showToast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${showToast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
        >
          {showToast.message}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Vocabulary</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Enter a new word with its meanings and an example sentence
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Word Input */}
            <div className="space-y-2">
              <label htmlFor="word" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Word *
              </label>
              <input
                id="word"
                type="text"
                placeholder="Enter the word"
                value={formData.word}
                onChange={(e) => handleInputChange("word", e.target.value)}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                required
                disabled={loading}
              />
            </div>

            {/* Bangla Meaning */}
            <div className="space-y-2">
              <label htmlFor="meaningBangla" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Meaning in Bangla
              </label>
              <input
                id="meaningBangla"
                type="text"
                placeholder="বাংলা অর্থ লিখুন"
                value={formData.meaningBangla}
                onChange={(e) => handleInputChange("meaningBangla", e.target.value)}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                style={{ fontFamily: "Arial, sans-serif" }}
                disabled={loading}
              />
            </div>

            {/* English Meaning */}
            <div className="space-y-2">
              <label htmlFor="meaningEnglish" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Meaning in English
              </label>
              <input
                id="meaningEnglish"
                type="text"
                placeholder="Enter English meaning"
                value={formData.meaningEnglish}
                onChange={(e) => handleInputChange("meaningEnglish", e.target.value)}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                disabled={loading}
              />
            </div>

            {/* Example Sentence */}
            <div className="space-y-2">
              <label htmlFor="exampleSentence" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Example Sentence
              </label>
              <textarea
                id="exampleSentence"
                placeholder="Write an example sentence using this word..."
                value={formData.exampleSentence}
                onChange={(e) => handleInputChange("exampleSentence", e.target.value)}
                className="w-full min-h-[80px] resize-none rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium text-sm transition-colors"
                disabled={!formData.word.trim() || loading}
              >
                {loading ? "Adding..." : "Add Vocabulary"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 h-10 py-2 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-medium text-sm transition-colors"
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
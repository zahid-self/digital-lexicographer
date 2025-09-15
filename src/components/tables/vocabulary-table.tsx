"use client"

import supabase from "@/helpers/supabase-instance"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"

interface VocabularyEntry {
  id: string
  word: string
  meaningBangla: string
  meaningEnglish: string
  exampleSentence: string
  createdAt: Date
}

interface VocabularyTableProps {
  onVocabularyClick?: (vocabulary: VocabularyEntry) => void
}

export function VocabularyTable({ onVocabularyClick }: VocabularyTableProps) {

  const [vocabularies, setVocabularies] = useState<VocabularyEntry[]>([]);

  // Fetch all vocabularies
  const fetchVocabularies = async () => {
    try {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match your interface
      const formattedData: VocabularyEntry[] = data.map(item => ({
        id: item.id,
        word: item.word,
        meaningBangla: item.meaning_bangla,
        meaningEnglish: item.meaning_english,
        exampleSentence: item.example_sentence,
        createdAt: new Date(item.created_at)
      }));

      setVocabularies(formattedData);
    } catch (error) {
      console.error('Error fetching vocabularies:', error);
      // showToastMessage('Failed to fetch vocabularies', 'error');
    }
  };

  // Call this function when component mounts
  useEffect(() => {
    fetchVocabularies();
  }, []);


  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"word" | "createdAt">("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const loadVocabularies = () => {
      const stored = localStorage.getItem("vocabularies")
      if (stored) {
        const parsed = JSON.parse(stored).map((vocab: any) => ({
          ...vocab,
          createdAt: new Date(vocab.createdAt),
        }))
        setVocabularies(parsed)
      }
    }

    loadVocabularies()
    // Listen for storage changes to update table when new vocabulary is added
    window.addEventListener("storage", loadVocabularies)
    return () => window.removeEventListener("storage", loadVocabularies)
  }, [])

  const filteredAndSortedVocabularies = vocabularies
    .filter(
      (vocab) =>
        vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.meaningBangla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocab.meaningEnglish.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "word") {
        const comparison = a.word.localeCompare(b.word)
        return sortOrder === "asc" ? comparison : -comparison
      } else {
        const comparison = a.createdAt.getTime() - b.createdAt.getTime()
        return sortOrder === "asc" ? comparison : -comparison
      }
    })

  const handleSort = (field: "word" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const deleteVocabulary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedVocabularies = vocabularies.filter((vocab) => vocab.id !== id)
    setVocabularies(updatedVocabularies)
    localStorage.setItem("vocabularies", JSON.stringify(updatedVocabularies))
  }

  if (vocabularies.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No vocabularies yet</h3>
          <p className="text-muted-foreground mb-4">Start building your vocabulary by adding your first word!</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Add Vocabulary
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Header with Search and Stats */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">My Vocabulary</h2>
            <p className="text-muted-foreground">
              {vocabularies.length} {vocabularies.length === 1 ? "word" : "words"} in your collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search vocabularies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5 border-b border-border">
            <tr>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleSort("word")}
              >
                <div className="flex items-center gap-2">
                  Word
                  <svg
                    className={`w-4 h-4 transition-transform ${sortBy === "word" && sortOrder === "desc" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Bangla Meaning</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">English Meaning</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Example</th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-2">
                  Added
                  <svg
                    className={`w-4 h-4 transition-transform ${sortBy === "createdAt" && sortOrder === "desc" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedVocabularies.map((vocab, index) => (
              <tr
                key={vocab.id}
                className={`cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:shadow-sm ${index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                onClick={() => onVocabularyClick?.(vocab)}
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary text-lg">{vocab.word}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-foreground max-w-xs truncate" style={{ fontFamily: "Arial, sans-serif" }}>
                    {vocab.meaningBangla || <span className="text-muted-foreground italic">Not provided</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-foreground max-w-xs truncate">
                    {vocab.meaningEnglish || <span className="text-muted-foreground italic">Not provided</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground italic max-w-sm truncate text-sm">
                    {vocab.exampleSentence || <span className="text-muted-foreground not-italic">No example</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-muted-foreground">{vocab.createdAt.toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => deleteVocabulary(vocab.id, e)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Delete vocabulary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filteredAndSortedVocabularies.length} of {vocabularies.length} vocabularies
          </span>
          <Link href="/vocabs" className="text-primary hover:text-primary/80 font-medium">
            Add New Vocabulary
          </Link>
        </div>
      </div>
    </div>
  )
}

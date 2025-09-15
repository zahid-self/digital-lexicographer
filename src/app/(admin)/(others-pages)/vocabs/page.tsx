
import { VocabularyForm } from '@/components/form/form-elements/vocabulary-form'
import React from 'react'

const Vocabs = () => {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Vocabulary Builder</h1>
          <p className="text-muted-foreground">Add new words with their meanings and example sentences</p>
        </div>
        <VocabularyForm />
      </div>
    </main>
  )
}

export default Vocabs
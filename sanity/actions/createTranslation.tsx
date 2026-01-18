'use client'

import {useState, useCallback} from 'react'
import {type DocumentActionComponent, type DocumentActionProps, useClient} from 'sanity'
import {useRouter} from 'sanity/router'

const AVAILABLE_LANGUAGES = [
  {code: 'el', label: 'EL - Ελληνικά'},
  {code: 'en', label: 'EN - English'},
]

const TRANSLATABLE_TYPES = ['page', 'post', 'therapyOffering']

export const createTranslationAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const {type, draft, published} = props
  const [isCreating, setIsCreating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const client = useClient({apiVersion: '2025-01-02'})
  const router = useRouter()

  const document = draft || published
  const currentLanguage = document?.language as string | undefined

  const isTranslatable = TRANSLATABLE_TYPES.includes(type)
  if (!isTranslatable) {
    return null
  }

  const availableTargetLanguages = AVAILABLE_LANGUAGES.filter(
    (lang) => lang.code !== currentLanguage
  )

  const handleCreateTranslation = useCallback(
    async (targetLanguage: string) => {
      if (!document) return

      setIsCreating(true)
      setDialogOpen(false)

      try {
        const {_id, _rev, _createdAt, _updatedAt, ...docWithoutMeta} = document as any

        const newDoc = {
          ...docWithoutMeta,
          _type: type,
          language: targetLanguage,
        }

        const result = await client.create(newDoc)

        router.navigateIntent('edit', {id: result._id, type})
      } catch (error) {
        console.error('Failed to create translation:', error)
      } finally {
        setIsCreating(false)
      }
    },
    [document, type, client, router]
  )

  if (!document || !currentLanguage) {
    return {
      label: 'Create Translation',
      disabled: true,
      title: 'Save the document first to create a translation',
    }
  }

  if (availableTargetLanguages.length === 0) {
    return {
      label: 'Create Translation',
      disabled: true,
      title: 'Translations exist for all available languages',
    }
  }

  return {
    label: isCreating ? 'Creating...' : 'Create Translation',
    disabled: isCreating,
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen
      ? {
          type: 'dialog',
          header: 'Create Translation',
          content: (
            <div style={{padding: '1rem'}}>
              <p style={{marginBottom: '1rem'}}>
                Create a translation of this document in another language. The slug will be kept the
                same.
              </p>
              <p style={{marginBottom: '1rem', fontSize: '0.875rem', color: '#666'}}>
                Current language:{' '}
                <strong>
                  {AVAILABLE_LANGUAGES.find((l) => l.code === currentLanguage)?.label ||
                    currentLanguage}
                </strong>
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {availableTargetLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleCreateTranslation(lang.code)}
                    disabled={isCreating}
                    style={{
                      padding: '0.75rem 1rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '1rem',
                    }}
                  >
                    Create {lang.label} version
                  </button>
                ))}
              </div>
            </div>
          ),
          onClose: () => setDialogOpen(false),
        }
      : null,
  }
}

import { NewPasswordForm } from '@/components/shared/auth/forms/new-password-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Изменение пароля'
}

export default function NewPasswordPage() {
   return <NewPasswordForm />
}
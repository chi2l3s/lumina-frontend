import { ResetPasswordForm } from '@/components/shared/auth/forms/reset-password-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Сброс пароля'
}

export default function ResetPasswordPage() {
   return <ResetPasswordForm />
}
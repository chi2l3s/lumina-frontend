import { LoginForm } from '@/components/shared/auth/forms/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Вход в аккаунт'
}

export default function LoginPage() {
   return <LoginForm />
}
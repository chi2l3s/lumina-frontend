import { CreateAccountForm } from '@/components/shared/auth/forms/create-account-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Регистрация'
}

export default function CreateAccountPage() {
   return <CreateAccountForm />
}
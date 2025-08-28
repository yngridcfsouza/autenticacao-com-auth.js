import { LoginForm } from "@/components/login-form"
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/login"
import { AuthError, CredentialsSignin } from "next-auth";

export default function Page() {
  async function loginAction(formData: FormData) {
    'use server';

    const { success, data } = loginSchema.safeParse(Object.fromEntries(formData));

    if (!success) {
      return;
    }

    const { email, password } = data;

    try {
      await signIn('credentials', {
        email,
        password,
      });

    } catch (error) {
      if (error instanceof CredentialsSignin) {
        return console.log('Erro de autenticação:', error);
      }

      if (error instanceof AuthError) {
        return console.log('Something went wrong! Try again.');
      }

      throw error;
    }

  }

  async function googleLoginAction() {
    'use server';

    await signIn('google');
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm loginAction={loginAction} googleLoginAction={googleLoginAction} />
      </div>
    </div>
  )
}

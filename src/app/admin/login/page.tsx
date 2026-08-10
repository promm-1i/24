import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "관리자 로그인",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-xl font-bold text-zinc-900">관리자 로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
}

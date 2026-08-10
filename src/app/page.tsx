import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Gallery } from "@/components/landing/Gallery";
import { Reviews } from "@/components/landing/Reviews";
import { EstimateForm } from "@/components/landing/EstimateForm";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Gallery />
        <Reviews />
        <section id="estimate" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            무료 견적 요청
          </h2>
          <p className="mt-2 text-center text-zinc-500">
            아래 정보를 남겨주시면 빠르게 연락드리겠습니다
          </p>
          <div className="mt-8">
            <EstimateForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

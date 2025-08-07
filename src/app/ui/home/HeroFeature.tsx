import Image from "next/image";
import Button from "../Button";

export default function HeroFeature() {
    return (
        <section className="relative mt-10 flex flex-col before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-b before:from-white before:via-[#f3f6fb] before:to-[#f3f6fb]">
            <div className="mx-auto flex flex-col items-center justify-center px-8 mb-12 text-center lg:basis-5/12 lg:px-12 lg:pt-12">
                <h2 className="section-title">Todo tu trabajo<br />en un solo lugar</h2>
                <p className="mt-4 max-w-xl font-normal text-[1.3rem] text-title leading-8">
                    Digitalice cada elemento de su operación y encuentre áreas de mejora en cada paso del camino.
                </p>
                <Button className="btn-main mt-6">Explora la plataforma</Button>
            </div>
            <div className="hidden h-[40vh] min-w-0 flex-grow-0 flex-shrink-0 px-8 justify-center lg:flex">
                <img
                    src="/images/app-dashboard.webp"
                    alt="App dashboard"
                />
            </div>
        </section>

    )
}
